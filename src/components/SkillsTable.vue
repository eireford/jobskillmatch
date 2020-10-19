<template>
  <v-simple-table dense>
    <template v-slot:default>
      <thead>
      <tr>
        <th class="text-left">
          Name
        </th>
        <th class="text-left">
          weight
        </th>
      </tr>
      </thead>
      <tbody>
      <tr
          v-for="skill in skills"
          :key="skill.id"
      >
        <td>{{ skill.name }}</td>
        <td>{{ skill.weight }}</td>
      </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>

export default {
  computed: {
    skills: function () {
      return this.$store.state.skills
    }
  }
}
</script>