import { NgModule } from '@angular/core';
import { RouterModule, Routes  } from '@angular/router';

import { CardBookComponent } from './card-book/card-book.component';
import { InputBookComponent  } from './input-book/input-book.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';

const routes: Routes = [
  { path: '', component: CardBookComponent },
  { path: 'criar', component: InputBookComponent },
  { path: 'editar/:idBook', component: InputBookComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent }
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
