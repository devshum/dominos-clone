import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LayoutComponent } from './components/layout/layout.component';
import { AuthComponent } from './components/auth/auth.component';
import { AppRoutingModule } from '../app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    LayoutComponent,
    AuthComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  exports: [
    LayoutComponent
  ]
})
export class LayoutModule { }
