import { setupServer } from "msw/node";
import {
  getWeatherApiException,
  getWeatherApiNotFound,
  getWeatherSgApi,
} from "./handlers";
import { getWeatherByCityCountry } from "./getWeatherByCityCountry";

describe("get weather data by city and country", () => {
  const handlers = [
    getWeatherSgApi,
    getWeatherApiNotFound,
    getWeatherApiException,
  ];

  const server = setupServer(...handlers);

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("should able to get weather SG", async () => {
    server.use(getWeatherSgApi);

    const data = await getWeatherByCityCountry({
      country: "sg",
      city: "singapore",
    });
    expect(data.list[0].name).toEqual("Singapore");
  });

  it("should return empty data if not found", async () => {
    server.use(getWeatherApiNotFound);

    const data = await getWeatherByCityCountry({
      country: "test",
      city: "test",
    });
    expect(data.count).toEqual(0);
  });

  it("should catch the error if getWeather api fail", async () => {
    server.use(getWeatherApiException);

    const data = await getWeatherByCityCountry({
      country: "test",
      city: "test",
    });
    expect(data).toEqual(false);
  });
});
