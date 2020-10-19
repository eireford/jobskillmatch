<template>
  <ul class="jobsTable">
    <h3>Jobs Table</h3>
    <ul>
      <li v-for="job in jobs" :key="job.id" :job="job">{{job.postingId}} {{job.title}}</li>
    </ul>

  </ul>
</template>

<script>

export default {
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
