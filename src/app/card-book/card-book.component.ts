import { Component, OnInit, OnDestroy } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
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
  private booksSubscription: Subscription;
  public estaCarregando = false;
  totalDeLivros: number = 10;
  totalDeLivrosPorPagina: number = 2;
  opcoesTotalDeLivrosPorPagina = [2, 5, 10];
  paginaAtual: number = 0;

  constructor(public bookService: BookService ) {}

  ngOnDestroy(): void {
    this.booksSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.estaCarregando = true;
    this.bookService.getBooks(this.totalDeLivrosPorPagina, this.paginaAtual);
    this.booksSubscription = this.bookService
    .getListaDeLivrosAtualizadaObservable()
    .subscribe((dados: {books: [], maxBooks: number}) => {
      this.estaCarregando = false;
      this.colection = dados.books;
      this.totalDeLivros = dados.maxBooks
    });
  }

  onPaginaAlterada (dadosPagina: PageEvent){
    this.estaCarregando = true;
    this.paginaAtual = dadosPagina.pageIndex + 1;
    this.totalDeLivrosPorPagina = dadosPagina.pageSize;
    this.bookService.getBooks (this.totalDeLivrosPorPagina, this.paginaAtual);
  }

  onDelete (id: string): void{
    this.estaCarregando = true;
    this.bookService.removerBook(id).subscribe(() => {
      this.bookService.getBooks(this.totalDeLivrosPorPagina, this.paginaAtual);
    });
  }

}
