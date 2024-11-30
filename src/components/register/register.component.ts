import {Component} from '@angular/core';
import {FormsModule, NgForm} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {NgIf} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    RouterLink
  ],
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private authService: AuthService) {
  }

  register(form: NgForm): void {
    if (form.valid) {
      const {name, email, phone, password} = form.value;
      this.authService.register({name, email, phone, password}).subscribe(response => {
        console.log('Registration successful', response);
        // Handle successful registration, e.g., navigate to a different page
      }, error => {
        console.error('Registration failed', error);
        // Handle registration error, e.g., show error message
      });
    }
  }

  matchPasswords(password: string, repeatPassword: string): boolean {
    return password === repeatPassword;
  }
}
