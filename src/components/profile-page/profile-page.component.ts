import {Component, OnInit} from '@angular/core';
import {Book} from '../../types/book';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {BookOwnershipService} from '../../services/book-ownership.service';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css'
})
export class ProfilePageComponent implements OnInit {
  ownedBooks: Book[] = [];
  isAlreadyOwned: boolean = false;
  isSuccess: boolean = false;
  isDeletedOwnership: boolean = false;


  constructor(private readonly bookOwnership: BookOwnershipService,
              private readonly router: Router,
              private readonly authService: AuthService,
              private readonly route: ActivatedRoute) {
  }


  ngOnInit(): void {
    const userId = this.authService.user?.id as number;
    this.bookOwnership.getOwnedBooks(userId).subscribe(result => this.ownedBooks = result);
    this.route.queryParams.subscribe(params => {
      this.isSuccess = params['success'] === 'true';
      this.isAlreadyOwned = params['alreadyOwned'] === 'true';
      this.isDeletedOwnership = params['deletedOwnership'] === 'true';
    });
  }

  getUserName() {
    return this.authService.username;
  }

  logOut(event: Event): void {
    event.preventDefault();
    event.stopPropagation();

    this.authService.logOut();
  }

  goToDetails(id: number, event: Event): void {
    event.preventDefault();
    event.stopPropagation();

    this.router.navigate(['/books', id, 'details']);
  }

  getRatingsCount(): number {
    return this.ownedBooks.filter(book => book.rating > 0)?.length || 0;
  }
}
