<template>
  <ul class="jobsTable">
    <h3>Jobs Table</h3>
    <Job v-for="job in jobs" :key="job.id" :job="job"/>
  </ul>
</template>

<script>
import Job from "@/components/Job";

export default {
  components: {
    Job
  },
  computed: {
    jobs() {
      return this.$store.state.jobs
    }
  }
};
</script>

<style>
  .jobsTable { background: lightgray; overflow: auto; }
  .jobsTable tr { float: left; list-style-type: none; padding: 10px; }
</style>
