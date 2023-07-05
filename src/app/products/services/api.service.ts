import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
//to hold cart count
  getCartItemCount= new BehaviorSubject(0)//intial value 0
//to hold search term
searchTerm= new BehaviorSubject('')



  //backend url path
BASE_URL='http://localhost:5000'
  constructor(private http:HttpClient) {
    this.cartCount()
  }



  //get all products
getAllProducts(){
  return this.http.get(`${this.BASE_URL}/products/all-products`)


}


//view product
viewProduct(id:any){
return this.http.get(`${this.BASE_URL}/products/viewproduct/${id}`)
}

//add to wishlist
addToWishlist(id:any,title:string,price:any,image:string){
  const body={
    id,
    title,
    price,
    image
  }
  return this.http.post(`${this.BASE_URL}/products/addtowishlist`,body)
}

getWishlist(){
  return this.http.get(`${this.BASE_URL}/products/getwishlist`)

}
//add to cart
addToCart(product:any){

  const body={
    id:product.id,
    title:product.title,
    price:product.price,
    image:product.image,
    quantity:product.quantity
  }
  
  
    return this.http.post(`${this.BASE_URL}/products/addtocart`,body)
  }
//delete wishlistproducts
deleteWishlist(id:any){
  return this.http.delete(`${this.BASE_URL}/products/deleteWishlist/${id}`)
}

//get cart
getCart(){
  return this.http.get(`${this.BASE_URL}/products/getcart`)
}

//cart count
cartCount(){
this.getCart().subscribe((result:any)=>{
  this.getCartItemCount.next(result.length)

})

}
//delete from cart
removeCartItem(id:any){
  return this.http.delete(`${this.BASE_URL}/products/removecart/${id}`)
  
}
incrementCart(id:any){
  return this.http.get(`${this.BASE_URL}/products/increment/${id}`)
}
decrementCart(id:any){
  return this.http.get(`${this.BASE_URL}/products/decrement/${id}`)
 
}
}


