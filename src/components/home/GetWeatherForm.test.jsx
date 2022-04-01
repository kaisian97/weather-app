import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import GetWeatherForm from "./GetWeatherForm";
import { renderHook } from "@testing-library/react-hooks";
import { useWeatherStore } from "stores";
import { setupServer } from "msw/node";
import { getWeatherSgApi } from "services/handlers.ts";

describe("GetWeatherForm works correctly", () => {
  const handlers = [getWeatherSgApi];

  const server = setupServer(...handlers);

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("show error if the city and country input not being filled", async () => {
    render(<GetWeatherForm />);

    fireEvent.click(screen.getByText("Search"));
    await waitFor(() => {
      screen.getByText("City is required");
      screen.getByText("Country is required");
    });
  });

  it("able to call weather api successfully", async () => {
    server.use(getWeatherSgApi);

    render(<GetWeatherForm />);
    const { result } = renderHook(useWeatherStore);

    expect(result.current.weather).toBeNull();

    const cityInput = screen.getByRole("textbox", { name: "City" });
    fireEvent.input(cityInput, {
      target: {
        value: "Singapore",
      },
    });

    fireEvent.input(screen.getByRole("textbox", { name: "Country" }), {
      target: {
        value: "Sg",
      },
    });
    fireEvent.click(screen.getByText("Search"));

    await waitFor(() => {
      expect(result.current.weather.name).toEqual("Singapore");
    });
  });
});
