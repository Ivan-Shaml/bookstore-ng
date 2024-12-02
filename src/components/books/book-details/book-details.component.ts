import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
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

  constructor(private activatedRoute: ActivatedRoute,
              private bookOwnershipService: BookOwnershipService,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['bookId'];
    if (id) {
      const bookId = +id;
      const userId = this.authService.user?.id as number;

      this.bookOwnershipService.getOwnedBook(userId, bookId).subscribe(next => {
        this.book = next;
      })
    }
  }


}
