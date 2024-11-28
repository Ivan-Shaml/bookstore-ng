import {Component} from '@angular/core';
import {HeaderComponent} from '../components/common/header/header.component';
import {FooterComponent} from '../components/common/footer/footer.component';
import {HomePageComponent} from '../components/home-page/home-page.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, HomePageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'book';
}
