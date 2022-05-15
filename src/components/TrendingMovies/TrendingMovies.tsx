import React, { useCallback } from 'react';
import './TrendingMovies.scss';

import { MoviesInterface } from '../../types/types';

interface Props {
  trendingMovies: MoviesInterface | null;
  getMovieWithId: any;
  setRoute: React.Dispatch<React.SetStateAction<string>>
}
 
const TrendingMovies: React.FC<Props> = ({ trendingMovies, getMovieWithId, setRoute }) => {
 
  const mapItems = useCallback((trendingMovies: MoviesInterface | null): any => {
    return trendingMovies?.results.map((item, i) => item.title ? <li onClick={()=> {getMovieWithId(item.id); setRoute('details')}} key={item.id} className='trending__item'>
      <h3 className='trending__item-title'>{item.title}</h3>
          <p className='trending__item-date'>{item.release_date}</p>
          <img className='trending__item-img' src={`https://image.tmdb.org/t/p/w200${item?.poster_path}`}/>
      </li> : null);
    },[])

  return ( 
    <section className='trending'>
      <h2 className='trending__title'>
        Currently Trending
      </h2>
      <ul className='trending__list'>
        {mapItems(trendingMovies)}
      </ul>
    </section>
   );
}
 
export default TrendingMovies;

