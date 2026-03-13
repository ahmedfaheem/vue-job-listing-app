<script setup>
   import {onMounted, ref} from 'vue';
   import Navbar from './components/Navbar.vue';
   import Hero from './components/Hero.vue';
   import HomeCards from './components/HomeCards.vue';

</script>

<template>
 <Navbar />
 <!--  <Hero title="Test Vue" breif="Test Project From Jobs by Vue" /> -->
 <Hero />
 <HomeCards />
 

</template>

<style scoped></style>
