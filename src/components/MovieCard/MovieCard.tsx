import React, { useCallback } from 'react';
import './MovieCard.scss';
import { MovieDetailsInterface, MovieRecommendationsInterface } from '../../types/types';


interface Props {
  route: string;
  setRoute: React.Dispatch<React.SetStateAction<string>>;
  movieDetails: MovieDetailsInterface | null;
  recommendedMovies: MovieRecommendationsInterface | null;
  getMovieWithId: any;
}
 
const MovieCard: React.FC<Props> = ({ route, setRoute, movieDetails, recommendedMovies, getMovieWithId }) => {
  
  // calculate time in hours-minutes ----- can't pass the value as a number error of geting undifined
  const calculateTime = (time: any ): string => {
    const hours = Math.floor(time / 60);
    const minutes = time % 60;

    return `${hours}h ${minutes}m`
  }

  const calculateBudget = (cash: any): string => {
    const result = cash/1000000;
    return `${result.toPrecision(3)} m`;
  }

  const mapRecommededMovies = useCallback((recommendedMovies: MovieRecommendationsInterface | null) => {
    return recommendedMovies?.results.map(item => item.title ? <li onClick={()=> {getMovieWithId(item.id); setRoute('details')}} key={item.id} className='suggested__item'>
    <h4 className='suggested__item-title'>{item.title}</h4>
    <p className='suggested__item-date'>{item.release_date}</p>
    <img className='suggested__item-img' src={`https://image.tmdb.org/t/p/w200${item?.poster_path}`}/>
  </li> : null)
  }, [route])

  
  return ( 
    <div className='details-container'>
      <section className='details'>
        <h2 className='details__title'>{movieDetails?.title}</h2>
        <img className='details__img' src={`https://image.tmdb.org/t/p/w400${movieDetails?.poster_path}`} alt={movieDetails?.title}/>
        <ul className='details__list'>
          <li className='details__item'>{movieDetails?.release_date}</li>
          <li className='details__item'>{calculateTime(movieDetails?.runtime)}</li>
          <li className='details__item'> {movieDetails?.spoken_languages[0].english_name}</li>
          <li className='details__item--border'>{movieDetails?.vote_average}</li>
        </ul>
        <ul className='details__genre-list'>
          {movieDetails?.genres.map(item => <li key={item.name} className='details__genre-item'>{item.name} </li>)}
        </ul>
        <div className='details__overview'>
          <h3 className='details__title--secondary'>Overview</h3>
          <p className='details__text'>{movieDetails?.overview}</p>
        </div>
      
        
        <ul className='details__budget-list'>
          <li className='details__budget-item'>Budget: {calculateBudget(movieDetails?.budget)}</li>
          <li className='details__budget-item'>Revenue: {calculateBudget(movieDetails?.revenue)}</li>
        </ul>
        <button className='details__button details__button--home' onClick={() => setRoute('home')}>Back to home</button>
        <button className='details__button details__button--search' onClick={() => setRoute('search')}>Back to search</button>
      </section>
      <section className='suggested'>
        <h3 className='suggested__title'>Recommended movies</h3>
        <ul className='suggested__list'>
         {mapRecommededMovies(recommendedMovies)}
        </ul>
      </section>
    </div>
   );
  }
 
export default MovieCard;