import React from 'react';
import './MovieCard.scss';
import { MovieDetailsInterface, MovieRecommendationsInterface } from '../../types/types';

interface Props {
  setHomeRoute: React.Dispatch<React.SetStateAction<boolean>>;
  movieDetails: MovieDetailsInterface | null;
  recommendedMovies: MovieRecommendationsInterface | null;
}
 
const MovieCard: React.FC<Props> = ({ setHomeRoute, movieDetails, recommendedMovies }) => {
  return ( 
    <div className='details-container'>
      <section className='details'>
        <h2 className='details__title'>{movieDetails?.title}</h2>
        <img className='details__img' src={`https://image.tmdb.org/t/p/w400${movieDetails?.poster_path}`} alt={movieDetails?.title}/>
        <ul className='details__list'>
          <li className='details__item'><span className='item__value'>{movieDetails?.release_date}</span></li>
          <li className='details__item'><span className='item__value'>{movieDetails?.runtime}</span></li>
          <li className='details__item'> <span className='item__value'>{movieDetails?.spoken_languages[0].english_name}</span></li>
          <li className='details__item--border'><span className='item__value'>{movieDetails?.vote_average}</span></li>
        </ul>
        <ul className='details__genre-list'>
          {movieDetails?.genres.map(item => <li key={item.name} className='details__genre-item'>{item.name} </li>)}
        </ul>
        <div className='details__overview'>
          <h3 className='details__title--secondary'>Overview</h3>
          <p className='details__text'>{movieDetails?.overview}</p>
        </div>
      
        
        <ul className='details__budget-list'>
          <li className='details__budget-item'>Budget: <span className='item__value'>{movieDetails?.budget}</span></li>
          <li className='details__budget-item'>Revenue: <span className='item__value'>{movieDetails?.revenue}</span></li>
        </ul>
        <button className='details__button' onClick={() => setHomeRoute(true)}>Back to home</button>
      </section>
      <section className='suggested'>
        <h3 className='suggested__title'>Recommended movies</h3>
        <ul className='suggested__list'>
         {recommendedMovies?.results.map(item => <li key={item.id} className='suggested__item'>
           <h4 className='suggested__item-title'>{item.title}</h4>
           <p className='suggested__item-date'>{item.release_date}</p>
           <img className='suggested__item-img' src={`https://image.tmdb.org/t/p/w200${item?.poster_path}`}/>
         </li>)}
        </ul>
      </section>
    </div>
   );
}
 
export default MovieCard;