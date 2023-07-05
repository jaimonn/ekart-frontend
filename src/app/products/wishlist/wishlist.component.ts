import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  addwishlist:any=[]
  constructor(private api:ApiService){}

  ngOnInit(): void {
    this.api.getWishlist().subscribe((result)=>{
      this.addwishlist=result
    },
    (result:any)=>{
console.log(result.error);

    }
    )

   
  }

  deleteWishlist(id:any){
    this.api.deleteWishlist(id).subscribe((result)=>{
      this.addwishlist=result
      // alert('product deleted successfully')
    },
    (result:any)=>{
      alert(result.error)
    })
  }

  addToCart(product:any){
    console.log(product);
    //add quantity
    Object.assign(product,{quantity:1})
    console.log(product);
  
    //api call
    this.api.addToCart(product).subscribe((result:any)=>{
      this.api.cartCount();
      this.deleteWishlist(product.id)
      alert(result)
    },
    (result:any)=>{
      alert(result.error)
    })
    
  }
  
  


}
