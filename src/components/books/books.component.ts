import {Component, OnInit} from '@angular/core';
import {Book} from '../../types/book';
import {BookService} from '../../services/book.service';
import {Category} from '../../types/category';
import {CategoryService} from '../../services/category.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {BooksGridComponent} from './books-grid/books-grid.component';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, BooksGridComponent],
  templateUrl: './books.component.html',
  styleUrl: './books.component.css'
})
export class BooksComponent implements OnInit {

  books: Book[] = [];
  categories: Category[] = [];

  filterForm: FormGroup;
  gridTitle: string = 'Всички книги';


  constructor(private bookService: BookService,
              private categoryService: CategoryService,
              private router: Router,
              private fb: FormBuilder,
              private route: ActivatedRoute) {
    this.filterForm = this.fb.group({categoryId: [0]});
  }

  onSubmit(): void {
  }

  ngOnInit(): void {
    this.bookService.getBooks(true).subscribe(books => this.books = books);
    this.categoryService.getCategories().subscribe(c => {
      this.categories = c;
      this.categories.unshift({id: 0, name: 'Всички', description: 'none'})
    });

    this.filterForm.get('categoryId')?.valueChanges.subscribe(value => {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: value !== 0 ? {categoryId: value} : {categoryId: null},
        queryParamsHandling: 'merge'
      });
    });

    this.route.queryParams.subscribe(params => {
      const categoryId = params['categoryId'];
      if (categoryId) {
        this.filterForm.patchValue({categoryId: +categoryId});
        this.bookService.getBooksByCategoryId(categoryId, true).subscribe(books => {
          this.books = books;
          this.gridTitle = books[0]?.category?.name || 'Всички книги';
        });
      } else {
        this.bookService.getBooks(true).subscribe(books => this.books = books);
        this.gridTitle = 'Всички книги';
      }
    });
  }
}
