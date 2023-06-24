import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  categories:any;
  
  baseurl = this.api.baseurl;

  constructor(private api:ApiService) { }

  ngOnInit() {


    this.api.post("bookcategory/list", {}).subscribe((result:any)=>{
      this.categories = result.data;
    });
  }

}
