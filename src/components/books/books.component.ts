import {Component, OnInit} from '@angular/core';
import {BookSliderComponent} from './book-slider/book-slider.component';
import {Book} from '../../types/book';
import {BookService} from '../../services/book.service';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [
    BookSliderComponent
  ],
  templateUrl: './books.component.html',
  styleUrl: './books.component.css'
})
export class BooksComponent implements OnInit {

  topBooks: Book[] = [];

  constructor(private bookService: BookService) {
  }


  ngOnInit(): void {
    this.bookService.getMostRatedBooks(true).subscribe(books => this.topBooks = books);
  }

}
