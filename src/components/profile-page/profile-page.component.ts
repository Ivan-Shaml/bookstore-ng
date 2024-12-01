import {Component, OnInit} from '@angular/core';
import {Book} from '../../types/book';
import {BookService} from "../../services/book.service";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Component({
    selector: 'app-profile-page',
    standalone: true,
    imports: [],
    templateUrl: './profile-page.component.html',
    styleUrl: './profile-page.component.css'
})
export class ProfilePageComponent implements OnInit {
    ratedProductsCount: number = 0;
    ownedProductsCount: number = 0;
    ownedBooks: Book[] = [];

    constructor(private bookService: BookService, private router: Router, private readonly authService: AuthService) {
    }


    ngOnInit(): void {

    }

    getUserName() {
        return this.authService.username;
    }

    logOut() {
        this.authService.logOut();
    }

    goToDetails(id: string) {
        this.router.navigate(['book', 'details', id]);
    }
}
