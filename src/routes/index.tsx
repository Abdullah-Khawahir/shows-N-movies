import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { TMDBTrendingTVResponse } from '../types';

export const Route = createFileRoute('/')({
  component: TrendingPage,
})

function TrendingPage() {
  const { data } = useTrendingAll()
  return (
    <div className="p-2">
      {data && data.results
        .map(r => (
          <div>
            <a href={`/details/media/${r.id}`}>
              {r.name ?? r.original_name ?? r.title ?? r.original_title} ::  {r.media_type} :: {r.id}
            </a>
          </div>
        ))}
    </div>
  )
}

function useTrendingAll(): UseQueryResult<TMDBTrendingTVResponse> {
  return useQuery({
    queryKey: ['TrendingAll'],
    queryFn: async () => {
      const url = 'https://api.themoviedb.org/3/trending/all/day?language=en-US';
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNGI5MjgxNGMxODBlOTJmYzljMGY3ZjllZjUwZDZiZCIsIm5iZiI6MTczMDAzMjMzOC42Niwic3ViIjoiNjcxZTMyZDI2ZDZiNzA1ZGM4NzFiNzBkIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.O-nksTYKcxjr6NqBDb2YJDkPdk9cS1ZCXXwzxjN0SjA'
        }
      };

      try {
        const response = await fetch(url, options);
        const json = await response.json();
        console.log(json);
        return json;
      } catch (err) {
        console.error(err);
        return {
          page: 0,
          total_pages: 0,
          total_results: 0,
          results: []
        };
      }
    },
  })
}

