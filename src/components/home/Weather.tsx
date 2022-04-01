import { useWeatherStore } from "stores";
import dayjs from "dayjs";
import { convertKelvinToCelcius } from "utils";

type Props = {};

const Weather = (props: Props) => {
  const weatherObj = useWeatherStore((state) => state.weather);

  const { name, sys, main, dt, weather } = weatherObj || {};

  const rootMargin = "mx-4 my-4 md:mx-16 md:my-8";

  if (!weatherObj) return <></>;

  if (!name) {
    return (
      <div
        className={`${rootMargin} border border-red-400 p-4 rounded-lg text-red-400`}
      >
        Location not found.
      </div>
    );
  }

  const { description, icon, main: weatherMain } = weather?.[0] || {};

  const data = [
    {
      label: "Description",
      value: description,
    },
    {
      label: "Temperature",
      value: `${convertKelvinToCelcius(
        main?.temp_min || 0
      )} ~ ${convertKelvinToCelcius(main?.temp_max || 0)}`,
    },
    {
      label: "Humidity",
      value: `${main?.humidity}%`,
    },
    {
      label: "Time",
      value: dt ? dayjs(new Date(dt * 1000)).format("YYYY-MM-DD HH:mm A") : "",
    },
  ];
  return (
    <div className={rootMargin}>
      <div>
        <div className="font-bold">
          {name}, {sys?.country}
        </div>
        <div className="flex space-x-4 items-center">
          <img
            src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
            alt={weatherMain}
          />
          <div className="font-bold text-5xl my-4">{weatherMain}</div>
        </div>

        <div>
          {data.map((d) => (
            <div key={d.label} className="flex items-start space-x-4">
              <div className="w-1/3 sm:w-1/5 text-slate-500">{d.label}:</div>
              <div className="flex-1 font-medium">{d.value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Weather;
