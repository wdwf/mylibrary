import { NgModule } from '@angular/core';
import { RouterModule, Routes  } from '@angular/router';
import { CardBookComponent } from './card-book/card-book.component';
import { InputBookComponent  } from './input-book/input-book.component';

const routes: Routes = [
  { path: '', component: CardBookComponent },
  { path: 'criar', component: InputBookComponent }
];

@NgModule({

  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]


})
export class AppRoutingModule {

}
