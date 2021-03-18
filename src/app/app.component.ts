import { Component } from '@angular/core';
import { Book } from './card-book/book.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mylibrary';

  colection: Book[] = [];

  onBookAdicionado(book) {
    console.log(book);
    const newBook = {...book, id: this.colection.length + 1};
    this.colection = [ ...this.colection, book ];
  }
}
