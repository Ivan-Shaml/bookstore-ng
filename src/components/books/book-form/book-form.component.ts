import {Component, OnInit} from '@angular/core';
import {FormsModule, NgForm} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {BookService} from '../../../services/book.service';
import {CategoryService} from '../../../services/category.service';
import {Book} from '../../../types/book';
import {Category} from '../../../types/category';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  standalone: true,
  imports: [
    FormsModule
  ],
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit {
  book: Book = {} as Book;
  categories: Category[] = [];
  isEditMode = false;
  successfulOperation = false;

  constructor(
    private readonly bookService: BookService,
    private readonly route: ActivatedRoute,
    private readonly categoryService: CategoryService,
  ) {
  }

  ngOnInit(): void {
    // Fetch categories
    this.categoryService.getCategories().subscribe(categories => this.categories = categories);
    const id = this.route.snapshot.params['bookId']
    if (id) {
      this.isEditMode = true;
      this.bookService.getBookById(id).subscribe(book => {
          this.book = book;
        },
        error => console.log(error));
    }
  }

  saveBook(form: NgForm): void {
    if (form.valid) {
      if (this.isEditMode) {
        this.bookService.updateBook(this.book).subscribe(
          response => {
            this.book = response;
            this.successfulOperation = true;
          },
          error => {
            console.error('Error updating book', error);
            this.successfulOperation = false;
          }
        );
      } else {
        this.bookService.createBook(this.book).subscribe(
          response => {
            this.book = response;
            this.successfulOperation = true;
            this.isEditMode = true;
          },
          error => {
            console.error('Error creating book', error);
            this.successfulOperation = false;
          }
        );
      }
    }
  }
}
