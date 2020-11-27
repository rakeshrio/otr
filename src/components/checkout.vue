<template>
  <div class="col-md-12 col-12 " style="overflow:hidden">
      
    <div class="col-md-9 col-12 p-0" style="margin:0 auto">
        <h1 class="font2 mb-4 mt-5 text-left" style="">Billing Details</h1>
        <div class="col-md-8 m-0 p-0 col-12">
            <form class="text-left">
        <div class="form-row text-left">
            <div class="form-group col-md-6 col-6">
            <label for="inputEmail4">First Name</label>
            <input type="text" v-model="first_name" class="form-control" id="inputEmail4" placeholder="">
            </div>
            <div class="form-group col-md-6 col-6">
            <label for="inputPassword4">Last Name</label>
            <input type="text" v-model="last_name" class="form-control" id="inputPassword4" placeholder="">
            </div>
        </div>
  
    
        <div class="form-group  ">
            <label for="inputZip">Phone Number</label>
            <input type="number" v-model="phone_number" class="form-control" id="inputZip">
        </div>
        <div class="form-group  ">
            <label for="inputZip">Email Address</label>
            <input type="email" v-model="email"  class="form-control" id="inputZip">
        </div>
        <h1 class="font2 mb-4 mt-5 text-left" style="">Delivery Details</h1>
        <div class="form-group  ">
            <label for="inputZip">Street Address</label>
            <input type="text" v-model="street_address"  class="form-control" id="inputZip">
        </div>
        <div class="form-group  ">
            <label for="inputZip">City/Town</label>
            <input type="text" v-model="city"  class="form-control" id="inputZip">
        </div>
        <div class="row col-md-12 m-0 p-0">
            <div class="form-group  col-md-6 m-0 p-0 ">
            <label for="inputZip">State</label>
            <input type="text" v-model="state"  class="form-control" id="inputZip">
        </div>
        <div class="form-group  col-md-6 m-0 pr-0">
            <label for="inputZip">Post Code</label>
            <input type="number" v-model="post_code"  class="form-control" id="inputZip">
        </div>
        <h1 class="font2 mb-4 mt-5 text-left" style="">RTO Reg Details</h1>
       <div class="col-md-12 m-0 p-0 my-2">
            <label for="" >
            <input type="checkbox" v-model="rtoSameAsDelivery">
            RTO Address Same As Delivery Address
        </label>
       </div>
        <div class="form-group col-md-12 mb-3 m-0 p-0  ">
            <label for="inputZip">Street Address</label>
            <input type="text" v-model="rto_street_address"  class="form-control" id="inputZip">
        </div>
        <div class="form-group col-md-12 m-0 p-0">
            <label for="inputZip">City/Town</label>
            <input type="text" v-model="rto_city"  class="form-control" id="inputZip">
        </div>
        <div class="row col-md-12 m-0 my-3 p-0">
            <div class="form-group  col-md-6 m-0 p-0 ">
            <label for="inputZip">State</label>
            <input type="text" v-model="rto_state"  class="form-control" id="inputZip">
        </div>
        <div class="form-group  col-md-6  m-0 p-0 pr-0">
            <label for="inputZip">Post Code</label>
            <input type="number" v-model="rto_post_code"  class="form-control" id="inputZip">
        </div>
        </div>
        </div>
        </form>
        </div>


        <h1 class="font2 mb-4 mt-5 text-left" style="">Your Order</h1>
        <table class="table table-bordered">
            <thead>
                <tr class="text-left">
                <th scope="col">Product</th>
                <th scope="col">Total</th>
            
                </tr>
            </thead>
            <tbody class="text-left">
                <tr v-if="superdata">
                    <th scope="row">{{cartdata.make}} {{cartdata.model}} {{superdata[0].color}} {{superdata[0].variant}}</th>
                    <td>₹ {{superdata[0].price}}</td>   
                </tr>

                <!-- <tr>
                    <th scope="row">Subtotal</th>
                    <td>₹ {{superdata[0].price}}</td>
                </tr> -->
<!-- 
                <tr>
                    <th scope="row">Total</th>
                    <td>₹ {{superdata[0].price}}</td>
                </tr> -->

            </tbody>
        </table>
        <div class="col-md-12 col-12 m-0 mt-4 p-3 mb-5 pb-5" style="background:#EBE9EB; border-radius:5px">
            <div class="col-md-12 col-12 row mb-3">
                <div class="col-md-6 m-0 p-0 text-left">
                    <p class="m-0 p-0 font3"><span><i class="fa fa-dot-circle-o pr-3" style="color:blue" aria-hidden="true"></i></span>Credit Card/Debit Card/NetBanking </p>
                </div>
                <div class="col-md-6 ghj text-left">
                    <img src="https://cdn.razorpay.com/static/assets/logo/payment.svg" alt="Credit Card/Debit Card/NetBanking">
                </div>   
            </div>
            <div class="col-md-12 p-2 mb-3" style="background:#DFDCDE">
                <p class="text-left" style="color: #515151;font-size: .92em;">Pay securely by Credit or Debit card or Internet Banking through Razorpay.</p>
            </div>
            <hr>
            <p class="text-left bnm">Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our <span style="color:#4E44D8">Privacy Policy</span></p>
            <div class="col-md-12 mt-4 text-right">
                <p style="color:red" v-if="!valid">Please fill all the fields.</p>
                <button class="p-2 " :disabled="!valid" style="border:none;border-radius:5px; background:#4E44D8; color:white;font-weight:500;letter-spacing:1px" @click="placeOrder">Place Order</button>
            </div>
        </div>
    
    </div>    
  </div>
