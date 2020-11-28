<template>
  <div id="app" class="col-md-12 col-12 m-0 p-0">
    <navigation></navigation>
    <router-view />
    <footer1></footer1>
    <div class="loading-overlay" v-if="makingAJAX">
      <div class="loading">
        <div class="lds-ellipsis">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import axios from "axios";
import navigation from "./components/navigation";
import footer1 from "./components/footer1";
export default {
  name: "app",
  data() {
    return {
      demo: true,
      refCount: 0,
      isLoading: false,
    };
  },
  components: {
    navigation,
    footer1,
  },

  created() {
    this.interceptor();
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  },
  computed: {
    makingAJAX() {
      return this.$store.state.makingAJAX;
    },
  },
  methods: {
    setLoading(isLoading) {
      if (isLoading) {
        this.refCount++;
        this.isLoading = true;
        this.$store.state.makingAJAX = true;
      } else if (this.refCount > 0) {
        this.refCount--;
        this.isLoading = this.refCount > 0;
        this.$store.state.makingAJAX = this.refCount > 0;
      }
    },
    interceptor() {
      axios.interceptors.request.use(
        (config) => {
          this.setLoading(true);
          return config;
        },
        (error) => {
          this.setLoading(false);
          return Promise.reject(error);
        }
      );

      axios.interceptors.response.use(
        (response) => {
          this.setLoading(false);
          return response;
        },
        (error) => {
          this.setLoading(false);
          return Promise.reject(error);
        }
      );
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  overflow: hidden;
}
.loading-overlay {
  background: rgba(236, 224, 224, 0.5);
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9998;
  align-items: center;
  justify-content: center;
}

.loading-overlay.is-active {
  display: flex;
}
.loading {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
}
/* https://loading.io/css/ */
.lds-ellipsis {
  display: inline-block;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  width: 64px;
  height: 64px;
}
.lds-ellipsis div {
  position: absolute;
  top: 27px;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background: rgb(78, 68, 216);
  animation-timing-function: cubic-bezier(0, 1, 1, 0);
}
.lds-ellipsis div:nth-child(1) {
  left: 6px;
  animation: lds-ellipsis1 0.6s infinite;
}
.lds-ellipsis div:nth-child(2) {
  left: 6px;
  animation: lds-ellipsis2 0.6s infinite;
}
.lds-ellipsis div:nth-child(3) {
  left: 22px;
  animation: lds-ellipsis2 0.6s infinite;
}
.lds-ellipsis div:nth-child(4) {
  left: 45px;
  animation: lds-ellipsis3 0.6s infinite;
}
@keyframes lds-ellipsis1 {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes lds-ellipsis3 {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}
@keyframes lds-ellipsis2 {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(19px, 0);
  }
}
</style>
