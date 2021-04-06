<template>
  <div>
    <div class="area">
      <ul class="circles" style="background-color: #565555">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
  </div>
</template>
<style scoped>
  .circles {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;  
    margin-bottom: 0px;
    margin-top: 0px;
  }
  
  .circles li {
    position: absolute;
    display: block;
    list-style: none;
    width: 20px;
    height: 20px;
    background: #5c4dff;
    animation: animate 25s linear infinite;
    bottom: -150px;
  }
  
  .circles li:nth-child(1) {
    left: 25%;
    width: 80px;
    height: 80px;
    animation-delay: 0s;
    background: linear-gradient(226.71deg, #5c4dff,#5c4dff);
  }
  
  .circles li:nth-child(2) {
    left: 10%;
    width: 35px;
    height: 35px;
    animation-delay: 2s;
    animation-duration: 12s;
    background: linear-gradient(226.71deg, #5c4dff#5c4dff);
  }
  
  .circles li:nth-child(3) {
    left: 70%;
    width: 40px;
    height: 40px;
    animation-delay: 4s;
    background: linear-gradient(226.71deg, #5c4dff,#5c4dff);
  }
  
  .circles li:nth-child(4) {
    left: 40%;
    width: 60px;
    height: 60px;
    animation-delay: 0s;
    animation-duration: 18s;
    background: linear-gradient(226.71deg, #5c4dff 50%,#5c4dff);
  }
  
  .circles li:nth-child(5) {
    left: 65%;
    width: 30px;
    height: 30px;
    animation-delay: 0s;
    background: linear-gradient(226.71deg, #8263FF 50%,#5c4dff);
  }
  
  .circles li:nth-child(6) {
    left: 75%;
    width: 110px;
    height: 110px;
    animation-delay: 3s;
    background: linear-gradient(226.71deg, #5c4dff,#5c4dff);
  }
  
  .circles li:nth-child(7) {
    left: 35%;
    width: 150px;
    height: 150px;
    animation-delay: 7s;
    border-radius: 20px;
    background: linear-gradient(226.71deg, #9276FF 50%,#5c4dff);
  }
  
  .circles li:nth-child(8) {
    left: 50%;
    width: 25px;
    height: 25px;
    animation-delay: 15s;
    animation-duration: 45s;
    background: linear-gradient(226.71deg, #5c4dff,#5c4dff);
  }
  
  .circles li:nth-child(9) {
    left: 20%;
    width: 50px;
    height: 50px;
    animation-delay: 2s;
    animation-duration: 35s;
    background: linear-gradient(226.71deg, #5c4dff,#5c4dff);
  }
  
  .circles li:nth-child(10) {
    left: 85%;
    width: 150px;
    height: 150px;
    border-radius: 50px;
    animation-delay: 0s;
    animation-duration: 11s;
    background: linear-gradient(226.71deg, #5c4dff,#5c4dff);
  }
  
  .circles li:nth-child(11) {
    left: 65%;
    width: 200px;
    height: 200px;
    border-radius: 50px;
    background: linear-gradient(226.71deg, #5c4dff,#5c4dff);
  }
  
  .circles li:nth-child(12) {
    left: 75%;
    width: 100px;
    height: 100px;
    animation-delay: 15s;
    animation-duration: 45s;
    background: linear-gradient(226.71deg, #5c4dff,#5c4dff);
  }
  
  .circles li:nth-child(13) {
    left: 20%;
    width: 125px;
    height: 125px;
    animation-delay: 1s;
    animation-duration: 15s;
    background: linear-gradient(226.71deg, #5c4dff,#5c4dff);
  }
  
  .circles li:nth-child(14) {
    left: 5%;
    width: 50px;
    height: 50px;
    animation-delay: 0s;
    background: linear-gradient(226.71deg, #5c4dff,#5c4dff);
  }
  
  .circles li:nth-child(15) {
    left: 15%;
    width: 150px;
    height: 150px;
    animation-delay: 6s;
    animation-duration: 65s;
    background: linear-gradient(226.71deg, #5c4dff,#5c4dff);
  }
  
 @keyframes animate {
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 1;
    border-radius: 50%;
  }

  100% {
    transform: translateY(-1000px) rotate(720deg);
    opacity: 0;
    border-radius: 50%;
  }
}

</style>
