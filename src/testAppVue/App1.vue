<script>

export default {
  data() {
    return {
      name: 'Jhon Doe',
      status: 'pending',
      tasks: ["task 1", "task 2", "task 3"],
      link: "https://www.google.com"
    }
  },
  methods: {
    toggleStatus() {
      if (this.status === 'pending') {
        this.status = 'completed'
      } else {
        this.status = 'pending'
      }

    }
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
