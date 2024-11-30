import {Routes} from '@angular/router';
import {HomePageComponent} from '../components/home-page/home-page.component';
import {CategoryComponent} from '../components/category/category.component';
import {BooksComponent} from '../components/books/books.component';

export const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomePageComponent},
  
  {path: 'category', component: CategoryComponent},
  {path: 'books', component: BooksComponent},

];
