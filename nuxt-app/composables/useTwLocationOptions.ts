import twCities from "~/constants/twLocations";

export function useTwCitiesOptions() {
  const twCityOptions: { value: string; label: string }[] = twCities.map(
    (city) => ({
      value: city.name,
      label: city.name
    })
  );

  return twCityOptions;
}

export function useTwDistrictsOptions(cityName: string) {
  const twCityDistrictsOptions: { value: string; label: string }[] = [];
  const city = twCities.find((city) => city.name === cityName);
  if (city) {
    for (const [_key, value] of Object.entries(city.districts)) {
      twCityDistrictsOptions.push({
        value: value.zip,
        label: value.name
      });
    }
  }
  return twCityDistrictsOptions;
}
