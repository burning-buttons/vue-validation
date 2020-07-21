import Component from "@/pages/aboutYou";
import { mountFactory, flush } from "../../../store";
import {
  ROUTE_HEALTH_PT_1,
  MSG_ERROR_FUTURE_DATE,
  STORE_SAVE_CHARACTERISTIC,
} from "@/constants";

const characteristics = {
  dob_month: 1,
  dob_year: 2020,
  sex: 0,
  height: 186.6,
  ethnicity: "caucasian",
  coutry: "Russia",
  zipcode: "123",
};
const state = { characteristics };

describe("About you page", () => {
  let wrapper;

  beforeEach(() => ({ wrapper } = mountFactory({ Component })));

  it("renders correct", async () => {
    wrapper.find(".about-you-page__submit").trigger("click");
    await flush();

    expect(wrapper).toMatchSnapshot();
  });

  it("date cann't be in the future", async () => {
    const state = {
      characteristics: { dob_month: 1, dob_year: 3020 },
    };
    const { wrapper } = mountFactory({ Component, state });
    wrapper.find(".about-you-page__submit").trigger("click");
    await flush();

    expect(
      wrapper.find(".about-you-page__birthday .error-message").text()
    ).toBe(MSG_ERROR_FUTURE_DATE);
  });

  it("correct fields shouldn't have errors", async () => {
    const { wrapper } = mountFactory({ Component, state });
    wrapper.find(".about-you-page__submit").trigger("click");
    await flush();
    await wrapper.vm.$nextTick();

    expect(wrapper.find(".error-message").exists()).toBeFalsy();
  });

  it("submitting with correct fields changes route", async () => {
    const { wrapper, actions } = mountFactory({ Component, state });
    wrapper.find(".about-you-page__submit").trigger("click");
    await flush();

    expect(actions[STORE_SAVE_CHARACTERISTIC]).toHaveBeenCalledWith(
      expect.any(Object),
      characteristics
    );
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith(
      { name: ROUTE_HEALTH_PT_1 },
      null,
      expect.any(Function)
    );
  });
});
