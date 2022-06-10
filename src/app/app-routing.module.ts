import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // { 
  //   path: '',
  //   pathMatch: 'full',
  //   redirectTo: ''
  // },
  { path: '', loadChildren: () => import('./module-pizzas/pizzas.module').then(m => m.PizzasModule)},
  { path: 'drinks', loadChildren: () => import('./module-drinks/drinks.module').then(m => m.DrinksModule)},
  // { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
