<template>
  <header>
    <section>
      <div class="col1">
        <router-link to="/">
          <h3>Job Skill Match</h3>
        </router-link>
        <ul class="inline">
          <li>
            <router-link to="/">Jobs List</router-link>
          </li>
          <li>
            <router-link to="/settings">Settings</router-link>
          </li>
          <li><a @click="logout()">logout</a></li>
        </ul>
      </div>
    </section>
  </header>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$store.dispatch('logout')
    }
  }
}
</script>