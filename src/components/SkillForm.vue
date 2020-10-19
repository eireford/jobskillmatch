<template>
  <div>
    <div class="create-skill">
      <p>create a skill</p>
      <form @submit.prevent>
        <input v-model="newSkill.name" placeholder="skill name"/>
        <input v-model="newSkill.weight" placeholder="skill weight"/>
        <button @click="createSkill()" :disabled="newSkill.name === ''
          || this.newSkill.weight === ''" class="button">skill</button>
      </form>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      newSkill: {
        name: '',
        weight: ''
      }
    }
  },
  methods: {
    createSkill() {
      this.$store.dispatch("createSkill",{
        name: this.newSkill.name,
        weight: this.newSkill.weight
      }
        )
    }
  }
};
</script>