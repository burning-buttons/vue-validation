<template>
  <app-layout class="about-you-page">
    <validation-observer ref="form">
      <birth-day class="card__section about-you-page__birthday" />
      <sex class="card__section about-you-page__sex" />
      <height class="card__section about-you-page__height" />
      <ethnicity class="card__section about-you-page__ethnicity" />
      <living class="card__section about-you-page__living" />
      <div v-if="error" v-html="error" class="text-danger" />
      <div class="page__card-footer">
        <button
          class="button button_secondary page__card-footer-button about-you-page__submit"
          :disabled="loading"
          @click="validate(nextHandler)"
        >
          <span>Next</span>
          <span class="icon icon__arrow icon__arrow_right"></span>
        </button>
      </div>
    </validation-observer>
  </app-layout>
</template>

<script>
import { mapState, mapActions } from "vuex";
import ValidateMixin from "@/mixins/validate";
import RouteMixin from "@/mixins/routing";
import {
  STORE_SAVE_CHARACTERISTIC,
  ROUTE_ABOUT,
  ROUTE_HEALTH_PT_1,
} from "@/constants";

import AppLayout from "@/components/appLayout";
import BirthDay from "./components/birthDay";
import Sex from "./components/sex";
import Height from "@/components/characteristics/height";
import Ethnicity from "./components/ethnicity";
import Living from "./components/living";
import { formatErrorsToString } from "@/modules/utils";

export default {
  name: "AboutYou",

  components: { AppLayout, BirthDay, Sex, Height, Ethnicity, Living },

  mixins: [ValidateMixin, RouteMixin],

  data: () => ({
    currentRoute: ROUTE_ABOUT,
    nextRoute: ROUTE_HEALTH_PT_1,
    error: null,
  }),

  computed: {
    ...mapState({
      loading: "loading",
      dob_month: ({ characteristics }) => characteristics.dob_month,
      dob_year: ({ characteristics }) => characteristics.dob_year,
      sex: ({ characteristics }) => characteristics.sex,
      height: ({ characteristics }) => characteristics.height,
      ethnicity: ({ characteristics }) => characteristics.ethnicity,
      coutry: ({ characteristics }) => characteristics.coutry,
      zipcode: ({ characteristics }) => characteristics.zipcode,
    }),
  },

  methods: {
    ...mapActions([STORE_SAVE_CHARACTERISTIC]),

    nextHandler() {
      this.saveChars()
        .then(this.setPassed)
        .catch(this.errorHandler);
    },

    saveChars() {
      this.error = null;

      return this[STORE_SAVE_CHARACTERISTIC]({
        dob_month: this.dob_month,
        dob_year: this.dob_year,
        sex: this.sex,
        height: this.height,
        ethnicity: this.ethnicity,
        coutry: this.coutry,
        zipcode: this.zipcode,
      });
    },

    errorHandler(error) {
      if (!error?.response?.data) return;
      this.error = formatErrorsToString(error.response.data);
    },
  },
};
</script>
