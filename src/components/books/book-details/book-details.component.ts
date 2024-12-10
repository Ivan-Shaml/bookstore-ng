import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Book} from '../../../types/book';
import {BookOwnershipService} from '../../../services/book-ownership.service';
import {AuthService} from '../../../services/auth.service';
import {BookService} from '../../../services/book.service';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.css'
})
export class BookDetailsComponent implements OnInit {
  book!: Book;

  isBookOwned = false;
  userId = -1;

  constructor(private readonly activatedRoute: ActivatedRoute,
              private readonly bookOwnershipService: BookOwnershipService,
              private readonly bookService: BookService,
              private readonly authService: AuthService,
              private readonly router: Router) {
  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['bookId'];
    if (id) {
      const bookId = +id;
      this.bookService.getBookById(bookId).subscribe(book => {
        this.book = book;
      });

      if (this.authService.isLogged) {
        this.userId = this.authService.userid as number
        this.bookOwnershipService.checkIfAlreadyOwned({userId: this.userId, bookId: bookId}).subscribe(isBookOwned => {
          this.isBookOwned = isBookOwned;
        })
      }
    }
  }


  onDelete(event: Event) {
    event.preventDefault();
    event.stopPropagation();

    const bookId = this.book.id;
    this.bookOwnershipService.deleteOwnership(this.userId, bookId).subscribe(() => {
      this.router.navigate(['/profile'], {queryParams: {deletedOwnership: true}, fragment: 'ownedProducts'});
    });
  }

  isLoggedIn() {
    return this.authService.isLogged;
  }

  onDownload(event: Event) {
    event.preventDefault();
    event.stopPropagation();

    if (!this.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }


    this.bookOwnershipService.download({bookId: this.book.id, userId: this.userId}).subscribe(() => {
        this.router.navigate(['/profile'], {queryParams: {success: true}, fragment: 'ownedProducts'});
      },
      error => {
        console.log(error);
        this.router.navigate(['/profile'], {queryParams: {alreadyOwned: true}, fragment: 'ownedProducts'});
      });
  }

}
