import { Component, OnInit, OnDestroy } from '@angular/core';
import { Book } from '../card-book/book.model';
import { BookService } from '../card-book/book.service';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-card-book',
  templateUrl: './card-book.component.html',
  styleUrls: ['./card-book.component.css']
})
export class CardBookComponent implements OnInit, OnDestroy {

  colection: Book[] = [];
  private colectionsSubscription: Subscription;
  public estaCarregando = false;

  constructor(public bookService: BookService ) {}

  ngOnDestroy(): void {
    this.colectionsSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.estaCarregando = true;
    this.bookService.getBooks();
    this.colectionsSubscription = this.bookService
    .getListaDeLivrosAtualizadaObservable()
    .subscribe((colection: Book[]) => {
      this.estaCarregando = false;
      this.colection = colection;
    });
  }

  onDelete (id: string): void{
    this.bookService.removerBook(id);
   }

}
