import {Component, Input} from '@angular/core';
import {Book} from '../../../types/book';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-books-grid',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './books-grid.component.html',
  styleUrl: './books-grid.component.css'
})
export class BooksGridComponent {
  @Input() gridTitle!: string;
  @Input() resultList!: Book[];
}
