<template>
  <div class="jobsDashboard">
    <div><jobs-list/></div>
    <div><job-form/></div>
  </div>
</template>

<script>
import store from '@/store'
import JobsList from "@/components/JobsList";
import JobForm from "@/components/JobForm";

export default {
  name: 'JobsDashboard',
  components: {
    JobsList,
    JobForm
  },
  computed: {
    jobs() {
      return store.state.jobs;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
