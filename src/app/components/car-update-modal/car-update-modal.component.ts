import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { ApiCarsService } from '../../service/api-cars.service';
import { Cars } from '../../models/cars';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-car-update-modal',
  standalone: true,
  imports: [
    MatDialogModule,   
    MatFormFieldModule,
    MatInputModule,
    FormsModule
  ],
  templateUrl: './car-update-modal.component.html',
  styleUrls: ['./car-update-modal.component.scss'], 
})
export class CarUpdateModalComponent {
  constructor(
    private dialogRef: MatDialogRef<CarUpdateModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Cars, 
    private apiService: ApiCarsService 
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  updateCar(): void {
    this.apiService.updateCar(this.data.id, this.data).subscribe({
      next: (response) => {
        console.log('Car data updated successfully:', response);
        this.dialogRef.close(this.data); 
      },
      error: (err) => {
        console.error('Error updating car data:', err);
      },
    });
  }
}
