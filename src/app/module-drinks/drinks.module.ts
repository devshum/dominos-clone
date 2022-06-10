import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DrinksComponent } from './components/drinks/drinks.component';
import { DrinksRoutingModule } from './drinks-routing.module';



@NgModule({
  declarations: [
    DrinksComponent
  ],
  imports: [
    CommonModule,
    DrinksRoutingModule
  ]
})
export class DrinksModule { }
