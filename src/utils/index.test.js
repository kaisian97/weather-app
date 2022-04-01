import { convertKelvinToCelcius } from "utils";

describe("Utils works correctly", () => {
  it("able to convert Kelvin to Celcius correctly", async () => {
    const result = convertKelvinToCelcius(300);
    expect(result).toContain("26.85");
  });
});
