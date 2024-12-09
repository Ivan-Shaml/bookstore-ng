import {Component} from '@angular/core';
import {FormsModule, NgForm} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {NgIf} from '@angular/common';
import {Router, RouterLink} from '@angular/router';

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
  constructor(private readonly authService: AuthService, private readonly router: Router) {
  }

  emailAlreadyExists = false;

  register(form: NgForm): void {
    if (form.valid) {
      const {name, email, phone, password} = form.value;
      this.authService.register({name, email, phone, password}).subscribe(() => {
        this.router.navigate(['/home']);
      }, () => {
        this.emailAlreadyExists = true;
      });
    }
  }

  matchPasswords(password: string, repeatPassword: string): boolean {
    return password === repeatPassword;
  }
}