</template>

<script>
const axios = require('axios');

export default {
    data(){
        return{
            superset:'',
            superdata:[],
            first_name:'',
            last_name:'',
            phone_number:'',
            email:'',
            otr_order_id:'',
            razorpay_order_id:'',
            street_address:'',
            post_code:'',
            city:'',
            state:'',
            rto_street_address:'',
            rto_post_code:'',
            rto_city:'',
            rto_state:'',
            rtoSameAsDelivery :false
        }
    },
 

    methods: {

        rtoSameAsDeliveryTrigger(){
            if(this.rtoSameAsDelivery){
                this.rto_street_address = this.street_address,
                this.rto_post_code = this.post_code,
                this.rto_city = this.city,
                this.rto_state =this.state

            }else{
                this.rto_street_address = '',
                this.rto_post_code = '',
                this.rto_city = '',
                this.rto_state = ''
            }
        },
        
        goto() {
            this.$router.push('/checkout')
        },
        updatedatabase(res){
            window.console.log(res)
            
            axios.put('https://backend-bikex.herokuapp.com/api/otr_purchase/confirmOrder/'+ this.otr_order_id , {
                razorpay_order_id: this.razorpay_order_id,
                razorpay_payment_id: res.razorpay_payment_id,
                payment_status:1,
                booking_status:1,
                comment:'No comment Yet'
            }).
            then(()=> {
                this.$router.push('/success/' + this.otr_order_id)
            })
            .catch(x=>{
                window.console.log(x.response.data.msg)
                this.$bvToast.toast(`Some error Occured.`, {
                    title: 'Error',
                    autoHideDelay: 5000,
                })
            })
        },
        placeOrder(){
            axios.post('https://backend-bikex.herokuapp.com/api/otr_purchase/generateOrder' , {
                firstname: this.first_name,
                lastname: this.last_name,
                phone:this.phone_number,
                email:this.email,
                payment_status:0,
                booking_status:0,
                model_id: this.cartdata._id,
                superset_data: this.superdata[0],
                amount: this.superdata[0].price
            }).
            then(response=> {
                this.otr_order_id = response.data._id
                this.makepayment(response.data._id)
            })
            .catch(x=>{
                window.console.log(x.response.data.msg)
                this.$bvToast.toast(x.response.data.msg, {
                    title: 'Error',
                    autoHideDelay: 5000,
                })
            })   
        },
       makepayment(id){
            this.loading=true
            var options = {
                            "key": "rzp_test_bddb6fLRf7CHxu", // rzp_live_Vi238TQEagSN3x Enter the Key ID generated from the Dashboard
                            "amount": this.superdata[0].price * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise or INR 500.
                            "currency": "INR",
                            "name": this.cartdata.make + ' ' + this.cartdata.model ,
                            "email":this.email,
                            "phone":this.phone_number,
                            "order_id":id,
                            "description": "Purchase " + this.cartdata.make + ' ' + this.cartdata.model,
                            "payment_capture":1,    
                            "handler": ((res)=>{
                                 this.updatedatabase(res)
                            }),
                            "notes": {
                                "address": "note value",
                                "vehicle_id":this.cartdata._id,
                                "superset_id": this.superdata[0].id
                            },
                            "theme": { 
                                "color": "#ffb52f"
                            }
                        };
                        this.$http.post('https://cors-anywhere.herokuapp.com/https://rzp_live_Vi238TQEagSN3x:c2ImBntiX8l4ZwHPTXfbJdx4@bikex.in/v1/orders',{
                            "amount":this.superdata[0].price * 100,
                            "currency":"INR",
                            "payment_capture":1
                        }).then((res)=>{
                            window.console.log(res)
                            this.razorpay_order_id = res.id
                            var rzp1 = new window.Razorpay({...options,order_id:res.order_id}); 
                            rzp1.open()
                            }).catch((err)=>{
                                window.console.log(err)
                            })
        },
        fetchDetail(){
            this.$store.dispatch('getModelsWithoutDealer',{"id":this.$route.params.id})
        }
    },
created(){
    this.fetchDetail()
    this.superset = this.$route.params.value

},
watch:{
    cartdata(){
       this.superdata = 
        this.cartdata.superset.filter(x=>{
        return x.id == this.superset

        })
    },
     rtoSameAsDelivery(){
            this.rtoSameAsDeliveryTrigger()
        }
},
computed:{
    cartdata(){
        return this.$store.state.getModelsWithoutDealer
    },
    valid(){
        if(this.first_name && this.last_name && this.phone_number && this.email){
            return true
        }else{
            return false
        }
    }
}

}
</script>


<style scoped>
.button:disabled{
    opacity: 0.2 !important;
}
 @font-face {
  font-family: Gilroy;
  src: url(../assets/font/Gilroy-Light.otf);
 }
@font-face {
  font-family: Gilroyf;
  src: url(../assets/font/Gilroy-ExtraBold.otf);
}
.font2{
    font-size: 18px;
    font-weight: bold;
    font-family: Gilroyf;
    color: #484848;
  }
  p{
      margin:0;
      padding: 0;
  }
@media all and (max-width:600px){
 .ghj{
     text-align:center !important
 }
 .bnm{
     font-size:14px
 }
 .font3{
         font-size: 14px;
    color: black;
    font-weight: 500;
 }
}
</style>