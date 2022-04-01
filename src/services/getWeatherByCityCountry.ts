export type GetWeatherPayload = {
  city: string;
  country: string;
};

export const getWeatherByCityCountry = async ({
  city,
  country,
}: GetWeatherPayload) => {
  try {
    const res = await fetch(
      `https://openweathermap.org/data/2.5/find?q=${city},${country}&units=metric&type=like&sort=population&appid=439d4b804bc8187953eb36d2a8c26a02&_=1648646420193`
    );

    return res.json();
  } catch (error) {
    return false;
  }
};
