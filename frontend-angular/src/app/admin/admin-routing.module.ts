import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//import { BooksComponent } from '../books/books.component';
import { BookComponent } from './book/book.component';
import { BookoComponent } from './booko/booko.component';
import { CategoriesComponent } from './categories/categories.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MainComponent } from './main/main.component';
import { OrdersComponent } from './orders/orders.component';


const routes: Routes = [
  {path:'' , component:MainComponent,
  children:[
    {path:'dashboard' , component:DashboardComponent},
    {path:'categories', component:CategoriesComponent},
    {path:'booko' , component:BookoComponent},
    {
      path:'book' ,component:BookComponent
    },
    {path:'orders', component:OrdersComponent},
  
    {
      path:'book/:id' ,component:BookComponent
    }

  

  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
