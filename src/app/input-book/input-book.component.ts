import { Component } from '@angular/core';

@Component({
  selector: 'app-input-book',
  templateUrl: './input-book.component.html',
  styleUrls: ['./input-book.component.css']
})
export class InputBookComponent {

  id: string;
  titulo: string;
  autor: string;
  Npages: string;

  Cadastrar() {
    alert("Foiiii")
  }

}
