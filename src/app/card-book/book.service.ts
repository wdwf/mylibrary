import { Book } from './book.model';
import { Subject } from 'rxjs';


export class BookService {
  private books: Book[] = [];
  private listaBooksAtualizada = new Subject<Book[]>();

  getBooks(): Book[] {
    return [...this.books];
  }

  adicionarBook(id: string, titulo: string, autor: string, Npages: string) {
    const book: Book = {
      id: id,
      titulo: titulo,
      autor: autor,
      Npages: Npages,
    };
    this.books.push(book);
    this.listaBooksAtualizada.next([...this.books]);
  }

  getListaDeLivrosAtualizadaObservable() {
    return this.listaBooksAtualizada.asObservable();
  }

}
