import Weather from "components/home/Weather";
import GetWeatherForm from "components/home/GetWeatherForm";
import { Header } from "components/common";
import SearchWeatherHistories from "components/home/WeatherHistories";

function App() {
  return (
    <div className="rootWrapper">
      <Header>Today's Weather</Header>
      <div className="m-4">
        <GetWeatherForm />
      </div>
      <Weather />
      <SearchWeatherHistories />
    </div>
  );
}

export default App;
