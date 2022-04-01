import { TextField, Button } from "components/common";
import { FormProvider, useForm } from "react-hook-form";
import {
  getWeatherByCityCountry,
  GetWeatherPayload,
} from "services/getWeatherByCityCountry";
import { useWeatherStore } from "stores";

type Props = {};

type FormValues = GetWeatherPayload;

const GetWeatherForm = (props: Props) => {
  const setWeather = useWeatherStore((state) => state.setWeather);

  const formMethods = useForm<FormValues>({
    defaultValues: {
      city: "",
      country: "",
    },
  });

  const {
    formState: { isSubmitting },
    reset,
    handleSubmit,
  } = formMethods;

  const onSubmit = async (values: FormValues) => {
    const data = await getWeatherByCityCountry(values);
    if (!data) return;
    setWeather(data.count ? data.list[0] : null);
    reset();
  };

  return (
    <div>
      <FormProvider {...formMethods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-between items-start">
            <div className="flex items-start space-x-4">
              <TextField name="city" label="City" required autoFocus />
              <TextField name="country" label="Country" required />
            </div>
            <div className="flex items-center space-x-4">
              <Button type="submit" isLoading={isSubmitting}>
                Search
              </Button>
              <Button variant="ghost" onClick={() => reset()}>
                Clear
              </Button>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default GetWeatherForm;
