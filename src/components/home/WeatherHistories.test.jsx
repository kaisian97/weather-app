import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import { useWeatherStore } from "stores";
import dayjs from "dayjs";
import { act } from "react-dom/test-utils";
import WeatherHistories from "./WeatherHistories";
import { DUMMY_DATA_MY, DUMMY_DATA_SG } from "constant";
import { setupServer } from "msw/node";
import { getWeatherSgApi } from "services/handlers";

describe("WeatherHistories works correctly", () => {
  const handlers = [getWeatherSgApi];

  const server = setupServer(...handlers);

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("able to display all search histories weather", async () => {
    render(<WeatherHistories />);

    const { result } = renderHook(useWeatherStore);

    act(() => {
      result.current.setWeather(DUMMY_DATA_SG);
    });
    act(() => {
      result.current.setWeather(DUMMY_DATA_MY);
    });

    expect(result.current.histories.length).toEqual(2);

    screen.getByText("1. George Town, MY");
    screen.getByText("2. Singapore, SG");

    expect(
      dayjs(new Date(result.current.histories[0].dt * 1000)).format(
        "HH:mm:ss A"
      )
    ).toEqual("21:09:10 PM");

    expect(
      dayjs(new Date(result.current.histories[1].dt * 1000)).format(
        "HH:mm:ss A"
      )
    ).toEqual("09:09:11 AM");
  });

  it("after search the selected weather history, it moves to top", async () => {
    server.use(getWeatherSgApi);

    render(<WeatherHistories />);

    const { result } = renderHook(useWeatherStore);

    act(() => {
      result.current.setWeather(DUMMY_DATA_SG);
    });
    act(() => {
      result.current.setWeather(DUMMY_DATA_MY);
    });

    screen.getByText("1. George Town, MY");

    const searchBtnSG = screen.getAllByRole("button", { name: "search" })[1];

    fireEvent.click(searchBtnSG);

    await waitFor(() => {
      screen.getByText("1. Singapore, SG");
    });
  });

  it("display empty content if no history found", async () => {
    render(<WeatherHistories />);

    screen.getByText("No Record");
  });
});
