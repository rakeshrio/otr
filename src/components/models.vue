<template>
  <div class="col-md-12 col-12 my-3 p-0">
      <div class="col-md-9 col-12  text-left" style="margin:0 auto">
        <!-- <div class="col-md-4 col-12 m-0 p-0 pb-5">
            <img src="https://app-5f576523c1ac180394b7bf13.closte.com/wp-content/uploads/2020/10/hero-logo-1.png" alt="" width="36%" height="auto">
        </div> -->

        <!-- <h4 class="heading-title pb-2">Scooters</h4>
        <h4 class="heading-title">Bikes</h4> -->
        <div class="col-md-12 col-12 row m-0 p-0 my-4">      
            <div class="col-md-3 col-6 m-0 p-0 pr-4 pb-4" v-for="(data,index) in allModels " :key="index" >
                <div class="card " style="border-radius: 8px;box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.21);">
                    <div class="card-body ">
                        <img :src="data.hero_image" alt="" width="100%">
                        <h2 class="title mt-4">{{data.make}} {{data.model}}</h2>
                        <h2 class="title  mt-4" style="color:#4E44D8; font-weight:bold" v-if="data.superset.length > 0 ">{{getPrice(data.superset)}}</h2>
                        <h2 class="price pb-1"></h2>
                        <div class="col-md-12 d-flex justify-content-between">
                            <button class="butn px-3 py-2 " @click="goToCheckout(data._id)">Buy Now</button>
                            <!-- <p class="labels" @click="compare(data)">COMPARE</p> -->
                        </div>
                    </div>
                </div>
            </div> 
            <div class="col-md-3 col-12 m-0 p-0 pr-4 pb-4" v-if="allModels.length==0" >
                <div class="card " style="border-radius: 8px;box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.21);">
                    <div class="card-body ">
                       <p><strong>We are loading</strong></p>
                    </div>
                </div>
            </div> 
        </div>
      </div>
  </div>
</template>

<script>

import * as _ from 'lodash' 
export default {
    data(){
        return{
          
        }
    },
    created(){
        this.apply();
    },
    watch:{

    },
    methods:{
        apply(){
            this.$store.dispatch('getModels')
        },
        getPrice(data){
         var max =  _.maxBy(data,'price')
         var min = _.minBy(data,'price')
         if(min == max){
             return max.price
         }else{
             
            return this.$options.filters.currency(min.price) + '-' + this.$options.filters.currency(max.price)
         }
        },
        getprice(data){
            return data[0].price
        },
        goToCheckout(id){
            this.$router.push('/display/' + id)
        },
        compare(data){
            if(this.compareData.length < 3){
                if(this.compareData){
                    var compare = this.compareData
                }else{
                    compare = []
                }
                compare.push(data)
                localStorage.compare = JSON.stringify(compare)
            }else{
                alert('You can add only three data')
            }
        }

    },
    computed:{
        allModels(){
            return this.$store.state.currentStateModel
        },
        compareData(){
            return JSON.parse(localStorage.compare)
        }
    }
  
}
</script>

<style scoped>
.card-body {
    flex: 1 1 auto;
    min-height: 1px;
    padding: 1rem !important;
}
.heading-title{
    color: #2A2A2A;
    font-size: 24px;
    font-weight: bold;
    font-family: "Gilroyf"
}
.title{
    font-size: 17px;
    font-weight: normal;
    font-family: "Gilroy"
}
.card{
    border:none
}
.btn
:active {
  background-color: #3e8e41;
  box-shadow: 0 5px #666;
  transform: translateY(4px);
}
.price{
    font-size: 17px;
    font-weight: bold;
    color: #4E44D8;
    font-family: "Gilroyf"
}
.butn{
 border:none;
 background-color: #EBE9EB;
font-weight: 500;
font-family: "Gilroy";
    font-size: 100%;
    margin: 0;
    line-height: 1;
    cursor: pointer;

    overflow: visible;
    padding: .618em 1em;

    border-radius: 3px;
    left: auto;
    color: #515151;
    background-color: #ebe9eb;
    border: 0;
    display: inline-block;
    background-image: none;
    box-shadow: none;
    text-shadow: none;
}

/* @font-face {
  font-family: Gilroy;
  src: url(../assets/font/Gilroy-Light.otf);
 
}
@font-face {
  font-family: Gilroyf;
  src: url(../assets/font/Gilroy-ExtraBold.otf);
 
} */
@media only screen and (max-width: 600px) {
  .col-12{
    padding-right:0!important;
  }
  .title{
      font-size:12px
  }
}
</style>