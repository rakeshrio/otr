<template>
  <div
    class="col-md-9 display mb-5"
    style="margin: 0 auto;"
  >
    <div class="row col-md-12 m-0 p-0" v-if="currentSelected.length > 0">
      <div
        class="col-md-6 p-3 col-sm-order-2 txet-left"
        style="overflow:hidden"
      >
        <img class="onHover" width="100%" :src="currentImage" alt="" />
      </div>

      <div style="" class="col-md-6 text-left pt-5 col-sm-order-1 discription">
        <div class="col-md-12">
          <h2 class="heading-title">{{ vehicle.make }} {{ vehicle.model }}</h2>
        </div>
        <div class="col-md-10 my-4">
          <label for="variant">Choose Variant</label>
          <select class="form-control" v-model="variant" @change="setVariant()">
            <option
              :value="data.variant"
              v-for="(data, index) in variantsList"
              :key="index"
            >
              {{ data.variant }}
            </option>
          </select>
        </div>
        <div class="col-md-12 my-4">
          <div class="row col-md-12 m-0 p-0">
            <transition name="fade">
              <div class="col-md-6 m-0 p-0" v-if="variant">
                <p class="m-0 p-0">Choose Color :</p>
                <span
                  v-for="(data, index) in selectColor"
                  :key="index"
                  @click="chooseColor(data.id, data.hex_color)"
                  v-bind:style="{ 'background-color': data.hex_color }"
                  class="dot mr-2 mt-2"
                ></span>
              </div>
            </transition>

            <transition name="fade">
              <div class="col-md-6 m-0 p-0 transit" v-if="color">
                <!-- <p class="">Selected Color :</p>
                <span
                  v-bind:style="{ 'background-color': selectedColor }"
                  class="dot mr-2"
                ></span> -->
                
              </div>
            </transition>
          </div>

          <!-- <p class="mt-2" style="color: red" v-if="!variant">
            *Please select variant.
          </p>
          <p class="mt-2" style="color: red" v-if="!colorCheck && variant">
            *Please select color.
          </p> -->
        </div>
        
        <div class="col-md-12  text-left px-3 my-4">
          <div v-if="currentSelected[0].add_ons.length > 0 && variant && colorCheck">
              <p class="heading-title mt-4 mb-2 m-0 p-0" style="font-size:15px">Add-ons</p>
              <b-card class="mb-2 m-0 p-0" v-for="(data, index) in currentSelected[0].add_ons" :key="index">
                  <input type="checkbox" class="m-0 p-0" :value="data" v-model="selectedaddons"> <span class="checkbox-label heading-title" style="font-size:15px"> {{data.name}} at ₹{{data.price}}</span>
                  <p class="labels m-0 p-0">{{data.description}}</p>
              </b-card>
              </div>

          <transition name="fade">

             

            <div
              v-if="currentSelected[0].additional_cost && variant && colorCheck"
            >
             
              <div
                class="d-flex m-0 p-0 col-md-8 justify-content-between transit"
                v-for="(data, index) in currentSelected[0].additional_cost"
                :key="index"
              >
                <p class="labels m-0 p-0 mt-1">
                  {{ data.name }}
                </p>
                <p class="labels m-0 p-0 mt-1">{{ data.price | currency }}</p>
              </div>
              <div class="text-left mt-3">
                <h1 class="heading-title">
                <strong>Total: {{ totalPrice | currency }}</strong>
              </h1>
              </div>
            </div>
          </transition>
          
          <transition name="fade">
         
            <div
              class="col-md-12 m-0 p-0 mt-4"
              v-if="currentSelected && variant && colorCheck"
            >
              <!-- <h1>
                <strong> ₹. {{ currentSelected[0].price }}</strong>
              </h1> 
            <hr>-->
            <div class="card p-2 mt-2 mb-4">
              <p class="heading-title" style="font-size:15px">FULFILLED BY</p>
              <p class="labels m-0 p-0 mt-1"><span class="bold">Dealer Name:</span> {{ currentSelected[0].dealer.name}}</p>
              <p class="labels m-0 p-0 mt-2"><span class="bold">Phone No:</span>  {{ currentSelected[0].dealer.phone }}</p>
              <p class="labels m-0 p-0 mt-2"><span Address:>Address:</span>  {{ currentSelected[0].dealer.address }}, {{ currentSelected[0].dealer.city }} - {{ currentSelected[0].dealer.pincode }}</p>
              <p v-if="!showDetailDealer" class="link" @click="showDetailDealer=!showDetailDealer">Show More</p>
              <div v-if="showDetailDealer">
                <p class="labels m-0 p-0 mt-2 mb-3"><span class="bold">About Dealer:</span>  {{ currentSelected[0].dealer.comment }}</p>
                <p class="link" @click="showDetailDealer=!showDetailDealer">Show Less</p>
              </div>
            </div>
              <button
                :disabled="!variant"
                class="btn btn-primary"
                style="background: #4e44d8"
                @click="proceed"
              >
                Proceed
              </button>
            </div>
          </transition>
        </div>
      </div>

      <div class="col-md-12 mt-5 row">
        <b-tabs content-class="mt-3 col-md-12" class="col-md-12 heading-title-md" justified>
          <b-tab title="GENERAL SPECIFICATION" active>
            <div class="row">
              <div class="col-md-6 my-5">
                <div class="col-md-12 d-flex m-0 p-0 justify-content-between">
                  <p class="heading-title-sm"><strong>Model/Make</strong></p>
                  <p class="labels">{{ vehicle.make }} {{ vehicle.model }}</p>
                </div>
                <div class="col-md-12 d-flex m-0 p-0 justify-content-between">
                  <p class="heading-title-sm"><strong>MILEAGE</strong></p>
                  <p class="labels">{{ vehicle.mileage}}kmpl</p>
                </div>
                <div class="col-md-12 d-flex m-0 p-0 justify-content-between">
                  <p class="heading-title-sm"><strong>Displacement</strong></p>
                  <p class="labels">{{ vehicle.displacement}}cc</p>
                </div>
                <div class="col-md-12 d-flex m-0 p-0 justify-content-between">
                  <p class="heading-title-sm"><strong>Tank Capacity</strong></p>
                  <p class="labels">{{ vehicle.tank_capacity }}L</p>
                </div>
                <div class="col-md-12 d-flex m-0 p-0 justify-content-between">
                  <p class="heading-title-sm"><strong>Start Type</strong></p>
                  <p class="labels">{{ vehicle.start_type }}</p>
                </div>
              </div>
              <div class="col-md-4 pb-5 m-0 p-0">
                <img style="opacity:0.2" :src="vehicle.brand_logo" width="100%" alt="">
              </div>
            </div>
          </b-tab>
          <b-tab title="ABOUT VEHICLE"><p>
            <div class="col-md-12 my-5 text-left">
              <p class="labels">{{vehicle.about_vehicle}}</p>
            </div>
          </b-tab>

        </b-tabs>
      </div>


    </div>
    <div v-if="loading" class="mt-4 pt-5">
      <b-row>
        <b-col class="mb-4">
          <b-skeleton-img></b-skeleton-img>
        </b-col>
        <b-col class="pt-4 pl-3">
        <b-skeleton type="button"></b-skeleton>
        <b-skeleton class="mt-2" animation="wave" width="85%"></b-skeleton>
         <b-skeleton class="mt-2" type="input"></b-skeleton>
        </b-col>
        <b-col cols="12" class="mt-3">
          <b-skeleton-img no-aspect height="150px"></b-skeleton-img>
        </b-col>
