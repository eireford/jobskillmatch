<template>
  <div class="job">
    {{job.postingId}}{{job.title}}
  </div>
</template>

<script>
export default {
  props: ["job"]
};
</script>

<style>
  .job {
    justify: center;
    display: flex;
    width: 300rem;
  }
</style>