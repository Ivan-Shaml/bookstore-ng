import {Component} from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    ReactiveFormsModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  searchForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private readonly authService: AuthService,) {
    this.searchForm = this.fb.group({title: ['']});
  }

  onSubmit(): void {
    const title = this.searchForm.get('title')?.value;
    if (title) {
      this.router.navigate(['/books'], {queryParams: {title}});
    }
  }

  isLoggedIn(): boolean {
    return this.authService.isLogged;
  }
}
