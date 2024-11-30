import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Category} from '../types/category';
import {environment} from '../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  apiUrl: string = environment.apiUrl;
  endpoint: string = '/categories';

  constructor(private readonly http: HttpClient) {
  }

  getCategories(includeBooks?: boolean): Observable<Category[]> {
    let params: string = '';
    if (includeBooks) {
      params = '?_embed=books';
    }

    return this.http.get<Category[]>(this.apiUrl + this.endpoint + params);
  }
}
