<template>
  <div class="col-md-12 col-12 my-3 p-0">
    <div class="col-md-9 col-12 text-left" style="margin: 0 auto">
      <div class="col-md-12 col-12 m-0 p-0  row my-4">
        <div
          class="col-md-3 col-6 m-0 p-0 pr-4 pb-4"
          v-for="(data, index) in allModels"
          :key="index"
        >
          <div
            class="card"
            style="
              border-radius: 8px;
              box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.21);
            "
          >
            <div class="card-body">
              <img :src="data.hero_image" alt="" width="100%" />
              <h2 class="title mt-4">{{ data.make }} {{ data.model }}</h2>
              <h2
                class="title mt-4"
                style="color: #4e44d8; font-weight: bold"
                v-if="data.superset.length > 0"
              >
                ₹ {{ getPrice(data.superset) }}
              </h2>
              <h2 class="price pb-1"></h2>
              <button class="butn px-3 py-2" @click="goToCheckout(data._id)">
                Buy Now
              </button>
            </div>
          </div>
        </div>
        <div class="col-md-12 my-5 py-5 col-12 m-0" v-if="allModels.length == 0 && !loading">
          <div class="card">
            <div class="card-body text-center">
              <p><strong>We couldn't find any data :(</strong></p>
              <button
                @click="$router.push('/models')"
                class="mt-4 btn btn-primary"
              >
                See All Models
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="row" v-if="loading && allModels.length==0">
        <div class="col-md-3" v-for="(data,index) in loader" :key="index">
          <b-card >
            <div class="mb-2">
                <b-skeleton-img class="mb-5"></b-skeleton-img> 
            </div>
            <b-skeleton width="54%"></b-skeleton>
            <b-skeleton width="47%"></b-skeleton>
            <b-skeleton width="90%"></b-skeleton>
          </b-card>
        </div>
      
      </div>
      </div>
    
      
  </div>
</template>

<script>
import * as _ from "lodash";
export default {
  data() {
    return {
      loader: [{}, {}, {}, {}, {}, {}, {}, {}],
    };
  },
  created() {
    this.apply();
   
  },
  watch: {},
  methods: {
    apply() {
      this.$store.dispatch("getModelWithSearch", {
        id: this.$route.params.id,
      });
   
    },
    getprice(data) {
      return data[0].price;
    },
    goToCheckout(id) {
      this.$router.push("/display/" + id);
    },
    getPrice(data) {
      var max = _.maxBy(data, "price");
      var min = _.minBy(data, "price");
      if (min == max) {
        return max.price;
      } else {
        return min.price + "-" + max.price;
      }
    },
  },
  computed: {
    allModels() {
      return this.$store.state.getModelsWithSearch;
    },
    loading() {
      return this.$store.state.makingAJAX;
    },
  },
};
</script>

<style scoped>
.card-body {
    flex: 1 1 auto;
    min-height: 1px;
    padding: 1rem !important;
}
.heading-title {
  color: #2a2a2a;
  font-size: 24px;
  font-weight: bold;
  font-family: "Gilroyf";
}
.title {
  font-size: 17px;
  font-weight: normal;
  font-family: "Gilroy";
}
.card {
  border: none;
}
.btn :active {
  background-color: #3e8e41;
  box-shadow: 0 5px #666;
  transform: translateY(4px);
}
.price {
  font-size: 17px;
  font-weight: bold;
  color: #4e44d8;
  font-family: "Gilroyf";
}
.butn {
  border: none;
  background-color: #ebe9eb;
  font-weight: 500;
  font-family: "Gilroy";
  font-size: 100%;
  margin: 0;
  line-height: 1;
  cursor: pointer;

  overflow: visible;
  padding: 0.618em 1em;

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
  .col-12 {
    padding-right: 0 !important;
  }
  .title{
      font-size:12px
  }
}
</style>