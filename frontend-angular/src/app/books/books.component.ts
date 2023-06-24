import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  categoryid:any;
  category:any;
  products:any;
  baseurl = this.api.baseurl;

  constructor(private api:ApiService, private route:ActivatedRoute, private router:Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    this.categoryid = this.route.snapshot.paramMap.get("categoryid");
    this.bind();
  }

  bind(){
    this.api.post("bookcategory/get", {data:{id:this.categoryid}}).subscribe((result:any)=>{
      this.category = result.data;
    });
    this.api.post("book/list", {data:{pcid:this.categoryid}}).subscribe((result:any)=>{
      this.products = result.data;
    })
  }
}
