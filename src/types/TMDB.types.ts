export interface TMDBError {
  success: boolean
  status_code: number
  status_message: string
}

export interface TMDBTrendingTVResponse {
  page: number
  results: TMDBTrendingTVResults[]
  total_pages: number
  total_results: number
}

export interface TMDBTrendingTVResults {
  id: number
  name?: string
  original_name?: string
  media_type: string
  adult: boolean
  popularity: number
  gender?: number
  known_for_department?: string
  profile_path: any
  backdrop_path?: string
  title?: string
  original_title?: string
  overview?: string
  poster_path?: string
  original_language?: string
  genre_ids?: number[]
  release_date?: string
  video?: boolean
  vote_average?: number
  vote_count?: number
  first_air_date?: string
  origin_country?: string[]
}


export interface TMDBMovieDetailsResponse {
  adult: boolean
  backdrop_path: string
  belongs_to_collection: any
  budget: number
  genres: TMDBGenre[]
  homepage: string
  id: number
  imdb_id: string
  origin_country: string[]
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  production_companies: TMDBProductionCompany[]
  production_countries: TMDBProductionCountry[]
  release_date: string
  revenue: number
  runtime: number
  spoken_languages: TMDBSpokenLanguage[]
  status: string
  tagline: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

export interface TMDBGenre {
  id: number
  name: string
}

export interface TMDBProductionCompany {
  id: number
  logo_path: any
  name: string
  origin_country: string
}

export interface TMDBProductionCountry {
  iso_3166_1: string
  name: string
}

export interface TMDBSpokenLanguage {
  english_name: string
  iso_639_1: string
  name: string
}


export interface TMDBTvDetailsResponse {
  adult: boolean
  backdrop_path: string
  created_by: TMDBCreatedBy[]
  episode_run_time: any[]
  first_air_date: string
  genres: TMDBGenre[]
  homepage: string
  id: number
  in_production: boolean
  languages: string[]
  last_air_date: string
  last_episode_to_air: TMDBLastEpisodeToAir
  name: string
  next_episode_to_air: TMDBNextEpisodeToAir
  networks: TMDBNetwork[]
  number_of_episodes: number
  number_of_seasons: number
  origin_country: string[]
  original_language: string
  original_name: string
  overview: string
  popularity: number
  poster_path: string
  production_companies: TMDBProductionCompany[]
  production_countries: TMDBProductionCountry[]
  seasons: TMDBSeason[]
  spoken_languages: TMDBSpokenLanguage[]
  status: string
  tagline: string
  type: string
  vote_average: number
  vote_count: number
}

export interface TMDBCreatedBy {
  id: number
  credit_id: string
  name: string
  original_name: string
  gender: number
  profile_path: string
}

// export interface Genre {
//   id: number
//   name: string
// }

export interface TMDBLastEpisodeToAir {
  id: number
  name: string
  overview: string
  vote_average: number
  vote_count: number
  air_date: string
  episode_number: number
  episode_type: string
  production_code: string
  runtime: number
  season_number: number
  show_id: number
  still_path: string
}

export interface TMDBNextEpisodeToAir {
  id: number
  name: string
  overview: string
  vote_average: number
  vote_count: number
  air_date: string
  episode_number: number
  episode_type: string
  production_code: string
  runtime: number
  season_number: number
  show_id: number
  still_path: string
}

export interface TMDBNetwork {
  id: number
  logo_path: string
  name: string
  origin_country: string
}


export interface TMDBSeason {
  air_date: string
  episode_count: number
  id: number
  name: string
  overview: string
  poster_path: string
  season_number: number
  vote_average: number
}

