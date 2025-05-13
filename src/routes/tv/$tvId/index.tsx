import { createFileRoute, Link } from "@tanstack/react-router"
import { TMDBTvDetailsResponse } from "../../../types";
import { tmdbFetch, tmdbImageURL } from "../../../utils";

export const Route = createFileRoute('/tv/$tvId/')({
  preload: true,
  loader: async ({ params }) => {
    return await tmdbFetch<TMDBTvDetailsResponse>(`/3/tv/${params.tvId}?language=en-US`)
  },
  component: Tv,
});

function Tv() {
  const data = Route.useLoaderData();
  return (
    <div>
      <span>
        <img src={tmdbImageURL(data.poster_path)} alt={data.name} />
      </span>
      <span>
        <img src={tmdbImageURL(data.backdrop_path)} alt={data.name} />
      </span>

      <div>adult: {data.adult.toString()}</div>
      <div>backdrop_path: {data.backdrop_path}</div>
      <div>created_by: {data.created_by.map(c => c.name).join(', ')}</div>
      <div>episode_run_time: {data.episode_run_time.join(', ')}</div>
      <div>first_air_date: {data.first_air_date}</div>
      <div>genres: {data.genres.map(g => g.name).join(', ')}</div>
      <div>homepage: <a href={data.homepage} target="_blank">{data.homepage}</a></div>
      <div>id: {data.id}</div>
      <div>in_production: {data.in_production.toString()}</div>
      <div>languages: {data.languages.join(', ')}</div>
      <div>last_air_date: {data.last_air_date}</div>
      <div>last_episode_to_air: {data.last_episode_to_air?.name ?? "N/A"}</div>
      <div>name: {data.name}</div>
      <div>networks: {data.networks.map(n => n.name).join(', ')}</div>
      <div>next_episode_to_air: {data.next_episode_to_air?.name ?? "N/A"}</div>
      <div>number_of_episodes: {data.number_of_episodes}</div>
      <div>number_of_seasons: {data.number_of_seasons}</div>
      <div>origin_country: {data.origin_country.join(', ')}</div>
      <div>original_language: {data.original_language}</div>
      <div>original_name: {data.original_name}</div>
      <div>overview: {data.overview}</div>
      <div>popularity: {data.popularity}</div>
      <div>production_companies: {data.production_companies.map(pc => pc.name).join(', ')}</div>
      <div>production_countries: {data.production_countries.map(c => c.name).join(', ')}</div>
      <div>
        seasons:
        <ul>
          {data.seasons
            .sort((a, b) => b.season_number - a.season_number)
            .map((s) => (
              <li key={s.id}>
                <Link
                  to="/tv/$tvId/season/$seasonNumber"
                  params={{
                    tvId: data.id.toString(),
                    seasonNumber: s.season_number.toString(),
                  }}
                  preload='viewport'
                >
                  <img src={tmdbImageURL(s.poster_path)} alt={s.name} />
                  <span>{s.name}</span>
                </Link>
              </li>
            ))}
        </ul>
      </div>
      <div>spoken_languages: {data.spoken_languages.map(l => l.english_name).join(', ')}</div>
      <div>status: {data.status}</div>
      <div>tagline: {data.tagline}</div>
      <div>type: {data.type}</div>
      <div>vote_average: {data.vote_average}</div>
      <div>vote_count: {data.vote_count}</div>
    </div>
  );
}
