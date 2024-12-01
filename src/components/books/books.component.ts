import {Component, OnInit} from '@angular/core';
import {Book} from '../../types/book';
import {BookService} from '../../services/book.service';
import {Category} from '../../types/category';
import {CategoryService} from '../../services/category.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {BooksGridComponent} from './books-grid/books-grid.component';
import {Subscription} from 'rxjs';

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
  private readonly defaultCategory: Category = {id: 0, name: 'Всички', description: 'none'};
  private categorySubscription!: Subscription;

  filterForm: FormGroup;
  gridTitle: string = 'Всички книги';
  isBookDeleted: boolean = false;
  isBookDeletionError: boolean = false;


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
    this.categoryService.getCategories().subscribe(c => {
      this.categories = c;
      this.categories.unshift(this.defaultCategory)
    });

    this.categorySubscription = this.subscribeForCategoryChanges();

    this.route.queryParams.subscribe(params => {
      const {categoryId, title} = params;
      if (categoryId) {
        this.filterForm.patchValue({categoryId: +categoryId});
        this.bookService.getBooksByCategoryId(categoryId, true).subscribe(books => {
          this.books = books;
          this.gridTitle = books[0]?.category?.name || 'Всички книги';
        });
      } else if (title) {
        this.bookService.getBooksByTitle(title, true).subscribe(books => {
          this.books = books;
          this.gridTitle = `Резултати от търсена за '${title}'`;
          this.resetCategoryForm();
        });
      } else {
        this.bookService.getBooks(true).subscribe(books => this.books = books);
        this.gridTitle = 'Всички книги';
      }
    });
  }

  subscribeForCategoryChanges(): Subscription {
    return this.filterForm.get('categoryId')?.valueChanges.subscribe(value => {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: value !== 0 ? {categoryId: value} : {categoryId: null},
        queryParamsHandling: 'replace'
      });
    }) as Subscription;
  }

  resetCategoryForm(): void {
    this.categorySubscription.unsubscribe();
    this.filterForm.reset({categoryId: 0, year: null});
    this.categorySubscription = this.subscribeForCategoryChanges();
  }


  onDelete(id: number): void {
    this.bookService.deleteBook(id).subscribe(res => {
        this.isBookDeleted = true;
        this.isBookDeletionError = false;
        this.ngOnInit();
      },
      err => {
        this.isBookDeleted = false;
        this.isBookDeletionError = true;
      })
  }
}
