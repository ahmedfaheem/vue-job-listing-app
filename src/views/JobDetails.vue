<script setup>
import GoBack from '@/components/GoBack.vue';
import { reactive, onMounted } from 'vue';
import { useRoute, RouterLink } from 'vue-router';
import { PulseLoader } from 'vue-spinner'
import Router from "@/Router"
import { useToast } from "vue-toastification";

const state = reactive({
  Job: {
    company: {}
  },
    isLoading: true
});


const route = useRoute();
const jobId= route.params.id;




onMounted(async () => {
    try {
        const data = await fetch(`/api/jobs/${jobId}`);
        state.Job = await data.json();

    } catch (error) {
        console.error("Error in Fetching", error);
    } finally {
        state.isLoading = false;
    }

});

const toast = useToast();


const handelDelete = async (jobId)=>{
   

    if(window.confirm("Do You Want To Delete This Job?")){
      try{

     const res =    await fetch(`/api/jobs/${jobId}`, {
            method: "DELETE"
        })

        
        if (!res.ok){
           throw new Error("Failed to delete job")
        }else{
         Router.push("/jobs")
         toast.success("Job Deleted");
        }

      }catch(error){
        console.log("Error in Delete", error);
        toast.error("Job Not Deleted")
      }



    }



}


</script>

<template>
  <!-- Go Back -->
  <GoBack />

   <!-- Job Details -->
   
   <div  v-if="state.isLoading" class="text-center flex justify-center">
                <PulseLoader />
    </div>

  <section  v-else class="bg-green-50 min-h-screen">
    <div class="container m-auto py-10 px-6">
      <div class="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">

        <!-- Main Content -->
        <main>
          <!-- Header Card -->
          <div class="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-500 text-center md:text-left">
            <span class="inline-block bg-green-100 text-green-700 text-sm font-semibold px-3 py-1 rounded-full mb-4">
              {{state.Job.type}}
            </span>
            <h1 class="text-3xl font-bold text-gray-800 mb-3">{{state.Job.title}}</h1>
            <div class="flex items-center justify-center md:justify-start gap-1">
              <i class="pi pi-map-marker text-orange-500 mr-1"></i>
              <span class="text-orange-700 font-medium">{{state.Job.location}}</span>
            </div>
          </div>

          <!-- Description Card -->
          <div class="bg-white p-6 rounded-xl shadow-md mt-6">
            <h3 class="text-green-800 text-lg font-bold mb-4 flex items-center gap-2">
              <i class="fa-solid fa-briefcase text-green-500"></i>
              Job Description
            </h3>
            <p class="mb-6 text-gray-600 leading-relaxed">
              {{state.Job.description}}
            </p>

            <h3 class="text-green-800 text-lg font-bold mb-2 flex items-center gap-2">
              <i class="fa-solid fa-money-bill-wave text-green-500"></i>
              Salary
            </h3>
            <p class="text-gray-700 font-semibold">{{state.Job.salary}} / Year</p>
          </div>
        </main>

        <!-- Sidebar (right) -->
        <aside class="space-y-6">
          <!-- Company Info -->
          <div class="bg-white p-6 rounded-xl shadow-md">
            <h3 class="text-xl font-bold mb-4 text-gray-800 border-b pb-3">Company Info</h3>

            <h2 class="text-2xl font-semibold text-gray-800">{{ state.Job.company?.name }}</h2>

            <p class="my-3 text-gray-600 text-sm leading-relaxed">
                {{ state.Job.company?.description }}
            </p>

            <hr class="my-4" />

            <div class="mb-3">
              <h3 class="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1">Contact Email</h3>
              <p class="bg-green-50 border border-green-200 text-green-800 p-2 rounded-lg font-medium text-sm">
                {{state.Job.company?.contactEmail}}
              </p>
            </div>

            <div>
              <h3 class="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1">Contact Phone</h3>
              <p class="bg-green-50 border border-green-200 text-green-800 p-2 rounded-lg font-medium text-sm">
                {{state.Job.company?.contactPhone}}
              </p>
            </div>
          </div>

          <!-- Manage -->
          <div class="bg-white p-6 rounded-xl shadow-md">
            <h3 class="text-xl font-bold mb-4 text-gray-800 border-b pb-3">Manage Job</h3>
            <RouterLink
              :to="`/jobs/edit/${state.Job.id}`"
              class="bg-green-500 hover:bg-green-600 active:bg-green-700 text-white text-center font-bold py-2.5 px-4 rounded-full w-full focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 transition-colors duration-200 block"
            >
              <i class="fa-solid fa-pen-to-square mr-1"></i> Edit Job
            </RouterLink>
            <button @click="handelDelete(state.Job.id)"
              class="bg-red-500 hover:bg-red-600 active:bg-red-700 text-white font-bold py-2.5 px-4 rounded-full w-full focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 transition-colors duration-200 mt-3 block"
            >
              <i class="fa-solid fa-trash mr-1"></i> Delete Job
            </button>
          </div>
        </aside>

      </div>
    </div>
  </section>
</template>