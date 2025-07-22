import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../auth/auth.service';
import { catchError, of } from 'rxjs';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'login-page',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()" class="login-form">
      <h1>Login</h1>
      <mat-form-field appearance="fill">
        <mat-label>Username</mat-label>
        <input matInput formControlName="username" required>
      </mat-form-field>
      <mat-form-field appearance="fill">
        <mat-label>Password</mat-label>
        <input matInput type="password" formControlName="password" required>
      </mat-form-field>
      <button mat-raised-button color="primary" type="submit" [disabled]="form.invalid">Login</button>
      
    <button mat-raised-button color="primary" (click)="openSignUp()">Sign Up</button>
    </form>
  `,
  styles: [`
    .login-form {
      max-width: 320px;
      margin: 40px auto;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
  `]
})
export class LoginComponent {
  authTokenKey = 'authToken';
  form: FormGroup;

  constructor(private fb: FormBuilder, public authService: AuthService, public router: Router) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.form.valid) {        
        this.authService.login(this.form.value.username, this.form.value.password)
            .pipe(
                catchError((error) => {
                throw error;
            }))
            .subscribe((data: {access_token: string}) => {
                console.log('Login successful');
                localStorage.setItem(this.authTokenKey, data.access_token);
                this.router.navigate(['/']); // Redirect to login after successful registration    
            });
    }
  }

  openSignUp() {
    this.router.navigate(['/sign-up']);
  }
}
