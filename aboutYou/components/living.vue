<template>
  <div class="user-living">
    <h3>Where are you currently living?</h3>

    <validation-provider
      name="zip/post code"
      rules="required"
      v-slot="{ errors }"
    >
      <v-input
        type="text"
        v-model="zipcodeValue"
        placeholder="Zip Code / Postal Code"
        :class="{ error: errors[0] }"
      />
      <div class="error-message mt" v-if="errors[0]">{{ errors[0] }}</div>
    </validation-provider>

    <div v-if="!isUS" class="user-living__item">
      <h3 class="user-living__title">Select country</h3>
      <validation-provider name="country" rules="required" v-slot="{ errors }">
        <v-select
          v-model="coutryValue"
          :options="countries"
          :class="{ error: errors[0] }"
        />
        <div class="error-message mb" v-if="errors[0]">{{ errors[0] }}</div>
      </validation-provider>
    </div>

    <div class="user-living__link" v-else>
      <a href="#" @click.prevent="toggleCountry">Outside the US?</a>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import vSelect from "@/components/ui/select";
import vInput from "@/components/ui/input";

import { STORE_SET_CHARACTERISTICS, STORE_GET_COUNTRIES } from "@/constants";

export default {
  components: { vSelect, vInput },

  data: () => ({
    options: [
      { value: true, text: "US" },
      { value: false, text: "Outside the US" },
    ],
    selected: true,
    countries: [],
    isUS: true,
  }),

  computed: {
    ...mapState({
      coutry: ({ characteristics }) => characteristics.coutry,
      zipcode: ({ characteristics }) => characteristics.zipcode,
    }),

    coutryValue: {
      get() {
        return this.coutry;
      },
      set(coutry) {
        const { [STORE_SET_CHARACTERISTICS]: setParams } = this;
        setParams({ coutry });
      },
    },

    zipcodeValue: {
      get() {
        return this.zipcode;
      },
      set(zipcode) {
        const { [STORE_SET_CHARACTERISTICS]: setParams } = this;
        setParams({ zipcode });
      },
    },
  },

  mounted() {
    this.getList();
  },

  methods: {
    ...mapActions([STORE_SET_CHARACTERISTICS, STORE_GET_COUNTRIES]),

    getList() {
      this[STORE_GET_COUNTRIES]()
        .then(({ data }) => {
          this.countries = data;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    toggleCountry() {
      this.isUS = !this.isUS;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/basic/variables";

.user-living {
  &__link {
    display: flex;
    justify-content: flex-end;
    margin-top: 0.5rem;
    font-size: $size-xs;
  }

  &__item {
    margin-top: 1rem;
  }
}
</style>
