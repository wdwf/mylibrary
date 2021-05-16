import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Book } from '../card-book/book.model';
import { BookService } from '../card-book/book.service';
import { from } from 'rxjs';
import { mimeTypeValidator } from './mime-type.validator';

@Component({
  selector: 'app-input-book',
  templateUrl: './input-book.component.html',
  styleUrls: ['./input-book.component.css']
})
export class InputBookComponent implements OnInit {

  private modo: string = 'criar';
  private idBook: string;
  public book: Book;
  public estaCarregando: boolean = false;
  form: FormGroup;
  previewImagem: string;

  onSaveBook() {
    if (this.form.invalid) return;
    this.estaCarregando = true;

    if (this.modo === "criar") {
      this.bookService.adicionarBook(
        this.form.value.titulo,
        this.form.value.autor,
        this.form.value.Npages,
        this.form.value.imagem
      );
    }
    else {
      this.bookService.updateBook (
        this.idBook,
        this.form.value.titulo,
        this.form.value.autor,
        this.form.value.Npages,
      )
    }

    this.form.reset ();
  }

  constructor(public bookService: BookService, public route: ActivatedRoute) {}


  ngOnInit(): void {
    this.form = new FormGroup ({
      titulo: new FormControl (null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      autor: new FormControl (null, {
        validators: [Validators.required]
      }),
      Npages: new FormControl (null, {
        validators: [Validators.required]
      }),
      imagem: new FormControl (null, {
        validators: [Validators.required],
        asyncValidators: [mimeTypeValidator]
      })
    })

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("idBook")) {
        this.modo = "editar";
        this.idBook = paramMap.get("idBook");
        this.estaCarregando = true;
        this.bookService.getBook(this.idBook).subscribe(dadosBok => {
          this.estaCarregando = false;
          this.book = {
            id: dadosBok._id,
            titulo: dadosBok.titulo,
            autor: dadosBok.autor,
            Npages: dadosBok.Npages,
            imagemURL: null
          };
          this.form.setValue({
            titulo: this.book.titulo,
            autor: this.book.autor,
            Npages: this.book.Npages
          })
        });
      }
      else {
        this.modo = "criar";
        this.idBook = null;
      }
    });
  }

  onImagemSelecionada (evente: Event) {
    const arquivo = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({'imagem': arquivo});
    this.form.get('imagem').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
    this.previewImagem = reader.result as string;
    }
    reader.readAsDataURL(arquivo);
  }




}
