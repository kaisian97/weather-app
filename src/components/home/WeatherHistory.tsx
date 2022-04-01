import { Weather } from "types";
import { Button } from "components/common";
import dayjs from "dayjs";
import { useWeatherStore } from "stores";
import { SearchIcon, TrashIcon } from "@heroicons/react/solid";
import { getWeatherByCityCountry } from "services/getWeatherByCityCountry";
import shallow from "zustand/shallow";
import { useState } from "react";

type Props = {
  history: Weather;
  index: number;
};

const WeatherHistory = ({ history, index }: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const { deleteWeatherFromHistories, setWeather } = useWeatherStore(
    (state) => ({
      deleteWeatherFromHistories: state.deleteWeatherFromHistories,
      setWeather: state.setWeather,
    }),
    shallow
  );

  const getWeatherDetails = async () => {
    setIsLoading(true);
    const data = await getWeatherByCityCountry({
      city: history.name,
      country: history.sys.country,
    });
    setIsLoading(false);
    if (!data) return;
    setWeather(data.count ? data.list[0] : null);
  };

  return (
    <div
      className={`flex items-center justify-between text-sm sm:text-base space-x-2 md:space-x-4 ${
        index ? "pt-4" : ""
      }`}
    >
      <div className="truncate">
        {index + 1}. {history.name}, {history.sys.country}
      </div>
      <div className="flex items-center space-x-2 md:space-x-4 shrink-0">
        <div>{dayjs(new Date(history.dt * 1000)).format("HH:mm:ss A")}</div>
        <Button
          isLoading={isLoading}
          shape="rounded"
          variant="secondary"
          aria-label="search"
          onClick={getWeatherDetails}
          icon={<SearchIcon className="w-4 h-4" />}
        />
        <Button
          shape="rounded"
          variant="secondary"
          aria-label="delete"
          onClick={() => deleteWeatherFromHistories(index)}
        >
          <TrashIcon className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default WeatherHistory;
