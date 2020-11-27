<template>
  <div class="col-md-12  col-12" style="overflow:hidden">
      <div class="col-md-9 p-0" style="margin:0 auto">
        <h1 class="font2 mb-4 mt-5 text-left" style="">Your Cart</h1>
     
        <div class="table-responsive">
            <table class="table table-bordered col-12 m-0 p-0" style="font-family:gilroy"> 
            <thead class="col-12">
                <tr>
                <th scope="col"></th>
                <th scope="col" class="product-name">Product</th>
                <th scope="col" class="product-price">Price</th>
                <!-- <th scope="col" class="product-quantity">Quantity</th> -->
                <th scope="col" class="product-subtotal">Total</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class=""><img :src="cartdata.hero_image" alt="" height="30px" width="auto"></td>
                    <td  class="product-name" data-title="Product">{{cartdata.make}} {{cartdata.model}} {{superdata[0].color}} {{superdata[0].variant}}</td>
                    <td class="product-price" data-title="Price">{{superdata[0].price}}</td>
                    <!-- <td class="product-quantity" data-title="Quantity">1</td> -->
                    <td class="product-subtotal" data-title="Subtotal">{{superdata[0].price}}</td>
                </tr>
                
            </tbody>
        </table>
        </div>

        <div class="col-md-12  ">
          
            
        </div>
        <div class="col-md-12  m-0 p-0">
            <div class="col-md-5 mb-5 m-0 p-0" style="float:right">
            
                <div
                    class="d-flex m-0 p-0 col-md-12 justify-content-between transit"
                    v-for="(data, index) in currentSelected[0].additional_cost[0]"
                    :key="index"
                >   
                    <!-- <p class="labels m-0 p-0 mt-1">
                    {{ data.name }}
                    </p>
                    <p class="labels m-0 p-0 mt-1">₹ {{ data.price }}</p> -->
                </div>
                <h1 class="font2 mb-4 mt-5 text-left" style="">Cart Totals</h1>
                <table class="table table-bordered" style="font-family:gilroy">
                    <tbody>
                        <!-- <tr>
                            <th>Subtotal</th>
                            <td>₹ {{superdata[0].price}}</td>
                        </tr> -->
                       
                        <tr>
                            <th>Total</th>
                            <td>₹ {{superdata[0].price}}</td>
                        </tr>
                    </tbody>
                </table>
                <div class="col-md-12 m-0 p-2" style="background:#4E44D8">
                    <button style="border:none;background:none;color:white" @click="goto">Proceed to Checkout</button>
                </div>
            </div>
        </div>
      </div>
  </div>
</template>

<script>
const axios = require("axios");
import * as _ from "lodash";
export default {
    data(){
        return{
            superset:'',
            superdata:[],
            currentSelected: [],
      currentPrice: 0,
        }
    },
    methods: {
        goto() {
            this.$router.push('/checkout/'+ this.$route.params.id + '/' + this.$route.params.value )
        },
        fetchDetail(){
            this.$store.dispatch('getModelsWithoutDealer',{"id":this.$route.params.id})
        }
    },

 created() {
      
    this.fetchDetail()
    this.superset = this.$route.params.value


    axios
      .get(
        "https://backend-bikex.herokuapp.com/api/otr_models/model-data-with-dealer/" +
          this.$route.params.id
      )
      .then((result) => {
        this.vehicle = result.data;
        this.variantsList = _.uniqBy(this.vehicle.superset, "variant");
        this.currentImage = this.vehicle.hero_image;
        this.currentSelected.push(this.vehicle.superset[0]);
        this.loading = false;
      })
      .catch((error) => {
        throw new Error(`API ${error}`);
      });
  },
watch:{
    cartdata(){
       this.superdata = 
        this.cartdata.superset.filter(x=>{
        return x.id == this.superset

        })
    },
    
},
computed:{
    cartdata(){
        return this.$store.state.getModelsWithoutDealer
    }
}

}
</script>

<style scoped>
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
 @media all and (max-width:600px){
  
.bnm{
    display:none !important
    }
}
.labels {
  font-size: 13px;
  color: gray;
}
</style>