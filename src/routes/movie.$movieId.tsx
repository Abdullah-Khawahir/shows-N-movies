import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { TMDBMovieDetailsResponse } from "../types";
import { tmdbImageURL } from "../utils";

export const Route = createFileRoute('/movie/$movieId')({
  component: MovieComponent,
  preload: true,

})

function MovieComponent() {
  const { movieId } = Route.useParams();
  const { data, isLoading } = useMovie(movieId);
  if (isLoading || !data) return (<>loading</>)
  return (
    <div>
      <div>adult: {data.adult.toString()}</div>
      <img src={tmdbImageURL(data.backdrop_path, 'w200')} />
      <div>belongs_to_collection: {data.belongs_to_collection}</div>
      <div>budget: {data.budget}</div>
      <div>budget: {data.budget}</div>
      <div>genres: {data.genres.map(l => l.name).join(', ')}</div>
      <div>homepage: {data.homepage}</div>
      <div>id: {data.id}</div>
      <div>imdb_id: {data.imdb_id}</div>
      <div>imdb_id: {data.imdb_id}</div>
      <div>origin_country: {data.origin_country}</div>
      <div>original_language: {data.original_language}</div>
      <div>original_title: {data.original_title}</div>
      <div>overview: {data.overview}</div>
      <div>popularity: {data.popularity}</div>
      <div>popularity: {data.popularity}</div>
      <div>poster_path: {data.poster_path}</div>
      <div>production_companies: {data.production_companies.map(l => l.name).join(', ')}</div>
      <div>release_date: {data.release_date}</div>
      <div>revenue: {data.revenue}</div>
      <div>runtime: {data.runtime}</div>
      <div>spoken_languages: {data.spoken_languages.map(l => l.name).join(', ')}</div>
      <div>status: {data.status}</div>
      <div>tagline: {data.tagline}</div>
      <div>title: {data.title}</div>
      <div>title: {data.title}</div>
      <div>video: {data.video.toString()}</div>
      <div>vote_average: {data.vote_average}</div>
      <div>vote_count: {data.vote_count}</div>
    </div>
  )
}

async function fetchMovie(movieId: string) {
  const url = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNGI5MjgxNGMxODBlOTJmYzljMGY3ZjllZjUwZDZiZCIsIm5iZiI6MTczMDAzMjMzOC42Niwic3ViIjoiNjcxZTMyZDI2ZDZiNzA1ZGM4NzFiNzBkIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.O-nksTYKcxjr6NqBDb2YJDkPdk9cS1ZCXXwzxjN0SjA'
    }
  };

  const response = await fetch(url, options);
  const json = await response.json();
  console.log(json)
  return json;
}

function useMovie(movieId: string): UseQueryResult<TMDBMovieDetailsResponse> {
  return useQuery({
    queryKey: ['movie', movieId],
    queryFn: () => fetchMovie(movieId)
  }
  );
}

