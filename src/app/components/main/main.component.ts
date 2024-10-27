import { Component } from '@angular/core';
import { TableComponent } from '../table/table.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddCarComponent } from '../dialog-add-car/dialog-add-car.component';
import { ApiCarsService } from '../../service/api-cars.service';
import { Cars } from '../../models/cars';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  cars: Cars[] = [];
  constructor(public dialog: MatDialog, private apiCarsService: ApiCarsService) {
    this.loadCars(); 
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddCarComponent, {
      width: '400px',
      data: { id: 0, name: '', model: '', year: null, price: null, color: '', description: '', category: '' }
    });

    
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadCars(); 
      }
    });
  }

  private loadCars(): void {
    this.apiCarsService.getCars().subscribe({
      next: (cars) => {
        this.cars = cars;
      },
      error: (err) => {
        console.error('Error loading cars:', err);
      },
    });
  }
}
