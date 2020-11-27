<template>
  <div class="col-md-12 col-12 m-0 p-0 mb-5">
      <div class="col-md-9 row" style="margin:0 auto">
        <div class="col-md-4 m-0 p-0 text-left col-4 mt-4">
          <p class="font1 "  @click="$router.go(-1)"  style="cursor:pointer">Back</p>
        </div>
        <div class="col-md-4 m-0 p-0 col-4 text-center" >
          <div class="col-md-8 px-1 pt-4 pb-4  bord" style="background:#4E44D8; margin:0 auto;">
            <img src="https://on-track.in/wp-content/uploads/2020/10/logo-white.svg" alt="" width="70%">
          </div>
        </div>
        <div class="col-md-4 m-0 p-0 text-right col-4 mt-4">
            <h4 class="font1" style="cursor:pointer" @click="goto"  >Ontrack Main</h4>     
        </div>
      </div>
  </div>
</template>

<script>

export default {
 methods:{
   goto(){
     this.$router.push('/')
   }
 }
}
</script>

<style scoped>

/* @font-face {
  font-family: 'gilroy'; 
  src: url('../assets/font/Gilroy-Light.off'); 
} */
.font1{
    color: #333333;
    font-family: 'Gilroy';
    font-size: 20px;
    font-weight: normal;
}
.bord{
    margin: 0% 0% 0% 0%;
    padding: 30px 10px 30px 10px;
    background-color: #4E44D8;
    border-radius: 0px 0px 36px 36px;
}
router-link{
    text-decoration: none !important;

}
@font-face {
  font-family: Gilroy;
  src: url(../assets/font/Gilroy-Light.otf);
 
}
@font-face {
  font-family: Gilroyf;
  src: url(../assets/font/Gilroy-ExtraBold.otf);
 
}
@media only screen and (max-width: 600px) {
  .bord{
    padding: 10px 12px 12px 12px;
    border-radius: 0px 0px 20px 20px;
  }
  .font1{
    color: #333333;
    font-family: 'Gilroy';
    font-size: 14px !important;
    font-weight: normal;
}
}
</style>