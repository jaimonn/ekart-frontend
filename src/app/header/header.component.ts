import { ApiService } from './../products/services/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private api:ApiService){}
//to hold search term
searchTerm:string=""
//to hold cart item count
cartItemsCount:number =0
 ngOnInit(): void {
   this.api.getCartItemCount.subscribe((data:any)=>{
    console.log(data);//length of cart array
    this.cartItemsCount=data
   })
 }
search(event:any){
console.log(event.target.value);//search value
this.api.searchTerm.next(event.target.value)//add search term to behaviour subject
}
}
