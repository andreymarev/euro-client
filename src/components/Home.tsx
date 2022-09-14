import { useQuery } from 'react-query';
import SearchForm from './SearchForm';

const Home = () => {
  const fecthPromos = async () => {
    const data = await fetch(
      'https://euro-server-production.up.railway.app/api/v1/flights/SOF/BER/?departureDate=2022-09-20&returnDate=2022-10-01&service=amadeusBestPrice'
    );
    const promos = await data.json();
    console.log(promos);
  };
  const { isLoading, error } = useQuery('promos', fecthPromos);

  if (isLoading) return <div>'Loading...'</div>;

  if (error) return <div>'An error has occurred...'</div>;

  return (
    <>
      <section className="overflow-hidden bg-[url(https://images.unsplash.com/photo-1554123168-b400f9c806ca?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80)] bg-center bg-no-repeat bg-cover">
        <div className="p-8 md:p-12 lg:px-16 lg:py-24 bg-green-900/25">
          <div className="w-full text-center sm:text-left">
            <h2 className="text-2xl font-bold text-white sm:text-3xl md:text-5xl">Let the journey begin</h2>

            <p className="hidden max-w-md text-white/90 md:mt-6 md:text-lg md:leading-relaxed md:block">Where are you flying?</p>

            <SearchForm />
          </div>
        </div>
      </section>
      <section>Results</section>
    </>
  );
};

export default Home;
