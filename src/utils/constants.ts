interface AirportType {
  iata: string;
  city: string;
}
export const airportOptions: Array<AirportType> = [
  { iata: 'SOF', city: 'Sofia' },
  { iata: 'BER', city: 'Berlin' },
  { iata: 'CGG', city: 'Paris' },
  { iata: 'KRK', city: 'Krakow' },
  { iata: 'LHR', city: 'London' },
];