</b-row>

    </div>
  </div>
</template>
<script>
const axios = require("axios");
import * as _ from "lodash";
export default {
  data() {
    return {
      vehicle: [],
      value: "",
      currentImage: "",
      color: "",
      currentSelected: [],
      currentPrice: 0,
      variant: "",
      loading: true,
      selectColor: [],
      colorCheck: "",
      variantsList: [],
      selectedColor: "",
      showDetailDealer:false,
      selectedaddons:[]
    };
  },
  created() {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
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
  watch: {
    color() {
      this.setImage();
    },
  },
  methods: {
    chooseColor(id, color) {
      this.color = id;
      this.selectedColor = color;
    },
    setImage() {
      this.currentSelected = this.vehicle.superset.filter((x) => {
        return x.id == this.color;
      });
      this.colorCheck = this.currentSelected[0].color;
      this.currentImage = this.currentSelected[0].image;
    },
    proceed() {
      this.$router.push(
        "/cart/" + this.$route.params.id + "/" + this.currentSelected[0].id
      );
    },
    setVariant() {
      this.colorCheck = "";
      this.selectColor = this.vehicle.superset.filter((x) => {
        return x.variant == this.variant;
      });
    },
  },
  computed: {
    totalPrice(){
      
        if(this.selectedaddons.length ==0){
          return this.currentSelected[0].price
        }else{
          var x = 0
          for(var i in this.selectedaddons){
            x+=Number(this.selectedaddons[i].price)
          }
          return Number(this.currentSelected[0].price) + Number(x)
        }
     
    }
    // variantList() {
    //   if (!this.variant) {
    //     return this.vehicle
    //   } else {
    //     return this.vehicle.filter(x=>{
    //         return x.id == this.variant
    //     })
    //   }
    // },
  },
};
</script>

<style scoped>
/*
.discription:before {
  content : "";
  position: absolute;
  margin-top: 205;
  margin-bottom: 100px;
  width  : 1px;
  height   : 80%;
  border-left:1px solid rgb(128, 128, 128,0.2);
}
*/
.discription::-webkit-scrollbar {
  display: none;
}
.labels {
  color: gray;
    font-size: 15px;
    font-weight: normal;
    font-family: "Gilroy"
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.display {
  min-height: 300px;
  transition: 2s;
  font-family: "Gilroy";
    font-size: 17px;
    font-weight: normal;
    font-family: "Gilroy"
}
.link{
  color: #4E44D8;
  cursor:pointer
}
.title{
    font-size: 17px;
    font-weight: normal;
    font-family: "Gilroy"
}
.heading-title{
    color: #2A2A2A;
    font-size: 24px;
    font-weight: bold;
    font-family: "Gilroyf"
}
.heading-title-sm{
    color: #2A2A2A;
    font-size: 15px;
    font-weight: bold;
    font-family: "Gilroyf"
}
.heading-title-md{
    color: #2A2A2A;
    font-size: 17px;
    font-weight: bold;
    font-family: "Gilroyf"
}
.nav-link .a{
    color: red !important;
}

.transit {
  transition: 2s;
}
.dot {
  height: 25px;
  width: 25px;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
  cursor: pointer;
  border: 1px solid black;
}
.dot:hover {
  transform: scale(1.2);
  transition: 0.5s;
}
.onHover:hover {
  transform: scale(1.5);
  transition: 1s;
}
</style>
