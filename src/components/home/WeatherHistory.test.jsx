import { fireEvent, render, screen } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import { useWeatherStore } from "stores";
import WeatherHistory from "./WeatherHistory";
import dayjs from "dayjs";
import { act } from "react-dom/test-utils";
import { DUMMY_DATA_SG } from "constant";

describe("WeatherHistory works correctly", () => {
  it("display history weather data correctly", async () => {
    render(<WeatherHistory history={DUMMY_DATA_SG} index={0} />);

    screen.getByText("1. Singapore, SG");
    expect(
      dayjs(new Date(DUMMY_DATA_SG.dt * 1000)).format("HH:mm:ss A")
    ).toEqual("09:09:11 AM");
  });

  it("able to delete selected history weather successfully", async () => {
    render(<WeatherHistory history={DUMMY_DATA_SG} index={0} />);

    const { result } = renderHook(useWeatherStore);

    act(() => {
      result.current.setWeather(DUMMY_DATA_SG);
    });

    expect(result.current.histories.length).toEqual(1);

    const deleteBtn = screen.getByRole("button", { name: "delete" });
    fireEvent.click(deleteBtn);

    expect(result.current.histories.length).toEqual(0);
  });
});
