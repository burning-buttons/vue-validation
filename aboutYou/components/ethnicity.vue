<template>
  <div>
    <h3>What is your ethnicity?</h3>
    <validation-provider name="ethnicity" rules="required" v-slot="{ errors }">
      <v-select
        :options="list"
        v-model="ethnicityValue"
        :class="{ error: errors[0] }"
      />
      <div class="error-message mt" v-if="errors[0]">{{ errors[0] }}</div>
    </validation-provider>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { STORE_SET_CHARACTERISTICS } from "@/constants";
import vSelect from "@/components/ui/select";

export default {
  components: { vSelect },

  data: () => ({
    list: [
      { value: "caucasian", text: "Caucasian - White" },
      { value: "african_american", text: "African American - Black" },
      { value: "north_east_asian", text: "North East Asian (Korea, Japan)" },
      {
        value: "south_east_asian",
        text: "South East Asian (China, Thailand, Taiwan, Malaysia, Indonesia)",
      },
      {
        value: "indian_sub_continent",
        text: "Indian Sub continent (India, Pakistan)",
      },
      { value: "american_indian", text: "American Indian or Alaska Native" },
      {
        value: "native_hawaiian",
        text: "Native Hawaiian or Other Pacific Islander",
      },
      { value: "other", text: "Other" },
      { value: "mixed", text: "Mixed" },
    ],
  }),

  computed: {
    ...mapState({
      ethnicity: ({ characteristics }) => characteristics.ethnicity,
    }),
    ethnicityValue: {
      get() {
        return this.ethnicity;
      },
      set(ethnicity) {
        this[STORE_SET_CHARACTERISTICS]({ ethnicity });
      },
    },
  },

  methods: {
    ...mapActions([STORE_SET_CHARACTERISTICS]),
  },
};
</script>
