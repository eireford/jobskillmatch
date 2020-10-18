<template>
  <div>
    <div class="create-job">
      <p>create a job</p>
      <form @submit.prevent>
        <input v-model="newJobForm.postingId" placeholder="job posting id"/>
        <input v-model="newJobForm.title" placeholder="job title"/>
        <button @click="createJobAndClearForm()" :disabled="newJobForm.postingId === ''
          || newJobForm.title === ''" class="button">job</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newJobForm: {
        postingId: '',
        title: ''
      }
    }
  },
  methods: {
    createJobAndClearForm() {
      console.log('postingId',this.newJobForm.postingId)
      this.$store.dispatch('addJob', {
        postingId: this.newJobForm.postingId,
        title: this.newJobForm.title
      })
      console.log('postingId',this.newJobForm.postingId)
    }
  }

};
</script>