<template>
  <div class="jobsList">
    <h1>Jobs List</h1>
    <p>
      lorum ipsum
    </p>
    <h3>Something relevant</h3>
    <ul>
      <li v-for="job in jobs" :key="job.id">{{job.postingId }} {{ job.title }}</li>
    </ul>

  </div>
</template>

<script>
export default {
  name: 'JobsList',
  props: {}
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
