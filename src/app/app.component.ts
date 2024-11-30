import {Component} from '@angular/core';
import {HeaderComponent} from '../components/common/header/header.component';
import {FooterComponent} from '../components/common/footer/footer.component';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'book';
}
