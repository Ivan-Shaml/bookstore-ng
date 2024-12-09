import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {Book} from '../../../types/book';
import {BookOwnershipService} from '../../../services/book-ownership.service';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.css'
})
export class BookDetailsComponent implements OnInit {
  book!: Book;

  constructor(private readonly activatedRoute: ActivatedRoute,
              private readonly bookOwnershipService: BookOwnershipService,
              private readonly authService: AuthService,
              private readonly router: Router) {
  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['bookId'];
    if (id) {
      const bookId = +id;
      const userId = this.authService.userid as number;

      this.bookOwnershipService.getOwnedBook(userId, bookId).subscribe(next => {
        this.book = next;
      })
    }
  }


  onDelete(event: Event) {
    event.preventDefault();
    event.stopPropagation();

    const userId = this.authService.userid as number;
    const bookId = this.book.id;
    this.bookOwnershipService.deleteOwnership(bookId, userId).subscribe(() => {
      this.router.navigate(['/profile'], {queryParams: {deletedOwnership: true}, fragment: 'ownedProducts'});
    });
  }
}
