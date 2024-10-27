  import { Component, Inject } from '@angular/core';
  import { FormsModule } from '@angular/forms';
  import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
  import { MatFormFieldModule } from '@angular/material/form-field';
  import { MatInputModule } from '@angular/material/input';
  import { ApiCarsService } from '../../service/api-cars.service';
  import { Cars } from '../../models/cars'; 

  @Component({
    selector: 'app-dialog-add-car',
    standalone: true,
    imports: [MatDialogModule, MatFormFieldModule, MatInputModule, FormsModule],
    templateUrl: './dialog-add-car.component.html',
    styleUrls: ['./dialog-add-car.component.scss'],
  })
  export class DialogAddCarComponent {
    constructor(
      public dialogRef: MatDialogRef<DialogAddCarComponent>,
      @Inject(MAT_DIALOG_DATA) public data: Cars,
      private apiCarsService: ApiCarsService 
    ) {}

    onNoClick(): void {
      this.dialogRef.close();
    }
    
    addCar(): void {
      const carToAdd: Cars = {
        id: 0,
        name: this.data.name,
        model: this.data.model,
        year: this.data.year,
        price: this.data.price,
        color: this.data.color,
        description: this.data.description,
        category: this.data.category,
      };
    
      console.log('Car to add:', carToAdd);
      
      this.apiCarsService.addCars(carToAdd).subscribe({
        next: (newCar) => {
          this.dialogRef.close(newCar); 
        },
        error: (err) => {
          console.error('Error adding car:', err);
        },
      });
    }  
  }
