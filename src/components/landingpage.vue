<template>
    <div class="col-md-12" style="overflow:hidden">
        <div class="ti col-md-12 m-0 pt-2">
            <p>
            Enabling independent affordable transportation.
            </p>   
        </div>
        <div class="title col-md-12 m-0 t-2" style="text-align:start">
             <p>One bike at a time</p>
        </div>
        <div class="base row col-md-12">
         <div class="con col-md-2">
            <div class="text m-3" >
            <h4>Rent</h4>
            </div>
         <!-- <img src="../assets/vespa.jpg" >      -->
        </div>
        <div class="cont col-md-2">
            <div class="text m-3">
            <h4>Buy&Sell</h4>
            </div>
            <div class="txt m-3">
            <h4>Bikex</h4>
            </div>
         <!-- <img src="../assets/logo.png"  style="width:100%;">      -->
        </div>
         <div class="conta col-md-2">
            <div class="text m-3">
            <h4>NewBike</h4>
            </div>
         <!-- <img src="../assets/logo.png" alt="Norway" style="width:100%;">      -->
        </div>
         <div class="contai col-md-2">
            <div class="text m-3 ">
            <h4>Delivered</h4>
            </div>
         <!-- <img src="../assets/logo.png" alt="Norway" style="width:100%;">      -->
        </div>
        <div class="contain col-md-2">
            <div class="text m-3 ">
            <h4>Earn</h4>
            </div>
         <!-- <img src="../assets/logo.png" alt="Norway" style="width:100%;">      -->
        </div>
        </div>
        
        <br>
        <div id="noti" class="col-md-1 offset-md-10 ">
            <svg width="3em" height="4em" viewBox="0 0 16 16" class="bi bi-bell" fill="red" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2z"/>
        <path fill-rule="evenodd" d="M8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z"/>
        </svg>
        <span class="notif col-md-12">Subcribe for notifications</span>
        
        
        </div>
        <!-- </div> -->
       
         
    </div>
</template>
<script>
export default {
    
}
</script>
<style scoped>
.ti{
    color: #444444;
    font-family: "Gilroy", Gilroy, Sans-serif;
    font-size: 24px;
    font-weight: normal;
    text-align: start;
    padding-left: 40px;

}
.title{
    color: #2A2A2A;
    font-family: "Gilroy", Gilroy, Sans-serif;
    font-size: 36px;
    font-weight: bold;
     padding-left: 40px;
}
.con {
  position: relative;
  border: solid 2px grey;
  border-radius: 30px 30px 30px 30px;;
  width: 236px;
  height: 321px;
  background-image: url(https://app-5f576523c1ac180394b7bf13.closte.com/wp-content/uploads/2020/10/Rent-bikes-from-ontrack.png);
  background-size: cover;
  cursor: pointer;
}
.cont {
  position: relative;
  border: solid 2px grey;
  border-radius: 30px 30px 30px 30px;;
  width: 236px;
  height: 321px;
  background-image: url(https://app-5f576523c1ac180394b7bf13.closte.com/wp-content/uploads/2020/10/Rent-bikes-from-ontrack.png);
  background-size: cover;
  cursor: pointer;
}
.conta {
  position: relative;
  border: solid 2px grey;
  border-radius: 30px 30px 30px 30px;;
  width: 236px;
  height: 321px;
  background-image: url(https://app-5f576523c1ac180394b7bf13.closte.com/wp-content/uploads/2020/10/Rent-bikes-from-ontrack.png);
  background-size: cover;
  /* background-image: linear-gradient(180deg, #3023AE 0%, #B570E0 100%); */
  background-color: transparent;
  opacity: 0.8;
  cursor: pointer;
}
.contai {
  position: relative;
  border: solid 2px grey;
  border-radius: 30px 30px 30px 30px;;
  width: 236px;
  height: 321px;
  background-image: url(https://app-5f576523c1ac180394b7bf13.closte.com/wp-content/uploads/2020/10/Rent-bikes-from-ontrack.png);
  background-size:contain;
  cursor: pointer;
  }
.contain {
  position: relative;
  border: solid 2px grey;
  border-radius: 30px 30px 30px 30px;;
  width: 236px;
  height: 321px;
  background-image: url(https://app-5f576523c1ac180394b7bf13.closte.com/wp-content/uploads/2020/10/Rent-bikes-from-ontrack.png);
  background-size:cover;
  cursor: pointer;
  }

.text{
  position: absolute;
  align-self: center;
  /* bottom: 20px;
  right: 20px; */
  background-color:white;
  color:black;
  padding-left: 30px;
  padding-right: 40px;
  padding-top: 10px;    
  border-radius: 20px;
 
}
.txt{
    position: absolute;
    bottom:20px;
    right: 20px;
    padding-left: 40px;
    padding-right: 40px;
    background-color:white;
    color:black;
     border-radius: 20px;
     padding-top: 10px;
}
.base{
    /* display: block;    */
    justify-content: space-around;
    
}
#noti{
    border: solid 3px red;
    width: 100px;
    border-radius: 500%;
    
}
#noti .notif{
visibility: hidden;
  width: 100%;
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  position: absolute;
  z-index: 1;
  top: -5px;
  right: 105%;
}
#noti:hover .notif{
    visibility: visible;
}
</style>