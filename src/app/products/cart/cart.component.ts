import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FormBuilder, Validators } from '@angular/forms';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {


  public payPalConfig?: IPayPalConfig;
  showSuccess:boolean =false
  username:any
  housenumber:any
  pincode:any
  phoneno:any
proceedtoPay:boolean=false
  discountStatus:boolean=false
offerClick:boolean=false
  paymentStatus:boolean =false;
//to hold  total price
  totalPrice:number=0
  //hold cart items
  allCart:any=[]
constructor(private api:ApiService,private fb:FormBuilder){}


//address form
addressForm=this.fb.group({//group
  //arrays
  username:['',[Validators.required,Validators.pattern('[a-zA-Z]*')]],
  housenumber:['',[Validators.required,Validators.pattern('[0-9]*')]],
  street:['',[Validators.required,Validators.pattern('[a-zA-Z]*')]],
  state:['',[Validators.required,Validators.pattern('[a-zA-Z]*')]],
  pincode:['',[Validators.required,Validators.pattern('[0-9]*')]],
  mobilenumber:['',[Validators.required,Validators.pattern('[0-9]*')]]
})
submitform(){
// address Valida
if(this.addressForm.valid){
this.paymentStatus=true
this.username=this.addressForm.value.username
this.housenumber=this.addressForm.value.housenumber
this.pincode=this.addressForm.value.pincode
this.phoneno=this.addressForm.value.mobilenumber
}
else{
  alert('please enter valid ddetails')
}
}


ngOnInit(): void {
//paypal function call
  this.initConfig();



  this.api.getCart().subscribe((result:any)=>{
    console.log(result);
    this.allCart=result
    //call cart total
    this.getCartTotal()
  },
  (result:any)=>{
    console.log(result.error);
    
  })
}
removeCartItem(id:any){
  this.api.removeCartItem(id).subscribe((result:any)=>{
    console.log(result);
    //remining items added to cart
    this.allCart=result
    this.api.cartCount()
    this.getCartTotal()
    
  },
  (result:any)=>{
    console.log(result.error);
    
  })
}
//get cart total 
getCartTotal(){
  let total=0
  this.allCart.forEach((item:any)=>{
    total=total+item.grandTotal
    this.totalPrice=Math.ceil(total)
  })

}
incrementCart(id:any){
  this.api.incrementCart(id).subscribe((result:any)=>{
    this.allCart=result
    this.getCartTotal()
  },
  (result:any)=>{
    alert(result.error)
  })
}

decrementCart(id:any){
  this.api.decrementCart(id).subscribe((result:any)=>{
    this.allCart=result
    this.getCartTotal()
},
(result:any)=>{
  alert(result.error)
})
}

offerClicked(){
  this.offerClick=true
}

discount(value:any){
  this.totalPrice= Math.ceil(this.totalPrice*(100-value)/100)
  this.offerClick=false
  this.discountStatus=true
}
makepay(){
  this.proceedtoPay=true
}

modalclose(){
  this.addressForm.reset()
  this.showSuccess=false
  this.paymentStatus=false

}
//payapal function
private initConfig(): void {
  this.payPalConfig = {
  currency: 'EUR',
  clientId: 'sb',
  createOrderOnClient: (data) => <ICreateOrderRequest>{
    intent: 'CAPTURE',
    purchase_units: [
      {
        amount: {
          currency_code: 'EUR',
          value: '9.99',
          breakdown: {
            item_total: {
              currency_code: 'EUR',
              value: '9.99'
            }
          }
        },
        items: [
          {
            name: 'Enterprise Subscription',
            quantity: '1',
            category: 'DIGITAL_GOODS',
            unit_amount: {
              currency_code: 'EUR',
              value: '9.99',
            },
          }
        ]
      }
    ]
  },
  advanced: {
    commit: 'true'
  },
  style: {
    label: 'paypal',
    layout: 'vertical'
  },
  onApprove: (data, actions) => {
    console.log('onApprove - transaction was approved, but not authorized', data, actions);
    actions.order.get().then((details:any) => {
      console.log('onApprove - you can get full order details inside onApprove: ', details);
    });
  },
  onClientAuthorization: (data) => {
    console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
    this.showSuccess = true;
  },
  onCancel: (data, actions) => {
    console.log('OnCancel', data, actions);
  },
  onError: err => {
    console.log('OnError', err);
  },
  onClick: (data, actions) => {
    console.log('onClick', data, actions);
  },
};
}
}