import React, {useCallback, useEffect, useState} from 'react';
import './App.scss';
import movieApi from './apis/movieApi';
import MovieList from './components/MovieList/MovieList';
import { MoviesInterface, MovieDetailsInterface, MovieRecommendationsInterface } from './types/types';
import MovieCard from './components/MovieCard/MovieCard';
import TrendingMovies from './components/TrendingMovies/TrendingMovies';

function App() {
  const [movies, setMovies] = useState<MoviesInterface | null>(null);
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number | null>(null);
  const [targetPage, setTargetPage] = useState<number | null>(null);
  const [route, setRoute] = useState<string>('home');
  const [movieId, setMovieId] = useState<number | null>(null);
  const [movieDetails, setMovieDetails] = useState<MovieDetailsInterface | null>(null);
  const [recommendedMovies, setRecommendedMovies] = useState<MovieRecommendationsInterface | null>(null);
  const [trendingMovies, setTrendingMovies] = useState<MoviesInterface | null>(null);
  
  useEffect( () => {
    getTrendingMovies();
  }, []);

  useEffect(() => {
    if (targetPage !== null) {
      getMovieWithSearch(search, targetPage)
    }
  },[targetPage]);
  
  useEffect(() => {
    if (movieId !== null) {
      getMovieWithId(movieId)
    }
  },[movieId]);

  

  const onSubmit = (e: React.FormEvent) :void => {
    e.preventDefault();
    getMovieWithSearch(search);
    setRoute('search');
  }

  // Get movies based on search
  const getMovieWithSearch = useCallback( async (search: string, targetPage: number | null = 1) => {
    if(page !== targetPage || page === null){
      const response = await movieApi.get<MoviesInterface>("/search/movie",{
        params: {
          query: search,
          page: targetPage
        }
      });
      setMovies(response.data);
      if( page === null) {
        setPage(response.data.page);
      } else {
        setPage(targetPage);
      }
    }
  },[]);

  // Get movie based on Id
  const getMovieWithId = useCallback(async (movieId: number | null) => {

    const [firstResponse, secondResponse] = await Promise.all([
      movieApi.get<MovieDetailsInterface>(`/movie/${movieId?.toString()}`),
      movieApi.get<MovieRecommendationsInterface>(`/movie/${movieId?.toString()}/recommendations`)
    ]);

    setMovieDetails(firstResponse.data);
    setRecommendedMovies(secondResponse.data);
  }, []);

  // Get Trending movies

  const getTrendingMovies = async () => {
    const response = await movieApi.get<MoviesInterface>("/trending/movies/day");
    
    setTrendingMovies(response.data);
  };

  // Render based on search response

  const showResults = () => {
    if (route === 'search'){
      if (movies?.total_results === 0 ) {
        return <div> No results found </div> ;
      } else if (movies === null) {
        return null;
      } else {
       return <MovieList movies={movies} page={page} setTargetPage={setTargetPage} setMovieId={setMovieId} setRoute={setRoute}/>;
      }
    } else if (route === 'details') {
      return <MovieCard movieDetails={movieDetails} route={route} setRoute={setRoute} recommendedMovies={recommendedMovies} getMovieWithId={getMovieWithId} />;
    } else if (route === 'home') {
      return <TrendingMovies trendingMovies= {trendingMovies} getMovieWithId={getMovieWithId} setRoute={setRoute}/>
    }
  }

  return (
    <div className="home">
      <header className="header">
        <h1 className='header__title'>Movie Search</h1>
        <p className='header__text'>The best place to find your next movie based on popularity, ratings, genre etc.</p>
      </header>
      
      <form className='search' onSubmit={onSubmit} >
        <input type="text" placeholder="Search Movies" className='search__input' value={search} onChange={(e) => setSearch(e.target.value)}/>
        <button className='search__button' type='submit'>
          <svg className="search__icon">
            <use xlinkHref="img/sprite.svg#icon-magnifying-glass"></use>
          </svg>        
        </button>
      </form>
      {showResults()}

    </div>
  );
}

export default App;
