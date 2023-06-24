import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {


  id:any;
  formdata:any;
  categories:any;
  product:any;

  imagestring = "";
  baseurl = this.api.baseurl;

  constructor(private api:ApiService , private route:ActivatedRoute, private router:Router) { }

  ngOnInit() {

    this.id = this.route.snapshot.paramMap.get("id");

    this.api.post("bookcategory/list", {}).subscribe((result:any)=>{
      this.categories = result.data;

    })


    if(this.id != null){
      this.api.post("book/get", {data:{id:this.id}}).subscribe((result:any)=>{
        this.product = result.data;
        this.bind();
      });
    }
    else{
      this.bind();
    }
  }

    bind(){
    this.formdata = new FormGroup(
      {
        id:new FormControl(this.product != null ? this.id : ""),
        pcid:new FormControl(this.product != null ? this.product.pcid : "", Validators.required),
        name:new FormControl(this.product != null ? this.product.name : "", Validators.required),
        description:new FormControl(this.product != null ? this.product.description : "", Validators.required),
        specification:new FormControl(this.product != null ? this.product.specification : "", Validators.required),
        mrp:new FormControl(this.product != null ? this.product.mrp : 0, Validators.required),
        price:new FormControl(this.product != null ? this.product.price : 0, Validators.required),
        instock:new FormControl(this.product != null ? this.product.instock : "Yes", Validators.required),
        isactive:new FormControl(this.product != null ? this.product.isactive : "Yes", Validators.required),
        image:new FormControl("")
      }
    )



  }



  onClickSubmit(data:any){
    data.image = this.imagestring;
    this.api.post("book/save", {data:data}).subscribe((result:any)=>{
      console.log(result);
      this.router.navigate(['/admin/booko']);
    })
  }


  imageChanged(event:any){
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = ()=>{
      if(reader.result != null){
        this.imagestring = reader.result.toString();
      }
    }
  }

}
