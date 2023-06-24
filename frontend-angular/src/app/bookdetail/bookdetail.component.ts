import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
//import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bookdetail',
  templateUrl: './bookdetail.component.html',
  styleUrls: ['./bookdetail.component.css']
})
export class BookdetailComponent implements OnInit {
  id:any;
  product:any;
  baseurl = this.api.baseurl;
  quantity = 1;
  mrp = 0;
  price = 0;
  size = "";
  color = "";
  message = "";

  @Output() myOutput:EventEmitter<number>= new EventEmitter();

 
  constructor(private api:ApiService, private route:ActivatedRoute) { }

  ngOnInit(): void {

    this.id = this.route.snapshot.paramMap.get("id");
    this.api.post("book/get", {data:{id:this.id}}).subscribe((result:any)=>{
      this.product = result.data;
      console.log(this.product)
      this.mrp = this.product.mrp;
      this.price = this.product.price;
     
    });
    
  }

  addQuantity(){
    this.quantity += 1;
  }

  reduceQuantity(){
    if(this.quantity > 1)
      this.quantity -= 1;
  }




   addToCart(){
    let toaddToCart = false;
        let found =false;
          this.mrp = this.product.mrp;
          this.price = this.product.price;
          found = true;
        
    
   
      this.mrp = this.product.mrp;
      this.price = this.product.price;
      toaddToCart = true;
    
    if(toaddToCart){
      let product = {
                    id:this.id,
                    name:this.product.name,
                    imagepath:this.product.imagepath,
                    quantity:this.quantity,
                    mrp:this.mrp,
                    price:this.price};
      let products = new Array();
      if(localStorage.getItem("products") != null)
        products = JSON.parse(localStorage.getItem("products") || "[]");

      let added = false;
      for(let i = 0; i < products.length; i++){
        if(products[i].id == product.id){
          alert("Product already added to cart");
          added = true;
        }
      }
      if(!added){
        products.push(product);
        localStorage.setItem("products", JSON.stringify(products));
        alert("Product added to cart");
      }
      let span = document.getElementById("spnCount");
      if(span != null){
        span.innerText = products.length.toString();
      }
      // this.myOutput.emit(products.length);
      // this.cartService.updateCartCount(products.length);

    }
  }

   }


