<template>
  <div>
    <div class="create-job">
      <p>create a job</p>
      <form @submit.prevent>
        <input v-model="newJob.postingId" placeholder="job posting id"/>
        <input v-model="newJob.title" placeholder="job title"/>
        <button @click="createJob()" :disabled="newJob.postingId === ''
          || this.newJob.title === ''" class="button">job</button>
      </form>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      newJob: {
        postingId: '',
        title: ''
      }
    }
  },
  methods: {
    createJob() {
      console.log({
        postingId: this.newJob.postingId,
        title: this.newJob.title
      })
      console.log("Creating New Job",this.newJob)
      this.$store.dispatch("createJob",{
        postingId: this.newJob.postingId,
        title: this.newJob.title
      }
        )
    }
  }
};
</script>