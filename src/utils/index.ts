import { ABSOLUTE_ZERO } from "constant";

export const convertKelvinToCelcius = (kelvin: number) => {
  return `${(kelvin - ABSOLUTE_ZERO).toFixed(2)}\u2103`;
};
