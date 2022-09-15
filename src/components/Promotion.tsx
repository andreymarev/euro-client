import { FC } from 'react';
import Arrow from '../icons/Arrow';
export interface PromotionItem {
  id: number;
  origin: string;
  destination: string;
  departureDate: string;
  priceAmmount: number;
  priceCurrency: string;
  seatAvailability: number;
}
interface PromotionsProps {
  promos: { departProps: PromotionItem; returnProps: PromotionItem };
}
const Promotion: FC<PromotionsProps> = ({ promos }) => {
  const { departProps, returnProps } = promos;
  const twoWayPrice =
    (departProps?.priceAmmount ? departProps?.priceAmmount : 0) + (returnProps?.priceAmmount ? returnProps?.priceAmmount : 0);

  return (
    <button className="flex flex-col justify-between p-8 align-baseline bg-white rounded-sm shadow-xl transition-shadow group hover:shadow-lg">
      <h5 className="text-5xl font-bold text-blue-600">
        {!!twoWayPrice && twoWayPrice.toFixed(2)} {departProps?.priceCurrency || returnProps?.priceCurrency}
      </h5>
      <div className="flex flex-row justify-evenly border-t-2 border-indigo-100">
        {/* Section Airports */}
        <div className="flex flex-col justify-center align-middle pt-2 mt-4 p-5">
          {!!departProps && (
            <p className="flex justify-evenly p-3 text-sm font-black tracking-widest text-gray-500 uppercase">
              {departProps?.origin}
              <Arrow back={false} className={'mr-3'} />
              {departProps?.destination}
            </p>
          )}
          {!!returnProps && (
            <p className="flex justify-items-stretch p-3 text-sm font-black tracking-widest text-gray-500 uppercase">
              {returnProps?.origin}
              <Arrow back={true} className={'mr-3'} />
              {returnProps?.destination}
            </p>
          )}
        </div>
        {/* Section Dates */}
        <div className="flex flex-col justify-center align-middle pt-2 mt-4 ml-3 p-5">
          {!!departProps && (
            <p className="p-3 text-sm font-medium tracking-widest text-gray-500 uppercase">{departProps?.departureDate}</p>
          )}
          {!!returnProps && (
            <p className="p-3 text-sm font-medium tracking-widest text-gray-500 uppercase">{returnProps?.departureDate}</p>
          )}
        </div>
        {/* Section Prices */}
        <div className="flex flex-col justify-center align-middle pt-2 mt-4 ml-3 p-5">
          {!!departProps && (
            <p className="p-3 text-sm font-medium tracking-widest text-blue-400 uppercase">
              {departProps?.priceAmmount} {departProps?.priceCurrency}
            </p>
          )}
          {!!returnProps && (
            <p className="p-3 text-sm font-medium tracking-widest text-blue-400 uppercase">
              {returnProps?.priceAmmount} {returnProps?.priceCurrency}
            </p>
          )}
        </div>
        {/* Section Seats */}
        <div className="flex flex-col justify-center align-middle pt-2 mt-4 ml-3 p-5">
          {!!departProps && (
            <p className="p-3 text-xs font-medium tracking-widest text-gray-500 lowercase italic">
              (Only {departProps?.seatAvailability} tickets)
            </p>
          )}
          {!!returnProps && (
            <p className="p-3 text-xs font-medium tracking-widest text-gray-500 lowercase italic">
              (Only {returnProps?.seatAvailability} tickets)
            </p>
          )}
        </div>
      </div>

      <div className="inline-flex items-center mt-16 text-indigo-600">
        <a href="#" type="submit" className="text-lg font-medium">
          Buy now
        </a>

        <Arrow back={false} className={'transition-transform transform group-hover:translate-x-3'} />
      </div>
    </button>
  );
};

export default Promotion;
