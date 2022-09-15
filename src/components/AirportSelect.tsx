import React from 'react';
import { UseFormRegister } from 'react-hook-form';
import { SearchFormProps } from '../types';
import { airportOptions } from '../utils/constants';

const AirportSelect = React.forwardRef<
  HTMLSelectElement,
  { label: string; icon: any } & ReturnType<UseFormRegister<SearchFormProps>>
>(({ onChange, onBlur, name, label, icon }, ref) => (
  <>
    <label className="text-lg font-medium text-white">{label}</label>
    <div className="relative mt-1">
      <select
        name={name}
        ref={ref}
        onChange={onChange}
        onBlur={onBlur}
        className="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm cursor-pointer">
        <option key="Empty Option" value="">
          Select Airport
        </option>
        {airportOptions.map((a) => (
          <option key={a.iata} value={a.iata}>
            {a.iata}
          </option>
        ))}
      </select>
      <span className="absolute inset-y-0 inline-flex items-center right-10">{icon}</span>
    </div>
  </>
));

export default AirportSelect;
