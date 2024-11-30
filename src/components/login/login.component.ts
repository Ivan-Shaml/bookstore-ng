import {Component} from '@angular/core';
import {FormsModule, NgForm} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {NgIf} from '@angular/common';
import {RouterLink} from "@angular/router";


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
    constructor(private authService: AuthService) {
    }

    login(form: NgForm): void {
        if (form.valid) {
            const {email, password} = form.value;
            this.authService.login(email, password).subscribe(response => {
                console.log('Login successful', response);
                // Handle successful login, e.g., navigate to a different page
            }, error => {
                console.error('Login failed', error);
                // Handle login error, e.g., show error message
            });
        }
    }
}
