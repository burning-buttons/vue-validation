<template>
  <div>
    <validation-provider name="sex" rules="required" v-slot="{ errors }">
      <h3>What is your sex?</h3>
      <radio-list v-model="sexValue" :options="sexList" />
      <div class="error-message mt" v-if="errors[0]">{{ errors[0] }}</div>
    </validation-provider>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { STORE_SET_CHARACTERISTICS } from "@/constants";
import RadioList from "@/components/ui/radioList";

export default {
  components: { RadioList },

  computed: {
    ...mapState({
      sex: ({ characteristics }) => characteristics.sex,
    }),
    sexValue: {
      get() {
        return this.sex;
      },
      set(sex) {
        this[STORE_SET_CHARACTERISTICS]({ sex });
      },
    },

    sexList() {
      return [
        {
          value: 1,
          text: "Male",
        },
        {
          value: 0,
          text: "Female",
        },
      ];
    },
  },
  methods: {
    ...mapActions([STORE_SET_CHARACTERISTICS]),
  },
};
</script>
