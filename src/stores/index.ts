import produce from "immer";
import { Weather } from "types";
import create from "zustand";
import { combine, persist } from "zustand/middleware";

const MAX_SEARCH_HISTORY = 4;

export const useWeatherStore = create(
  persist(
    combine(
      { weather: null as Weather | null, histories: [] as Weather[] },
      (set) => ({
        setWeather: (weather: Weather) =>
          set((state) => {
            if (!weather) {
              return {
                ...state,
                weather: {} as Weather,
              };
            }

            const newHistories = produce(state.histories, (draft) => {
              const weatherIdx = draft.findIndex(
                (history) => history.id === weather.id
              );

              if (weatherIdx !== -1) {
                draft.splice(weatherIdx, 1); // remove the existing weather
              }

              draft.splice(0, 0, weather); // place the searched weather in the beginning of the list
              draft.splice(
                MAX_SEARCH_HISTORY,
                draft.length - MAX_SEARCH_HISTORY
              ); // only remains latest MAX_SEARCH_HISTORY in the list
            });

            return {
              weather,
              histories: newHistories,
            };
          }),
        deleteWeatherFromHistories: (index: number) =>
          set((state) => {
            const deletedHistory = state.histories[index];
            const newHistories = state.histories.filter(
              (_, idx) => idx !== index
            );

            return {
              weather:
                deletedHistory.id === state.weather?.id ? null : state.weather,
              histories: newHistories,
            };
          }),
      })
    ),
    {
      name: "weather-app",
      getStorage: () => localStorage,
    }
  )
);
