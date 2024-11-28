import {Component} from '@angular/core';
import {HomeBannerComponent} from '../home-banner/home-banner.component';
import {Product} from '../../types/product';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    HomeBannerComponent
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  mostDownloaded: Product[] = []//fixme
}
