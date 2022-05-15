export interface ResultsInterface {
  poster_path: string;
  adult: boolean;
  overview: string;
  release_date: string;
  genre_ids: number[];
  id: number;
  original_title: string;
  original_language: string;
  title: string;
  backdrop_path: string;
  popularity: number;
  vote_count: number;
  video: boolean;
  vote_average: number;
}

export interface MoviesInterface {
  page: number;
  results: ResultsInterface[];
  total_pages: number;
  total_results: number;
}

export interface MovieDetailsInterface {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: {
    id: number;
    name: string; 
    poster_path: string;
  }
  budget: number;
  genres: [{id: number; name: string;}];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string
  production_companies: [{id: number; logo_path: string; name: string; origin_country: string;}];
  production_countries: [{iso_3161_1: string; name: string;}];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: [{english_name: string; iso_630_1: string; name: string;}];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  
}

export interface MovieRecommendationsInterface {
  page: number;
  results:[{
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    media_type: string;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;

  }]
}