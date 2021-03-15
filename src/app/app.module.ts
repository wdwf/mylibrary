import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { InputBookComponent } from './input-book/input-book.component';
import { CardBookComponent } from './card-book/card-book.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    InputBookComponent,
    CardBookComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
