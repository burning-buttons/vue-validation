<template>
  <div class="birth-day">
    <h3>In what month and year were you born (month/year)?</h3>
    <div class="birth-day__list">
      <validation-provider
        name="month"
        rules="required"
        class="birth-day__item"
        v-slot="{ errors }"
      >
        <v-select
          :options="monthList"
          v-model="monthValue"
          placeholder="Month"
          :class="{ error: errors[0] }"
        />
      </validation-provider>
      <validation-provider
        name="year"
        rules="required"
        class="birth-day__item"
        v-slot="{ errors }"
      >
        <v-select
          :options="yearList"
          v-model="yearValue"
          placeholder="Year"
          :class="{ error: errors[0] }"
        />
      </validation-provider>
    </div>
    <validation-provider name="date" rules="date" v-slot="{ errors }">
      <input type="text" class="birth-day__full-date" :value="fullDate" />
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

  computed: {
    ...mapState({
      month: ({ characteristics }) => characteristics.dob_month,
      year: ({ characteristics }) => characteristics.dob_year,
    }),

    fullDate() {
      const { year, month } = this;
      return { year, month, day: 1 };
    },

    monthValue: {
      get() {
        return this.month;
      },
      set(dob_month) {
        this[STORE_SET_CHARACTERISTICS]({ dob_month });
      },
    },

    yearValue: {
      get() {
        return this.year;
      },
      set(dob_year) {
        this[STORE_SET_CHARACTERISTICS]({ dob_year });
      },
    },

    monthList() {
      return [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ].map((text, index) => ({ text, value: index + 1 }));
    },

    yearList() {
      const start = 1920;
      const end = new Date().getFullYear() - 18;
      const list = [];
      for (let i = end; i > start; i -= 1) {
        list.push(i);
      }
      return list;
    },
  },

  methods: {
    ...mapActions([STORE_SET_CHARACTERISTICS]),
  },
};
</script>
<style lang="scss" scoped>
.birth-day {
  &__list {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }
  &__item {
    flex: 1;
    &:not(:last-child) {
      margin-right: 1rem;
    }
  }

  &__full-date {
    position: absolute;
    opacity: 0;
  }
}
</style>
