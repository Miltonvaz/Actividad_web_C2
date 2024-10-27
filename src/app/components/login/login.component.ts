import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ModalregistrerComponent } from '../modal-registrer/modalregistrer.component';
import { ApiService } from '../../service/api.service';
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatInputModule } from '@angular/material/input'; 
import { ReactiveFormsModule } from '@angular/forms'; 
import { MatButtonModule } from '@angular/material/button'; 
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    RouterLink, CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private dialog: MatDialog, private apiService: ApiService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      const loginRequest = { email, password };
  
      console.log('Solicitud de inicio de sesión:', loginRequest);  
  
      this.apiService.login(loginRequest).subscribe({
        next: (response) => {
          console.log('Inicio de sesión exitoso:', response);
          this.router.navigate(['/inicio']); 
          this.loginForm.reset(); 
        },
        error: (err) => {
          console.error('Error en inicio de sesión:', err);
          alert('Error en inicio de sesión: ' + (err.error?.detail || 'Error desconocido.'));
        }
      });
    }
  }
  

  openRegisterModal(): void {
    const dialogRef = this.dialog.open(ModalregistrerComponent , {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Registro exitoso:', result);
      }
    });
  }
}
