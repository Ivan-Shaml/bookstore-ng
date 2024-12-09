import {Component, OnInit} from '@angular/core';
import {Category} from '../../types/category';
import {Book} from '../../types/book';
import {NgIf} from '@angular/common';
import {CategoryService} from '../../services/category.service';
import {BookService} from '../../services/book.service';
import {RouterLink} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [
    NgIf,
    RouterLink
  ],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit {
  topBook!: Book;
  categoriesList: Category[] = [];
  deletedSuccessfully = false;
  errorCategoryDeletion = false;

  constructor(private readonly categoryService: CategoryService,
              private readonly bookService: BookService,
              private readonly authService: AuthService) {
  }

  ngOnInit(): void {
    this.categoryService.getCategories(true).subscribe(c => this.categoriesList = c);
    this.bookService.getMostRatedSingle(true).subscribe(b => this.topBook = b);
  }


  getImageUrl(category: Category) {
    const books = category.books;

    if (books && books.length > 0) {
      return books[0].imageUrl;
    }
    return '';
  }

  isAdmin(): boolean {
    return this.authService.isAdmin;
  }

  onDeleteCategory(id: number, event: Event) {
    event.preventDefault();
    event.stopPropagation();

    this.categoryService.deleteCategory(id).subscribe(() => {
      this.deletedSuccessfully = true;
      this.errorCategoryDeletion = false;
      this.ngOnInit();
    }, () => {
      this.deletedSuccessfully = false;
      this.errorCategoryDeletion = true;
    });
  }
}
