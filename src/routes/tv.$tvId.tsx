import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { TMDBTvDetailsResponse } from "../types";
import { tmdbImageURL } from "../utils";

export const Route = createFileRoute('/tv/$tvId')({
  component: Tv,
})

function Tv() {
  const { tvId } = Route.useParams();
  const { data, isLoading, isError, error } = useTv(tvId)
  if (isError) return <>Error: {error?.message}</>
  if (isLoading || !data) return <>Loading</>
  return (
    <>
      <img src={tmdbImageURL(data.poster_path)} />
      <div>adult: {data.adult.toString()}</div>
      <div>backdrop_path: {data.backdrop_path}</div>
      <div>created_by: {data.created_by.map(c => c.name).join(', ')}</div>
      <div>episode_run_time: {data.episode_run_time.toString()}</div>
      <div>first_air_date: {data.first_air_date}</div>
      <div>genres: {data.genres.map(g => g.name).join(', ')}</div>
      <div>homepage: {data.homepage}</div>
      <div>id: {data.id}</div>
      <div>in_production: {data.in_production}</div>
      <div>languages: {data.languages.join(', ')}</div>
      <div>last_air_date: {data.last_air_date}</div>
      <div>last_episode_to_air: {data.last_episode_to_air.name}</div>
      <div>name: {data.name}</div>
      <div>networks: {data.networks.map(n => n.name).join(', ')}</div>
      <div>next_episode_to_air: {data.next_episode_to_air.name}</div>
      <div>number_of_episodes: {data.number_of_episodes}</div>
      <div>number_of_seasons: {data.number_of_seasons}</div>
      <div>origin_country: {data.origin_country.join(', ')}</div>
      <div>original_language: {data.original_language}</div>
      <div>original_name: {data.original_name}</div>
      <div>overview: {data.overview}</div>
      <div>popularity: {data.popularity}</div>
      <div>poster_path: {data.poster_path}</div>
      <div>production_companies: {data.production_companies.map(pc => pc.name).join(', ')}</div>
      <div>production_countries: {data.production_countries.map(c => c.name).join(', ')}</div>
      <div>seasons: {data.seasons.map(s => s.season_number)}</div>
      <div>spoken_languages: {data.spoken_languages.map(l => l.english_name).join(', ')}</div>
      <div>status: {data.status}</div>
      <div>tagline: {data.tagline}</div>
      <div>type: {data.type}</div>
      <div>vote_average: {data.vote_average}</div>
      <div>vote_count: {data.vote_count}</div>
    </>
  )
}

function useTv(tvId: string): UseQueryResult<TMDBTvDetailsResponse> {
  return useQuery({
    queryKey: ['tv', tvId],
    queryFn: async () => {
      const url = `https://api.themoviedb.org/3/tv/${tvId}?language=en-US`;
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNGI5MjgxNGMxODBlOTJmYzljMGY3ZjllZjUwZDZiZCIsIm5iZiI6MTczMDAzMjMzOC42Niwic3ViIjoiNjcxZTMyZDI2ZDZiNzA1ZGM4NzFiNzBkIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.O-nksTYKcxjr6NqBDb2YJDkPdk9cS1ZCXXwzxjN0SjA'
        }
      };

      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        console.log(data)
        return data;
      } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch TV data");
      }
    }
  })
}
