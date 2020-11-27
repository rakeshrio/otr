<template>
  <div
    class="col-md-9 display my-5"
    style="margin: 0 auto;"
  >
    <div class="row col-md-12 m-0 p-0" v-if="currentSelected.length > 0">
      <div
        class="col-md-6 p-3 col-sm-order-2 txet-left"
        style="overflow:hidden"
      >
        <img class="onHover" width="100%" :src="currentImage" alt="" />
      </div>

      <div class="col-md-6 text-left pt-5 col-sm-order-1 discription">
        <div class="col-md-12">
          <h2>{{ vehicle.make }} {{ vehicle.model }}</h2>
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
                <h1>
                <strong> ₹ {{ currentSelected[0].price }}</strong>
              </h1>
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
                <p class="labels m-0 p-0 mt-1">₹ {{ data.price }}</p>
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
              </h1> -->
            <hr>
            <p>Fulfilled By</p>
              <p class="labels m-0 p-0 mt-1">Dealer Name: {{ currentSelected[0].dealer.name}}</p>
              <p class="labels m-0 p-0 mt-2">Phone No:  {{ currentSelected[0].dealer.phone }}</p>
              <p class="labels m-0 p-0 mt-2">Address:  {{ currentSelected[0].dealer.address }}, {{ currentSelected[0].dealer.city }} - {{ currentSelected[0].dealer.pincode }}</p>
              <p class="labels m-0 p-0 mt-2 mb-3">About Dealer:  {{ currentSelected[0].dealer.comment }}</p>
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
        <b-tabs content-class="mt-3 col-md-12" class="col-md-12" justified>
          <b-tab title="General Specification" active>
            <div class="row">
              <div class="col-md-4 my-5">
                <div class="col-md-12 d-flex m-0 p-0 justify-content-between">
                  <p><strong>Model/Make</strong></p>
                  <p>{{ vehicle.make }} {{ vehicle.model }}</p>
                </div>
                <div class="col-md-12 d-flex m-0 p-0 justify-content-between">
                  <p><strong>MILEAGE</strong></p>
                  <p>{{ vehicle.mileage}}kmpl</p>
                </div>
                <div class="col-md-12 d-flex m-0 p-0 justify-content-between">
                  <p><strong>Displacement</strong></p>
                  <p>{{ vehicle.displacement}}cc</p>
                </div>
                <div class="col-md-12 d-flex m-0 p-0 justify-content-between">
                  <p><strong>Tank Capacity</strong></p>
                  <p>{{ vehicle.tank_capacity }}L</p>
                </div>
                <div class="col-md-12 d-flex m-0 p-0 justify-content-between">
                  <p><strong>Start Type</strong></p>
                  <p>{{ vehicle.start_type }}</p>
                </div>
              </div>
              <div class="col-md-4 pb-5 m-0 p-0">
                <img style="opacity:0.2" :src="vehicle.brand_logo" width="100%" alt="">
              </div>
            </div>
          </b-tab>
          <b-tab title="About Vehicle"><p>
            <div class="col-md-12 my-5 text-left">
              <p>{{vehicle.about_vehicle}}</p>
            </div>
          </b-tab>

        </b-tabs>
      </div>


    </div>
    <div v-if="loading">
      <p>Please wait...</p>
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
    };
  },
  created() {
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
.labels {
  font-size: 13px;
  color: gray;
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
