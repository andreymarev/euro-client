import { SubmitHandler, useForm } from 'react-hook-form';
import CalendarIcon from '../icons/CalendarIcon';
import DepartureIcon from '../icons/DepartureIcon';
import ReturnIcon from '../icons/ReturnIcon';
import Picker from './Picker';
import AirportSelect from './AirportSelect';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { SearchFormProps } from '../types';
import { FC } from 'react';

const FormSchema = z
  .object({
    origin: z.string({ required_error: 'Origin is required' }).length(3),
    destination: z.string({ required_error: 'Destination is required' }).length(3),
    departureDate: z.string({ required_error: 'Departure Date is required' }),
    returnDate: z.string({ required_error: 'Return Date is required' }),
    service: z.boolean(),
  })
  .refine((data) => data.origin !== data.destination, {
    message: 'Destinatination cannot be the same as Origin',
    path: ['destination'],
  })
  .refine((data) => new Date(data.departureDate).getDate() >= new Date(data.returnDate).getDate(), {
    message: 'Return cannot be before Departure',
    path: ['returnDate'],
  });

type FormSchemaType = z.infer<typeof FormSchema>;

interface SearchProps {
  updateSearch: (data: SearchFormProps) => void;
}

const SearchForm: FC<SearchProps> = ({ updateSearch }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = useForm<FormSchemaType>({ resolver: zodResolver(FormSchema) });

  const onSubmit: SubmitHandler<FormSchemaType> = (data) => updateSearch(data);

  return (
    <section className="w-full mx-auto">
      <form
        className="p-8 mt-6 mb-0 rounded-lg shadow-2xl grid gap-1 content-center sm:grid-cols-1 md:grid-cols-2 md:gap-4 lg:grid-cols-4 lg:gap-8"
        onSubmit={handleSubmit(onSubmit)}>
        {/* From City */}
        <div className="col-span-1 text-left">
          <AirportSelect label="From:" icon={<DepartureIcon />} {...register('origin')} disabled={isSubmitting} />
          {errors.origin && <p className="text-sm text-red-700 mt-1">{errors.origin.message}</p>}
        </div>
        {/* To City */}
        <div className="col-span-1">
          <AirportSelect label="To:" icon={<ReturnIcon />} {...register('destination')} />
          {errors.destination && <p className="text-sm text-red-700 mt-1">{errors.destination.message}</p>}
        </div>
        {/* Departure Date */}
        <div className="col-span-1">
          <Picker label="Departure:" icon={<CalendarIcon />} {...register('departureDate')} />
          {errors.departureDate && <p className="text-sm text-red-700 mt-1">{errors.departureDate.message}</p>}
        </div>
        {/* Return Date  */}
        <div className="col-span-1">
          <Picker label="Return:" icon={<CalendarIcon />} {...register('returnDate')} />
          {errors.returnDate && <p className="text-sm text-red-700 mt-1">{errors.returnDate.message}</p>}
        </div>
        {/* Service Type */}
        <div className="col-span-1 md:col-span-2">
          <input type="checkbox" {...register('service')} className="w-5 h-5 bg-white border-blue-600 rounded-md shadow-sm" />
          <span className="pl-3 text-lg font-medium text-white">Amadeus Best Match</span>
        </div>
        <div className="flex justify-center items-end col-span-1 md:col-span-2">
          <button
            type="submit"
            disabled={!isDirty && !isValid}
            className="block w-full mt-1 md:h-20 px-5 py-3 text-sm font-medium text-white bg-blue-600 rounded-lg">
            Search Flights
          </button>
        </div>
      </form>
    </section>
  );
};

export default SearchForm;
