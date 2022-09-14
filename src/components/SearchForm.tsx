import { SubmitHandler, useForm } from 'react-hook-form';
import { airportOptions } from '../utils/constants';
import CalendarIcon from '../icons/CalendarIcon';
import CheckIcon from '../icons/CheckIcon';
import DepartureIcon from '../icons/DepartureIcon';
import ReturnIcon from '../icons/ReturnIcon';
import Picker from './Picker';
import AirportSelect from './AirportSelect';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

interface SearchFormProps {
  origin: string;
  destination: string;
  departureDate: Date;
  returnDate: Date;
  service: boolean;
}

const FormSchema = z.object({
  origin: z.string(),
  destination: z.string(),
  departureDate: z.string(),
  returnDate: z.string(),
});
type FormSchemaType = z.infer<typeof FormSchema>;

const SearchForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaType>({ resolver: zodResolver(FormSchema) });

  const onSubmit: SubmitHandler<FormSchemaType> = (data) => console.log('Form Data:', data);

  return (
    <section className="w-full mx-auto">
      <form
        className="p-8 mt-6 mb-0 rounded-lg shadow-2xl grid gap-1 content-center sm:grid-cols-1 md:grid-cols-2 md:gap-4 lg:grid-cols-4 lg:gap-8"
        onSubmit={handleSubmit(onSubmit)}>
        {/* From City */}
        <div className="col-span-1 text-left">
          <AirportSelect label="From:" icon={<DepartureIcon />} {...register('origin')} disabled={isSubmitting} />
        </div>
        {/* To City */}
        <div className="col-span-1">
          <AirportSelect label="To:" icon={<ReturnIcon />} {...register('destination')} />
        </div>
        {/* Departure Date */}
        <div className="col-span-1">
          <Picker label="Departure:" icon={<CalendarIcon />} {...register('departureDate')} />
        </div>
        {/* Return Date  */}
        <div className="col-span-1">
          <Picker label="Return:" icon={<CalendarIcon />} {...register('returnDate')} />
        </div>
        {/* Service Type */}
        <div className="col-span-1 md:col-span-2">
          <label className="text-lg font-medium text-white">Search Type:</label>
          <div className="grid grid-cols-2 gap-8">
            <div className="relative">
              <input className="hidden group peer" type="radio" name="shippingOption" value="standard_alt" id="standard_alt" />

              <label
                className="block p-4 bg-white text-sm font-medium border border-gray-100 rounded-lg cursor-pointer transition-colors shadow-sm peer-checked:border-blue-500 hover:bg-gray-500 peer-checked:ring-1 peer-checked:ring-blue-500"
                htmlFor="standard_alt">
                <span>Best Match</span>

                <span className="block mt-1 text-xs text-gray-500">* exact date match</span>
              </label>

              <CheckIcon />
            </div>

            <div className="relative">
              <input className="hidden group peer" type="radio" name="shippingOption" value="next_day_alt" id="next_day_alt" />

              <label
                className="block p-4 bg-white text-sm font-medium border border-gray-100 rounded-lg cursor-pointer transition-colors shadow-sm peer-checked:border-blue-500 hover:bg-gray-500 peer-checked:ring-1 peer-checked:ring-blue-500"
                htmlFor="next_day_alt">
                <span>Amadeus Match</span>

                <span className="block mt-1 text-xs text-gray-500">* best price in range</span>
              </label>

              <CheckIcon />
            </div>
          </div>
        </div>
        <div className="flex justify-center items-end col-span-1 md:col-span-2">
          <button
            type="submit"
            className="block w-full mt-1 md:h-20 px-5 py-3 text-sm font-medium text-white bg-blue-600 rounded-lg">
            Search Flights
          </button>
        </div>
      </form>
    </section>
  );
};

export default SearchForm;
