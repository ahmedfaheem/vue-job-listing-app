<script setup>
   import {onMounted, ref} from 'vue';

   

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

  const task = ref('');

  const addTask = () => {
    if(task.value !== '')
    tasks.value.push(task.value);
    task.value = '';
  }

  onMounted(async ()=>{
   try{
    let data = await fetch("https://jsonplaceholder.typicode.com/todos");
    data =  await data.json();
    data = data.map((task)=> task.title);
    tasks.value =data;
   }catch(e){
    console.log(e);
   }

  }
);

  const deleteTask = (id)=>{
    tasks.value.splice(id, 1);
  }
    
  


</script>

<template>

  <h1> {{ name  }}</h1>
  <p v-if="status === 'pending' ">User is Pending</p>
  <p v-else-if="status === 'completed'"> User is Active</p>

  <h2> {{ status }}</h2>
  <ul>
    <li v-for="(task, index) in tasks" :key="index">{{ task }}
      <button @click="deleteTask(index)">X</button>
    </li>
  </ul>
 
  <!--
  <button v-on:click="toggleStatus">Change Staus</button>
  <br>
   <a v-bind:href="link">Google</a>
-->
     <button @click="toggleStatus">Change Staus</button>
  <br>
   <a :href="link">Google</a>

   <form @submit.prevent="addTask">
    <input type="text" name="task" v-model="task">
    <button type="submit">Add Task</button>
   </form>

</template>

<style scoped></style>
