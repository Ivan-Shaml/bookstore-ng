import {Component, OnInit} from '@angular/core';
import {Category} from '../../types/category';
import {Book} from '../../types/book';
import {NgIf} from '@angular/common';
import {CategoryService} from '../../services/category.service';
import {BookService} from '../../services/book.service';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit {
  topBook!: Book;
  categoriesList: Category[] = [];

  constructor(private categoryService: CategoryService, private bookService: BookService) {
  }

  ngOnInit(): void {
    this.categoryService.getCategories(true).subscribe(c => this.categoriesList = c);
    this.bookService.getMostRatedSingle(true).subscribe(c => this.topBook = c);
  }


  getImageUrl(category: Category) {
    let books = category.books;

    if (books && books.length > 0) {
      return books[0].imageUrl;
    }
    return '';
  }
}
