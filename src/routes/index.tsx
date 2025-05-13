import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { createFileRoute, Link } from '@tanstack/react-router';
import { useState } from 'react';
import { TMDBMulitSearchResponse, TMDBTrendingTVResponse } from '../types';
import { tmdbFetch, tmdbImageURL } from '../utils';
import { useDebounce } from 'use-debounce';
export const Route = createFileRoute('/')({
  component: TrendingPage,
  loader: async () => await tmdbFetch<TMDBTrendingTVResponse>('/3/trending/all/day?language=en-US')
})

function TrendingPage() {
  const data = Route.useLoaderData()
  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedSearchTerm] = useDebounce(searchTerm, 1000)
  const { data: searchData } = useSearch(debouncedSearchTerm)
  return (
    <div className="p-2">

      <div>
        <input onChange={(e) => setSearchTerm(e.target.value)} />

        {searchData && searchData.results.map(r => (
          <Link key={r.id} to={`/${r.media_type}/${r.id}`}>

            <div >
              {<img src={tmdbImageURL(r.poster_path, 'w45')} alt={`img:${r.title ?? r.name}-${r.media_type}`} />}
              <span> {r.title ?? r.name}</span>
            </div>
          </Link>
        ))}
      </div>

      {data.results.map(r => {
        const path = r.media_type === 'movie' ? `/movie/$movieId` : `/tv/$tvId`;
        return (
          <div key={r.id}>
            <Link to={path} params={{
              tvId: r.id.toString(),
              movieId: r.id.toString(),
            }} preload='intent' preloadDelay={250}>
              {r.name ?? r.original_name ?? r.title ?? r.original_title} :: {r.media_type} :: {r.id}
            </Link>
          </div>
        );
      })}
    </div>
  )
}

function useSearch(term: string): UseQueryResult<TMDBMulitSearchResponse> {
  return useQuery({
    queryKey: ['search', term],
    queryFn: async () => await tmdbFetch<TMDBMulitSearchResponse>(`/3/search/multi?query=${term}`),
  })
}
