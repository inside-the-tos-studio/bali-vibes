import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import ExpCard from "../ExpCard.vue";
import { RouterLink } from "vue-router";

// Mock vue-router
vi.mock("vue-router", () => ({
  RouterLink: {
    name: "RouterLink",
    props: ["to"],
    template: '<a :href="to"><slot /></a>',
  },
}));

describe("ExpCard", () => {
  const mockExperience = {
    id: 1,
    name: "Temple Visit",
    img: "/images/temple.jpg",
    availability: true,
    price: 75,
    type: "Culture",
  };

  it("displays experience information correctly", () => {
    const wrapper = mount(ExpCard, {
      props: {
        experience: mockExperience,
      },
    });

    // Verify that information is rendered correctly
    expect(wrapper.find(".exp-card__name").text()).toBe("Temple Visit");
    expect(wrapper.find(".exp-card__type").text()).toBe("Culture");
    expect(wrapper.find(".exp-card__price").text()).toBe("75€");

    // Verify that the image is rendered correctly
    const img = wrapper.find(".exp-card__image img");
    expect(img.attributes("src")).toBe("/images/temple.jpg");

    // Verify that availability status is correct
    expect(wrapper.find(".exp-card__dispo--available").exists()).toBe(true);
    expect(wrapper.find(".exp-card__dispo p").text()).toBe("Available");
  });

  it("displays unavailable status correctly", () => {
    const unavailableExperience = {
      ...mockExperience,
      availability: false,
    };

    const wrapper = mount(ExpCard, {
      props: {
        experience: unavailableExperience,
      },
    });

    expect(wrapper.find(".exp-card__dispo--unavailable").exists()).toBe(true);
    expect(wrapper.find(".exp-card__dispo p").text()).toBe("Unavailable");
  });

  it("redirects to the experience detail page", () => {
    const wrapper = mount(ExpCard, {
      props: {
        experience: mockExperience,
      },
    });

    const link = wrapper.findComponent(RouterLink);
    expect(link.props("to")).toBe("/experience/1");
  });

  it("displays the formatted current date", () => {
    // Mock the current date
    const mockDate = new Date("2023-05-15");
    vi.spyOn(global, "Date").mockImplementation(() => mockDate);

    const wrapper = mount(ExpCard, {
      props: {
        experience: mockExperience,
      },
    });

    // French format: DD/MM/YYYY
    expect(wrapper.find(".exp-card__date").text()).toBe("15/05/2023");

    // Restore Date
    vi.restoreAllMocks();
  });
});
