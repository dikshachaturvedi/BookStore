import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-booko',
  templateUrl: './booko.component.html',
  styleUrls: ['./booko.component.css']
})
export class BookoComponent implements OnInit {


  products:any;
  baseurl = this.api.baseurl;


  constructor(private api:ApiService) { }

  ngOnInit(): void {
    this.bind();
  }

  bind(){
    this.api.post("book/list", {data:{pcid:""}}).subscribe((result:any)=>{
      this.products = result.data;
    });
  }

  deleteproduct(id:string){
    if(confirm("Sure to delete?")){
      this.api.post("book/delete", {data:{id:id}}).subscribe((result:any)=>{
        this.bind();
      });
    }
  }

}
