import { Header } from "components/common";
import { useWeatherStore } from "stores";
import WeatherHistory from "./WeatherHistory";

type Props = {};

const WeatherHistories = (props: Props) => {
  const histories = useWeatherStore((state) => state.histories);

  return (
    <div>
      <Header>Search History</Header>
      {!!histories.length ? (
        <div className="divide-y m-4 space-y-4">
          {histories.map((history, i) => (
            <WeatherHistory
              key={`${history.id}${i}`}
              index={i}
              history={history}
            />
          ))}
        </div>
      ) : (
        <div className="font-medium text-slate-500 text-center my-6 sm:my-12">
          No Record
        </div>
      )}
    </div>
  );
};

export default WeatherHistories;
