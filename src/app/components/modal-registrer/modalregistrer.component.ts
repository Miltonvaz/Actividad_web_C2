import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../../service/api.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modalregistrer',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule
  ],
  templateUrl: './modalregistrer.component.html',
  styleUrls: ['./modalregistrer.component.scss']
})
export class ModalregistrerComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ModalregistrerComponent>,
    private apiService: ApiService
  ) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.apiService.addUser(this.registerForm.value).subscribe({
        next: (response) => {
          console.log('User registered successfully:', response);
          this.dialogRef.close(true); 
        },
        error: (err) => {
          console.error('Error during registration:', err);
        }
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
