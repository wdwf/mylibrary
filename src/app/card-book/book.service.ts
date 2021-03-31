import { Book } from './book.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';


export class BookService {
  private books: Book[] = [];
  private listaBooksAtualizada = new Subject<Book[]>();

  constructor (private httpClient: HttpClient){}

  getBooks(): Book[] {
    return [...this.books];
    this.httpClient
      .get <{mensagem: string, books: Book[]}>(
        'http://localhost:3000/api/books'
      ).subscribe((dados) => {
        this.books = dados.books;
        this.listaBooksAtualizada.next([...this.books]);
      })
  }

  adicionarBook(id: string, titulo: string, autor: string, Npages: string) {
    const book: Book = {
      id: id,
      titulo: titulo,
      autor: autor,
      Npages: Npages,
    };
    this.httpClient.post<{mensagem: string}> ('http://localhost:3000/api/books', book).subscribe((dados) => {
      this.books.push(book);
      this.listaBooksAtualizada.next([...this.books]);
    });
  }

  getListaDeLivrosAtualizadaObservable() {
    return this.listaBooksAtualizada.asObservable();
  }

}
