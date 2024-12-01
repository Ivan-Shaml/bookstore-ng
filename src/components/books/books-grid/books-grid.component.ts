import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Book} from '../../../types/book';
import {AuthService} from '../../../services/auth.service';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-books-grid',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './books-grid.component.html',
  styleUrl: './books-grid.component.css'
})
export class BooksGridComponent {
  @Input() gridTitle!: string;
  @Input() resultList!: Book[];
  @Output() delete = new EventEmitter<number>()

  constructor(private readonly authService: AuthService) {
  }

  isAdmin() {
    return this.authService.isAdmin;
  }


  deleteBook(event: Event, id: number) {
    event.preventDefault();
    event.stopPropagation();

    this.delete.emit(id);
  }
}
