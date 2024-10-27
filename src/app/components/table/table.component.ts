import { AfterViewInit, Component, ViewChild, Input } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { CarUpdateModalComponent } from '../car-update-modal/car-update-modal.component';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { Cars } from '../../models/cars';
import { ApiCarsService } from '../../service/api-cars.service';
import { MatDialog } from '@angular/material/dialog';
import { CurrencyPipe } from '@angular/common';
import { NumberAbbreviationPipe } from '../../pipes/number-abbreviation-pipe/number-abbreviation-pipe.component';
import { UpperCasePipe } from '@angular/common';
@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    CarUpdateModalComponent,
    ConfirmationDialogComponent, 
    CurrencyPipe,
    NumberAbbreviationPipe,
    UpperCasePipe
  ],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'model', 'year', 'price', 'color', 'description', 'category', 'actions'];
  dataSource: MatTableDataSource<Cars> = new MatTableDataSource();
  cars: Cars[] = [];

  @ViewChild(MatPaginator) paginator?: MatPaginator; 
  @ViewChild(MatSort) sort?: MatSort; 

  constructor(private apiService: ApiCarsService, private dialog: MatDialog) {
    this.loadCars();
  }

  ngAfterViewInit() {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
    if (this.sort) {
      this.dataSource.sort = this.sort;
    }
  }

  loadCars(): void {
    this.apiService.getCars().subscribe({
      next: (response: Cars[]) => {
        this.cars = response; 
        this.dataSource.data = this.cars; 
        this.dataSource.filter = '';
      },
      error: (err) => {
        console.error('Error retrieving cars data:', err);
      },
    });
  }

  @Input() set carAdded(car: Cars) {
    if (car) {
      this.dataSource.data = [...this.dataSource.data, car]; 
    }
  }

  updateCar(row: Cars): void {
    this.openUpdateCarModal(row);
  }

  openUpdateCarModal(car: Cars): void {
    const dialogRef = this.dialog.open(CarUpdateModalComponent, {
      data: car,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadCars(); 
      }
    });
  }
  
  confirmDelete(id: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { message: '¿Estás seguro de que deseas eliminar este coche?' }
    });
    
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteCar(id);
      }
    });
  }

  deleteCar(id: number) {
    this.apiService.deleteCar(id).subscribe({
      next: () => {
        console.log('Car data deleted successfully');
        this.loadCars(); 
      },
      error: (err) => {
        console.error('Error deleting car data:', err);
      },
    });
  }

  applyFilter(event: KeyboardEvent): void {
    const input = event.target as HTMLInputElement;
    const filterValue = input.value.trim().toLowerCase();

    if (filterValue === '') {
      this.loadCars(); 
      return;
    }

    if (!isNaN(Number(filterValue))) {
      const carId = Number(filterValue);
      this.apiService.getCarById(carId).subscribe(
        car => {
          this.dataSource.data = [car];
        },
        error => {
          console.error('Error fetching car by ID', error);
          this.dataSource.data = []; 
        }
      );
    } else {
      this.dataSource.filter = filterValue;
    }
  }
}
