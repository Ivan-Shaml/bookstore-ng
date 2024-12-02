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

  getCategory(id: number): Observable<Category> {
    return this.http.get<Category>(this.apiUrl + this.endpoint + `/${id}`);
  }

  saveCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(this.apiUrl + this.endpoint, category);
  }

  updateCategory(category: Category): Observable<Category> {
    return this.http.put<Category>(`${this.apiUrl}${this.endpoint}/${category.id}`, category);
  }

  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${this.endpoint}/${id}`);
  }
}
