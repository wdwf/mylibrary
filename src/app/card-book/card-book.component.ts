import { Component, Input } from '@angular/core';
import { Book } from '../card-book/book.model';

@Component({
  selector: 'app-card-book',
  templateUrl: './card-book.component.html',
  styleUrls: ['./card-book.component.css']
})
export class CardBookComponent {

  @Input() colection: Book[] = [];

//Usado como teste para visualização
// colection = [
//   {
//     id: "001",
//     titulo: "Hercules",
//     autor: "Jom",
//     npages: "100"
//   },
//   {
//     id: "002",
//     titulo: "Folhas secas",
//     autor: "Mari",
//     npages: "150"
//   },
// ];

}
