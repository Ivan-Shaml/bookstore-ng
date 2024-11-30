import {Component, Input} from '@angular/core';
import {Book} from '../../../types/book';

@Component({
  selector: 'app-book-slider',
  standalone: true,
  imports: [],
  templateUrl: './book-slider.component.html',
  styleUrl: './book-slider.component.css'
})
export class BookSliderComponent {

  @Input()
  topBooks!: Book[];
}
