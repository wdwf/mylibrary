import { Injectable } from '@angular/core';
import { Book } from './book.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: "root"
})

export class BookService {
  private books: Book[] = [];
  private listaBooksAtualizada = new Subject<Book[]>();

  constructor (private httpClient: HttpClient){}

  getBooks(): void {
    this.httpClient
      .get <{mensagem: string, books: any}>(
        'http://localhost:3000/api/books'
      ).pipe(map((dados) => {
        return dados.books.map(livro => {
          return {
            id: livro._id,
            titulo: livro.titulo,
            autor: livro.autor,
            Npages: livro.Npages
          }
        })
      }))
      .subscribe((books) => {
        this.books = books;
        this.listaBooksAtualizada.next([...this.books]);
      })
  }

  adicionarBook(titulo: string, autor: string, Npages: string) {
    const book: Book = {
      id: null,
      titulo: titulo,
      autor: autor,
      Npages: Npages,
    };
    this.httpClient.post<{mensagem: string, id: string}> ('http://localhost:3000/api/books', book).subscribe((dados) => {
      console.log (dados.mensagem);
      book.id = dados.id;
      this.books.push (book);
      this.listaBooksAtualizada.next ([...this.books]);
    });
  }

  getListaDeLivrosAtualizadaObservable() {
    return this.listaBooksAtualizada.asObservable();
  }

  removerBook (id: string): void{
    this.httpClient.delete(`http://localhost:3000/api/books/${id}`).subscribe(() => {
    this.books = this.books.filter((liv) => {
      return liv.id !== id;
    });
    this.listaBooksAtualizada.next([...this.books]);
    });
  }
}
