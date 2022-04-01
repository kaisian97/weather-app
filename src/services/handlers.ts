import { DUMMY_DATA_SG } from "./../constant/index";
import { rest } from "msw";

export const getWeatherSgApi = rest.get(
  "https://openweathermap.org/data/2.5/find",
  async (req, res, ctx) =>
    res(
      ctx.json({
        message: "accurate",
        cod: "200",
        count: 1,
        list: [DUMMY_DATA_SG],
      })
    )
);

export const getWeatherApiNotFound = rest.get(
  "https://openweathermap.org/data/2.5/find",
  async (req, res, ctx) =>
    res(
      ctx.json({
        message: "accurate",
        cod: "200",
        count: 0,
        list: [],
      })
    )
);

export const getWeatherApiException = rest.get(
  "https://openweathermap.org/data/2.5/find",
  (req, res, ctx) => {
    return res.networkError("Custom network error message");
  }
);
