import { FC } from 'react';
import { useQuery } from 'react-query';
import { SearchFormProps } from '../types';
import Promotion, { PromotionItem } from './Promotion';

interface ResultsProps {
  searchData: SearchFormProps;
}
const Results: FC<ResultsProps> = ({ searchData }) => {
  const requestUri =
    searchData &&
    `https://euro-server-production.up.railway.app/api/v1/flights/${searchData.origin}/${searchData.destination}/?departureDate=${
      searchData.departureDate
    }&returnDate=${searchData.returnDate}${searchData.service && '&service=amadeusBestPrice'}`;

  const fecthPromos = async () => {
    const data = await fetch(requestUri);
    const promos = await data.json();
    return promos;
  };

  const { isLoading, error, data } = useQuery(['promos', searchData], fecthPromos);

  if (isLoading) return <div>'Loading...'</div>;

  if (error) return <div>'An error has occurred...'</div>;

  const promosDeparture = data[0]['depart'];
  const promosReturn = data[0]['return'];

  const promos = promosDeparture.map((p: PromotionItem, index: number) => ({ departProps: p, returnProps: promosReturn[index] }));

  return (
    <div className="flex flex-col justify-center w-full space-y-4">
      {promos && promos.map((p: any, index: number) => <Promotion key={index} promos={p} />)}
    </div>
  );
};

export default Results;
