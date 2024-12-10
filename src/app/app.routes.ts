import {Routes} from '@angular/router';
import {HomePageComponent} from '../components/home-page/home-page.component';
import {CategoryComponent} from '../components/category/category.component';
import {BooksComponent} from '../components/books/books.component';
import {LoginComponent} from '../components/login/login.component';
import {RegisterComponent} from '../components/register/register.component';
import {ProfilePageComponent} from '../components/profile-page/profile-page.component';
import {AuthGuard} from '../guards/auth.guard';
import {PageNotFoundComponent} from '../components/common/page-not-found/page-not-found.component';
import {BookFormComponent} from '../components/books/book-form/book-form.component';
import {AdminGuard} from '../guards/admin.guard';
import {BookDetailsComponent} from '../components/books/book-details/book-details.component';
import {CategoryFormComponent} from '../components/category/category-form/category-form.component';
import {AlreadyAuthorizedGuard} from '../guards/already-authorized.guard';

export const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomePageComponent},

  {
    path: 'category', children: [
      {path: '', component: CategoryComponent},
      {
        path: ':categoryId',
        component: CategoryFormComponent,
        canActivate: [AuthGuard, AdminGuard],
      }
    ]
  },
  {
    path: 'books', children: [
      {path: '', component: BooksComponent},
      {
        path: ':bookId',
        component: BookFormComponent,
        canActivate: [AuthGuard, AdminGuard],
      },
      {
        path: ':bookId/details',
        component: BookDetailsComponent
      },
    ],
  },

  {path: 'login', component: LoginComponent, canActivate: [AlreadyAuthorizedGuard]},
  {path: 'register', component: RegisterComponent, canActivate: [AlreadyAuthorizedGuard]},
  {path: 'profile', component: ProfilePageComponent, canActivate: [AuthGuard]},


  // Error handling
  {path: '404', component: PageNotFoundComponent},
  {path: '**', redirectTo: '/404'},
];
