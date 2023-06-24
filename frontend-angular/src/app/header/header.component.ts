import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  adminLoggedIn=false;
  userloggedin = false;
  username="";
  categories:any;
 cartcount = 0;

  constructor(private api:ApiService , private router:Router) { }

  ngOnInit() {

    if(localStorage.getItem("usertype")==="admin")
    this.adminLoggedIn=true;

    if(localStorage.getItem("usertype") === "user"){
      this.userloggedin = true;
      this.username = localStorage.getItem("name") || "";


      if(localStorage.getItem("products") != null){
        let products = JSON.parse(localStorage.getItem("products") || "[]");
        this.cartcount = products.length;
      }


    this.api.post("bookcategory/list", {}).subscribe((result:any)=>{this.categories = result.data;
    });

  }

}

logout(){
  localStorage.clear();
  window.location.replace("/");
}
}
