import {Component} from '@angular/core';
import {Category} from '../../types/category';
import {Book} from '../../types/book';
import {NgIf} from '@angular/common';
import {at} from 'json-server-auth';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {
  topCategory!: Category;
  topBook!: Book;
  categoriesList: Category[] = [];
  protected readonly at = at;
}
