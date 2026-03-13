<script>
   import {ref} from 'vue';

export default {
   
    setup(){
     const name = ref('Jhon Doe');
     const status = ref('pending');
     const tasks = ref(["task 1", "task 2", "task 3"]);
     const link = ref("https://www.google.com");

     const  toggleStatus = function(){
      if (status.value === 'pending') {
        status.value = 'completed';
      } else {
        status.value = 'pending';
      }
    };


     return {
       name,
       status,
       tasks,
       link,
       toggleStatus
     };
  }

}


</script>

<template>

  <h1> {{ name  }}</h1>
  <h2> {{ status }}</h2>
  <ul>
    <li v-for="(task, index) in tasks" :key="index">{{ task }}</li>
  </ul>
 
  <!--
  <button v-on:click="toggleStatus">Change Staus</button>
  <br>
   <a v-bind:href="link">Google</a>
-->
     <button @click="toggleStatus">Change Staus</button>
  <br>
   <a :href="link">Google</a>


</template>

<style scoped></style>
