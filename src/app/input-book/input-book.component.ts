import { Component, EventEmitter , Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BookService } from '../card-book/book.service';

@Component({
  selector: 'app-input-book',
  templateUrl: './input-book.component.html',
  styleUrls: ['./input-book.component.css']
})
export class InputBookComponent {

  constructor(public bookService: BookService) {}

  onAdicionarBook(form: NgForm) {
    if(form.invalid) {
      return;
    }
    this.bookService.adicionarBook(
      form.value.id,
      form.value.titulo,
      form.value.autor,
      form.value.Npages
    );
    form.resetForm();
  }

}
