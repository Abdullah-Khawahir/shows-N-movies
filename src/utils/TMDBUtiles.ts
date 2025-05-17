import { TMDBError } from "../types";

export function tmdbImageURL(path: string, size: string = 'w200') {
  return new URL(`https://image.tmdb.org/t/p/${size}${path}`).toString();
}


export async function tmdbFetch<R>(pathname: string): Promise<R> {
  const baseUrl = 'https://api.themoviedb.org';
  const url = new URL(pathname, baseUrl);
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNGI5MjgxNGMxODBlOTJmYzljMGY3ZjllZjUwZDZiZCIsIm5iZiI6MTczMDAzMjMzOC42Niwic3ViIjoiNjcxZTMyZDI2ZDZiNzA1ZGM4NzFiNzBkIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.O-nksTYKcxjr6NqBDb2YJDkPdk9cS1ZCXXwzxjN0SjA'
    }
  };

  try {
    console.log(`Fetching data from ${url.toString()}`);
    const response = await fetch(url.toString(), options);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch data: ${pathname} ${response.status} ${response.statusText} - ${errorText}`);
    }
    const json = await response.json() as R;
    console.log(`Data fetched successfully from ${url.toString()}`);
    return json;
  } catch (err) {
    console.log(err as Error);
    throw new Error((err as TMDBError).status_message ?? 'An unexpected error occurred');
  }
}
