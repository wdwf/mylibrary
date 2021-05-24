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
  private listaBooksAtualizada = new Subject<{books: Book[], maxBooks: number}>();
  private books: Book[] = [];

  constructor (private httpClient: HttpClient, private router: Router){}


  getBooks( pagesize: number, page: number ): void {
    const parametros = `?pagesize=${pagesize}&page=${page}`;
    this.httpClient
    .get <{mensagem: string, books: any, maxBooks: number}>(
      'http://localhost:3000/api/books' + parametros)
      .pipe(map((dados) => {
      return {
        books: dados.books.map(livro => {
        return {
          id: livro._id,
          titulo: livro.titulo,
          autor: livro.autor,
          Npages: livro.Npages,
          imagemURL: livro.imagemURL
        }
      }),
        maxBooks: dados.maxBooks
      }
    }))
    .subscribe((dados) => {
      this.books = dados.books;
      this.listaBooksAtualizada.next(
        {
          books: [...this.books],
          maxBooks: dados.maxBooks
        }
      );
    })
  }

  updateBook (id: string, titulo: string, autor: string, Npages: string, imagem: File | string) {
    //const book: Book = { id, titulo, autor, Npages, imagemURL: null };
    let bookData: Book | FormData;
    if(typeof(imagem) === 'object') {
      bookData = new FormData();
      bookData.append("id", id);
      bookData.append('titulo', titulo);
      bookData.append('autor', autor);
      bookData.append("Npages", Npages);
      bookData.append('imagem', imagem, titulo);
    } else {
      bookData = {
        id: id,
        titulo: titulo,
        autor: autor,
        Npages: Npages,
        imagemURL: imagem
      }
    }
    console.log (typeof(bookData));
    this.httpClient.put(`http://localhost:3000/api/books/${id}`, bookData)
    .subscribe((res => {
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

    this.httpClient.post<{mensagem: string, book: Book}> ('http://localhost:3000/api/books', dadosBook)
    .subscribe((dados) => {
      this.router.navigate(['/'])
    });
  }

  getListaDeLivrosAtualizadaObservable() {
    return this.listaBooksAtualizada.asObservable();
  }

  removerBook (id: string){
    return this.httpClient.delete(`http://localhost:3000/api/books/${id}`);
  }

  getBook (idBook:string) {
    return this.httpClient.get<{_id: string, titulo: string, autor: string, Npages: string, imagemURL: string}>(`http://localhost:3000/api/books/${idBook}`);
  }
}
