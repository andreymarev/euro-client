import React, { useState } from 'react';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import { UseFormRegister } from 'react-hook-form';
import { SearchFormProps } from '../types';
import { formatDate } from '../utils/formatDate';

const Picker = React.forwardRef<HTMLInputElement, { label: string; icon: any } & ReturnType<UseFormRegister<SearchFormProps>>>(
  ({ onChange, onBlur, name, label, icon }, ref) => {
    const [startDate, setStartDate] = useState(new Date());
    return (
      <>
        <label className="text-lg font-medium text-white">{label}</label>
        <div className="relative mt-1">
          <input type="text" className="hidden" name={name} ref={ref} value={formatDate(startDate)} readOnly />
          <DatePicker
            className="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm cursor-pointer"
            selected={startDate}
            onChange={(date: Date) => setStartDate(date)}
            onBlur={onBlur}
            minDate={startDate}
          />
          <span className="absolute inset-y-0 inline-flex items-center right-10">{icon}</span>
        </div>
      </>
    );
  }
);

export default Picker;
