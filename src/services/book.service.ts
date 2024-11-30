import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {Book} from '../types/book';
import {environment} from '../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  apiUrl: string = environment.apiUrl;
  endpoint: string = '/books';

  constructor(private readonly http: HttpClient) {
  }

  getBooks(includeCateg?: boolean): Observable<Book[]> {
    let params: string = '';
    if (includeCateg) {
      params = '?_expand=category';
    }

    return this.http.get<Book[]>(this.apiUrl + this.endpoint + params);
  }

  getBooksByCategoryId(categoryId: number, includeCateg?: boolean): Observable<Book[]> {
    let params: string = `?categoryId=${categoryId}`;

    if (includeCateg) {
      params += '&_expand=category';
    }

    return this.http.get<Book[]>(this.apiUrl + this.endpoint + params);
  }

  getMostRatedBooks(includeCateg?: boolean): Observable<Book[]> {

    let params: string = '';
    if (includeCateg) {
      params = '&_expand=category';
    }

    return this.http.get<Book[]>(this.apiUrl + this.endpoint + '?rating_gte=3' + params);
  }

  getBookByTitle(title: string, includeCateg?: boolean): Observable<Book> {
    let params: string = '';
    if (includeCateg) {
      params = '&_expand=category';
    }

    return this.http.get<Book>(this.apiUrl + this.endpoint + `?title_like=${title}${params}`);
  }

  getMostRatedSingle(includeCateg?: boolean): Observable<Book> {
    let params: string = '';
    if (includeCateg) {
      params = '&_expand=category';
    }

    return this.http.get<Book[]>(this.apiUrl + this.endpoint + '?_sort=rating&_order=desc&_page=1&_limit=1' + params).pipe(map(books => books[0]));
  }
}
