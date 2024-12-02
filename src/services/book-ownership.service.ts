import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment.development';
import {catchError, map, Observable, switchMap, throwError} from 'rxjs';
import CreateOwnershipDto from '../types/create-ownership.dto';
import {Book} from '../types/book';
import ReadOwnership from '../types/read-ownership.dto';

@Injectable({
  providedIn: 'root'
})
export class BookOwnershipService {
  private readonly apiUrl: string = environment.apiUrl;
  private readonly endpoint: string = '/booksusers'


  constructor(private readonly http: HttpClient) {
  }

  public download(dto: CreateOwnershipDto): Observable<void> {
    return this.checkIfAlreadyOwned(dto).pipe(
      switchMap(isOwned => {
        if (isOwned) {
          return throwError(() => new Error('Book is already owned.'));
        } else {
          return this.http.post<void>(`${this.apiUrl + this.endpoint}`, dto);
        }
      }),
      catchError(error => {
        console.error('Error:', error.message);
        return throwError(() => error);
      })
    );
  }

  private checkIfAlreadyOwned(dto: CreateOwnershipDto): Observable<boolean> {
    return this.http.get<ReadOwnership[]>(`${this.apiUrl + this.endpoint}?userId=${dto.userId}&bookId=${dto.bookId}`).pipe(map(
      response => response && response.length > 0
    ));
  }

  public deleteOwnerShip(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl + this.endpoint}/${id}`);
  }

  public getOwnedBooks(userId: number): Observable<Book[]> {
    return this.http.get<ReadOwnership[]>(`${this.apiUrl + this.endpoint}?userId=${userId}&_expand=book`).pipe(
      map(dto => dto.map(d => d.book))
    );
  }

  public getOwnedBook(userId: number, bookId: number): Observable<Book> {
    return this.checkIfBookExists(userId, bookId).pipe(switchMap(exists => {
      if (exists) {
        return this.http.get<Book>(`${this.apiUrl}/books/${bookId}?_expand=category`);
      } else {
        return throwError(() => new Error('Book not owned by user.'));
      }
    }), catchError(error => {
      console.error('Error:', error.message);
      return throwError(() => error);
    }));
  }

  private checkIfBookExists(userId: number, bookId: number): Observable<boolean> {
    return this.http.get<ReadOwnership[]>(`${this.apiUrl + this.endpoint}?userId=${userId}&bookId=${bookId}`).pipe(map(dto => dto && dto.length > 0));
  }
}
