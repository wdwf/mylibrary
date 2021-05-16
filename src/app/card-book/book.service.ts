import { Injectable } from '@angular/core';
import { Book } from './book.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';


@Injectable({
  providedIn: "root"
})

export class BookService {
  private books: Book[] = [];
  private listaBooksAtualizada = new Subject<Book[]>();

  constructor (private httpClient: HttpClient, private router: Router){}

  getBook (idBook:string) {
    // return {...this.books.find((bok) => bok.id === idBook)};
    return this.httpClient.get<{_id: string, titulo: string, autor: string, Npages: string}>(`http://localhost:3000/api/books/${idBook}`);
  }

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
          Npages: livro.Npages,
          imagemURL: livro.imagemURL
        }
      })
    }))
    .subscribe((books) => {
      this.books = books;
      this.listaBooksAtualizada.next([...this.books]);
    })
  }

  updateBook (id: string, titulo: string, autor: string, Npages: string) {
    const book: Book = { id, titulo, autor, Npages, imagemURL: null };
    this.httpClient.put(`http://localhost:3000/api/books/${id}`, book)
    .subscribe((res => {
      const copia = [...this.books];
      const indice = copia.findIndex (bok => bok.id === book.id);
      copia[indice] = book;
      this.books = copia;
      this.listaBooksAtualizada.next([...this.books]);
      this.router.navigate(['/'])
    }));
  }

  adicionarBook(titulo: string, autor: string, Npages: string, imagem: File) {
    // const book: Book = {
    //   id: null,
    //   titulo: titulo,
    //   autor: autor,
    //   Npages: Npages,
    // };
    const dadosBook = new FormData();
    dadosBook.append("titulo", titulo);
    dadosBook.append("autor", autor);
    dadosBook.append("Npages", Npages);
    dadosBook.append("imagem", imagem);

    this.httpClient.post<{mensagem: string, book: Book}> ('http://localhost:3000/api/books', dadosBook).subscribe(
      (dados) => {
      // console.log (dados.mensagem);
      // book.id = dados.id;
      const book: Book = {
        id: dados.book.id,
        titulo: titulo,
        autor: autor,
        Npages: Npages,
        imagemURL: dados.book.imagemURL
      };
      this.books.push (book);
      this.listaBooksAtualizada.next ([...this.books]);
      this.router.navigate(['/'])
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
