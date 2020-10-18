<template>
  <div class="jobsList">
    <h3>Jobs List</h3>
    <Job v-for="job in jobs" :key="job.id" :job="job"/>
  </div>
</template>

<script>
import Job from "@/components/Job";

export default {
  components: {
    Job
  },
  computed: {
    jobs() {
      return this.$store.state.jobs;
    }
  }
};
</script>