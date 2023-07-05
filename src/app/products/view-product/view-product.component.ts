import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {
  productId: any;
  product:any;
  constructor(private viewRoute:ActivatedRoute ,private api:ApiService){}

ngOnInit(): void {

// to fetch parameteres details
  this.viewRoute.params.subscribe((result:any)=>{
    console.log(result.productId)
    this.productId=result.productId;

    //to fetch particular product details
this.api.viewProduct(this.productId).subscribe((result:any)=>{
  console.log(result);
this.product=result
  
},
(result:any)=>{
  console.log(result.error);
  
})
  })
}
//api function add product to wishlist
addToWishlist(){
  const {id,title,price,image}=this.product

  this.api.addToWishlist(id,title,price,image).subscribe((result:any)=>{
    alert(result)
  
    
  },
  (result:any)=>{
    alert(result.error)
   
    
  }
  
  )

}
addToCart(product:any){
  console.log(product);
  //add quantity
  Object.assign(product,{quantity:1})
  console.log(product);

  //api call
  this.api.addToCart(product).subscribe((result:any)=>{
    this.api.cartCount();
    alert(result)
  },
  (result:any)=>{
    alert(result.error)
  })
  
}

}
