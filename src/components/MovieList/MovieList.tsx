import React from "react";
import './MovieList.scss';
import { MoviesInterface } from '../../types/types';

interface Props {
  movies: MoviesInterface;
  page: number | null;
  setTargetPage: React.Dispatch<React.SetStateAction<number | null>>
  setMovieId: React.Dispatch<React.SetStateAction<number | null>>
  setRoute: React.Dispatch<React.SetStateAction<string>>
}

const MovieList: React.FC<Props> = ({ movies, page, setTargetPage, setMovieId, setRoute }) => {
  // counter for animations delay + some seconds (static) for border and image
  let counter: number = 0;
  const pulseDelay: number = movies.results.length;

  // Make an array for total number of page results
  const arr: number[] = [];

  for (let i = 1; i <= movies.total_pages; i++) {
        arr.push(i);
  }
 

  return (
    <section className='result'>
      <h2 className="result__title--big"> Search Results</h2>
      <div className="result__container">
        <p className="result__total">total results: {movies.total_results}</p> 
        <div className="result__button-container">
          <span>pages: </span>
          {arr.map(item => <button type="button" className={`result__button-page ${page === item ? 'target-page' : null}`} key={item} onClick={() => setTargetPage(item)}>{item}</button>)}
        </div>
      </div>
      <ul className="result__list">
        {movies.results.map(movie => {
          counter = counter + 1;
          
          return (
            <li key={movie.id} className="result__item" style={{animation: `borderFadeIn .5s ease-in ${counter + .6}s both`}}>
              <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} className="result__img" style={{animation: `imageFadeIn .5s ease-in ${counter + .4}s both`}}/>
              <h3 className="result__title" style={{animation: `moveInLeft .5s ease-in ${counter}s both`}}>{movie.title}</h3>
              <p className="result__text" style={{animation: `moveInLeft .5s ease-in ${counter}s both`}}>{movie.overview}</p>
              <span className="result__date" style={{animation: `pulse 2s ease-in-out ${pulseDelay}s both`}}>{movie.release_date}</span>
              <span className="result__vote" style={{animation: `pulse 2s ease-in-out ${pulseDelay}s both`}}>{movie.vote_average}</span> 
              <button type="button" className="result__button-details" onClick= {() => {setMovieId(movie.id); setRoute('details')}} style={{animation: `imageFadeIn .5s ease-in ${counter + .4}s both`}}>Details</button>
            </li>
          );
          }
        )}
      </ul>
      {arr.map(item => <span key={item}>{item}</span>)}
    </section>
  );
}

export default MovieList;