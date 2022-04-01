import { render, screen } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import { DUMMY_DATA_MY } from "constant";
import { act } from "react-dom/test-utils";
import { useWeatherStore } from "stores";
import Weather from "./Weather";

describe("Weather works correctly", () => {
  it("show empty body if no searching", async () => {
    const view = render(<Weather />);
    expect(view.container.innerHTML).toHaveLength(0);
  });

  it("show weather details correctly", async () => {
    render(<Weather />);

    const { result } = renderHook(useWeatherStore);

    act(() => {
      result.current.setWeather(DUMMY_DATA_MY);
    });

    screen.getByText("George Town, MY");
    screen.getByText("Clouds");
    screen.getByText("26.64", { exact: false });
    screen.getByText("26.96", { exact: false });
    screen.getByText("scattered clouds");
    screen.getByText("89%");
    screen.getByText("2022-03-31 21:09 PM");
  });
});
