<script setup>

import Router from '@/Router'
import { onMounted, reactive, ref } from 'vue';
import { useToast } from "vue-toastification";
import { useRoute } from 'vue-router';
import { PulseLoader } from 'vue-spinner'

const state = reactive({

    type: '',
    name: '',
    description: '',
    salary: '',
    location: '',
    company: '',
    company_description: '',
    contact_email: '',
    contact_phone: ''
});

const route = useRoute();
const jobId= route.params.id;
const isLoading = ref(false);

onMounted( async () => {
    try {
        isLoading.value = true;
        const data = await fetch(`/api/jobs/${jobId}`);
        const job = await data.json();
        state.type = job.type;
        state.name = job.title;
        state.description = job.description;
        state.salary = job.salary;
        state.location = job.location;
        state.company = job.company.name;
        state.company_description = job.company.description;
        state.contact_email = job.company.contactEmail;
        state.contact_phone = job.company.contactPhone;
    } catch (error) {
        console.error("Error in Fetching Job Details", error);
        toast.error("Job Not Exists");
    }finally{
        isLoading.value = false;
    }
});



const toast = useToast();

const handleSubmit =async () => {

    const data = {
        type: state.type,
        title: state.name,
        description: state.description,
        salary: state.salary,
        location: state.location,
        company: {
            name: state.company,
            description: state.company_description,
            contactEmail: state.contact_email,
            contactPhone: state.contact_phone,
        },
    };

    try{
       const response = await fetch(`/api/jobs/${jobId}`, {
        method: "PATCH", //update only updated fields
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(data)
       });
      
       const job = await response.json();
     
      Router.push(`/job/${job.id}`);
      toast.success("Job Updated Successfully");
    }catch(error){
        console.log("Error in Updating Job", error);
    toast.error("Job Not Updated ");

    }

};

</script>

<template>

 <div  v-if="isLoading" class="text-center flex justify-center">
                <PulseLoader />
    </div>

    <section v-else class="bg-green-50">
        <div class="container m-auto max-w-2xl py-24">
            <div class="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
                <form @submit.prevent="handleSubmit">
                    <h2 class="text-3xl text-center font-semibold mb-6">Edit Job</h2>

                    <div class="mb-4">
                        <label for="type" class="block text-gray-700 font-bold mb-2">Job Type</label>
                        <select id="type" name="type" class="border rounded w-full py-2 px-3" required
                            v-model="state.type">
                            <option value="Full-Time">Full-Time</option>
                            <option value="Part-Time">Part-Time</option>
                            <option value="Remote">Remote</option>
                            <option value="Internship">Internship</option>
                        </select>
                    </div>

                    <div class="mb-4">
                        <label class="block text-gray-700 font-bold mb-2">Job Listing Name</label>
                        <input type="text" id="name" name="name" class="border rounded w-full py-2 px-3 mb-2"
                            placeholder="eg. Beautiful Apartment In Miami" required v-model="state.name" />
                    </div>
                    <div class="mb-4">
                        <label for="description" class="block text-gray-700 font-bold mb-2">Description</label>
                        <textarea id="description" name="description" class="border rounded w-full py-2 px-3" rows="4"
                            v-model="state.description">
                            placeholder="Add any job duties, expectations, requirements, etc"></textarea>
                    </div>

                    <div class="mb-4">
                        <label for="type" class="block text-gray-700 font-bold mb-2">Salary</label>
                        <select id="salary" name="salary" class="border rounded w-full py-2 px-3" required
                            v-model="state.salary">
                            <option value="Under $50K">under $50K</option>
                            <option value="$50K - $60K">$50 - $60K</option>
                            <option value="$60K - $70K">$60 - $70K</option>
                            <option value="$70K - $80K">$70 - $80K</option>
                            <option value="$80K - $90K">$80 - $90K</option>
                            <option value="$90K - $100K">$90 - $100K</option>
                            <option value="$100K - $125K">$100 - $125K</option>
                            <option value="$125K - $150K">$125 - $150K</option>
                            <option value="$150K - $175K">$150 - $175K</option>
                            <option value="$175K - $200K">$175 - $200K</option>
                            <option value="Over $200K">Over $200K</option>
                        </select>
                    </div>

                    <div class="mb-4">
                        <label class="block text-gray-700 font-bold mb-2">
                            Location
                        </label>
                        <input type="text" id="location" name="location" class="border rounded w-full py-2 px-3 mb-2"
                            placeholder="Company Location" required v-model="state.location" />
                    </div>

                    <h3 class="text-2xl mb-5">Company Info</h3>

                    <div class="mb-4">
                        <label for="company" class="block text-gray-700 font-bold mb-2">Company Name</label>
                        <input type="text" id="company" name="company" class="border rounded w-full py-2 px-3"
                            placeholder="Company Name" v-model="state.company" />
                    </div>

                    <div class="mb-4">
                        <label for="company_description" class="block text-gray-700 font-bold mb-2">Company
                            Description</label>
                        <textarea id="company_description" name="company_description"
                            class="border rounded w-full py-2 px-3" rows="4" placeholder="What does your company do?"
                            v-model="state.company_description"></textarea>
                    </div>

                    <div class="mb-4">
                        <label for="contact_email" class="block text-gray-700 font-bold mb-2">Contact Email</label>
                        <input type="email" id="contact_email" name="contact_email"
                            class="border rounded w-full py-2 px-3" placeholder="Email address for applicants" required
                            v-model="state.contact_email" />
                    </div>
                    <div class="mb-4">
                        <label for="contact_phone" class="block text-gray-700 font-bold mb-2">Contact Phone</label>
                        <input type="tel" id="contact_phone" name="contact_phone"
                            class="border rounded w-full py-2 px-3" placeholder="Optional phone for applicants"
                            v-model="state.contact_phone" />
                    </div>

                    <div>
                        <button
                            class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                            type="submit">
                            Edit Job
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </section>
</template>