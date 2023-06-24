import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
 import { BookdetailComponent } from './bookdetail/bookdetail.component';
import { BooksComponent } from './books/books.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrdersuccessComponent } from './ordersuccess/ordersuccess.component';

const routes: Routes = [
  {path:"" ,component:HomeComponent},
  {path:"home" ,component:HomeComponent},
  {path:"about" , component:AboutComponent},
  {path:"contact" , component:ContactComponent},
  {path:"books/:categoryid" , component:BooksComponent},
 {path:"bookdetail/:id" , component:BookdetailComponent},
  {path:"adminlogin", component:AdminLoginComponent},
  {path:"login" , component:LoginComponent},
  {path:"cart" , component:CartComponent},
  {path:"checkout" , component:CheckoutComponent},
 {path:"register" , component:RegisterComponent},
 {path:"ordersuccess" , component:OrdersuccessComponent},
 {path:"admin" , loadChildren:'./admin/admin.module#AdminModule'} ,
 {path:"user" , loadChildren:'./user/user.module#UserModule' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
