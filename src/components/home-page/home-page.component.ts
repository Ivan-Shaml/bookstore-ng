import {Component, OnInit} from '@angular/core';
import {HomeBannerComponent} from '../home-banner/home-banner.component';
import {Book} from '../../types/book';
import {BookService} from '../../services/book.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    HomeBannerComponent
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit {
  mostDownloaded: Book[] = []

  constructor(private bookService: BookService) {
  }

  ngOnInit(): void {
    this.bookService.getMostRated(true).subscribe(res => this.mostDownloaded = res);
  }

}
