import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";
import ExpFilter from "../ExpFilter.vue";
import { useDataInjection } from "@/composables/useDataInjection";

// Mock of useDataInjection composable
vi.mock("@/composables/useDataInjection", () => ({
  useDataInjection: vi.fn(() => ({
    types: ["single", "double", "suite"],
    availabilityOptions: [
      { value: "all", label: "All" },
      { value: true, label: "Available" },
      { value: false, label: "Unavailable" },
    ],
  })),
}));

describe("ExpFilter", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the component correctly", () => {
    const wrapper = mount(ExpFilter, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
          }),
        ],
      },
    });

    expect(wrapper.find(".filter-card__title").text()).toBe("Filter your experience");
    expect(wrapper.findAll("select").length).toBe(2);
    expect(wrapper.findAll("input[type='date']").length).toBe(2);
    expect(wrapper.findAll("input[type='number']").length).toBe(2);
  });

  it("displays type options correctly", () => {
    const wrapper = mount(ExpFilter, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
          }),
        ],
      },
    });

    const typeOptions = wrapper.findAll("#type option");
    expect(typeOptions.length).toBe(4); // "All" + 3 mocked types
    expect(typeOptions[0].text()).toBe("All");
    expect(typeOptions[1].text()).toBe("Single");
    expect(typeOptions[2].text()).toBe("Double");
    expect(typeOptions[3].text()).toBe("Suite");
  });

  it("displays availability options correctly", () => {
    const wrapper = mount(ExpFilter, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
          }),
        ],
      },
    });

    const availabilityOptions = wrapper.findAll("#availability option");
    expect(availabilityOptions.length).toBe(3);
    expect(availabilityOptions[0].text()).toBe("All");
    expect(availabilityOptions[1].text()).toBe("Available");
    expect(availabilityOptions[2].text()).toBe("Unavailable");
  });

  it("emits load-experiences event when values change", async () => {
    const wrapper = mount(ExpFilter, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
          }),
        ],
      },
    });

    // Simulate value change
    await wrapper.find("#type").setValue("single");

    // Verify that the event was emitted
    expect(wrapper.emitted("load-experiences")).toBeTruthy();
    expect(wrapper.emitted("load-experiences")?.length).toBeGreaterThan(0);

    // Verify event content
    const emittedEvent = wrapper.emitted("load-experiences")?.[0];
    expect(emittedEvent?.[0]).toHaveProperty("type", "single");
  });

  it("removes empty price fields before emitting the event", async () => {
    const wrapper = mount(ExpFilter, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
          }),
        ],
      },
    });

    // Set type and leave prices empty
    await wrapper.find("#type").setValue("single");

    // Verify event content
    const emittedEvent = wrapper.emitted("load-experiences")?.[0];
    expect(emittedEvent?.[0]).toHaveProperty("type", "single");
    expect(emittedEvent?.[0]).not.toHaveProperty("priceFrom");
    expect(emittedEvent?.[0]).not.toHaveProperty("priceTo");
  });

  it("includes non-empty price fields when emitting the event", async () => {
    const wrapper = mount(ExpFilter, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
          }),
        ],
      },
    });

    // Set minimum price
    await wrapper.find("#priceFrom").setValue(100);

    // Reset emitted events as setValue also triggers the watcher
    wrapper.emitted()["load-experiences"] = [];

    // Set maximum price
    await wrapper.find("#priceTo").setValue(500);

    // Get the last emitted event
    const emitLength = wrapper.emitted("load-experiences")?.length || 0;
    const emittedEvent = wrapper.emitted("load-experiences")?.[emitLength - 1];

    expect(emittedEvent?.[0]).toHaveProperty("priceFrom", 100);
    expect(emittedEvent?.[0]).toHaveProperty("priceTo", 500);
  });
});
