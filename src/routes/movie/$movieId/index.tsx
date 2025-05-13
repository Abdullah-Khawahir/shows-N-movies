import { createFileRoute } from "@tanstack/react-router";
import { formatSize, tmdbFetch, tmdbImageURL, ytsDownlodsFetch, ytsMagentLink } from "../../../utils";
import { TMDBMovieDetailsResponse } from "../../../types";

export const Route = createFileRoute('/movie/$movieId/')({
  component: MovieComponent,
  preload: true,
  loader: async ({ params }) => {
    const info = await tmdbFetch<TMDBMovieDetailsResponse>(`/3/movie/${params.movieId}?language=en-US`);
    const downloads = info.imdb_id ? await ytsDownlodsFetch(info.imdb_id) : null;
    return { info, downloads };
  }
})

function MovieComponent() {
  const { info, downloads } = Route.useLoaderData()
  return (
    <div>
      <img src={tmdbImageURL(info.backdrop_path, 'w200')} />
      <div>original_title: {info.original_title}</div>
      <div>origin_country: {info.origin_country}</div>
      <div>original_language: {info.original_language}</div>
      <div>budget: {info.budget}</div>
      <div>genres: {info.genres.map(l => l.name).join(', ')}</div>
      <div>homepage: {info.homepage}</div>
      <div>id: {info.id}</div>
      <div>imdb_id: {info.imdb_id}</div>
      <div>overview: {info.overview}</div>
      <div>popularity: {info.popularity}</div>
      <div>poster_path: {info.poster_path}</div>
      <div>production_companies: {info.production_companies.map(l => l.name).join(', ')}</div>
      <div>release_date: {info.release_date}</div>
      <div>revenue: {info.revenue}</div>
      <div>runtime: {info.runtime}</div>
      <div>spoken_languages: {info.spoken_languages.map(l => l.name).join(', ')}</div>
      <div>status: {info.status}</div>
      <div>tagline: {info.tagline}</div>
      <div>title: {info.title}</div>
      <div>video: {info.video.toString()}</div>
      <div>vote_average: {info.vote_average}</div>
      <div>vote_count: {info.vote_count}</div>
      {
        downloads &&
        <div>
          downloads:
          {downloads?.data?.movie?.torrents?.sort((a, b) => b.size_bytes - a.size_bytes)
            .map(t => (
              <div key={t.hash}>
                <a href={ytsMagentLink(t, downloads.data.movie.title_long)}>
                  <span>{t.type} </span>
                  <span>{t.quality} </span>
                  <span>{formatSize(t.size_bytes)}</span>
                </a>
              </div>
            ))}
        </div>
      }
    </div>
  )
}

