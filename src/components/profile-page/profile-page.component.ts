import {Component, OnInit} from '@angular/core';
import {Book} from '../../types/book';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {BookOwnershipService} from '../../services/book-ownership.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink
  ],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css'
})
export class ProfilePageComponent implements OnInit {
  private ownedBooks: Book[] = [];
  isAlreadyOwned: boolean = false;
  isSuccess: boolean = false;
  isDeletedOwnership: boolean = false;
  searchQuery: string = '';
  filteredBooks: Book[] = [];
  ownedBooksCount: number = 0;


  constructor(private readonly bookOwnership: BookOwnershipService,
              private readonly router: Router,
              private readonly authService: AuthService,
              private readonly route: ActivatedRoute) {
  }


  ngOnInit(): void {
    const userId = this.authService.userid as number;
    this.bookOwnership.getOwnedBooks(userId).subscribe(result => {
      this.ownedBooks = result;
      this.filteredBooks = result;
      this.ownedBooksCount = result.length;
    });
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

  searchBooks(): void {
    if (this.searchQuery.trim().length === 0) {
      this.filteredBooks = this.ownedBooks;
    } else {
      this.filteredBooks = this.ownedBooks.filter(book => book.title?.toLowerCase().includes(this.searchQuery?.toLowerCase()));
    }
  }
}
