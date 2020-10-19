<template>
  <div class="jobsDashboard">
    <div v-if="errorFromServer">
      <v-alert
          :value="true"
          color="error"
          icon="warning"
          outline>
        Data loading failed. You can try one more time:
        <v-btn small
               outline
               color="info"
               @click="refetchData()">
          Try
        </v-btn>
      </v-alert>
    </div>
    <div v-else>
      <SkillsTable v-if="loaded" :skills="skills"/>
      <div class="text-xs-center" v-else>
        <v-progress-circular
            :size="100"
            color="primary"
            indeterminate
        ></v-progress-circular>
        <h2 color="primary">loading data...</h2>
      </div>
      <JobsTable/>
      <JobForm/>
      <SkillForm/>
    </div>
  </div>
</template>

<script>
import SkillsTable from "@/components/SkillsTable";
import JobsTable from "@/components/JobsTable";
import JobForm from "@/components/JobForm";
import SkillForm from "@/components/SkillForm";
import {mapState} from "vuex";

export default {

  name: 'JobsDashboard',
  components: {
    SkillsTable,
    JobsTable,
    JobForm,
    SkillForm
  },
  data: () => ({}),
  computed: {
    ...mapState(["loaded", "errorFromServer", "jobs", "skills"])
  }
}
</script>

