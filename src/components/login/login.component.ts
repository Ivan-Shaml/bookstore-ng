import {Component} from '@angular/core';
import {FormsModule, NgForm} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {NgIf} from '@angular/common';
import {Router, RouterLink} from "@angular/router";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    RouterLink
  ],
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router) {
  }

  loginFailed: boolean = false;

  login(form: NgForm): void {
    if (form.valid) {
      const {email, password} = form.value;
      this.authService.login({email, password}).subscribe(response => {
        this.router.navigate(['home']);
      }, error => {
        this.loginFailed = true;
      });
    }
  }
}
