export function tmdbImageURL(path: string, size: string = 'w200') {
  return `https://image.tmdb.org/t/p/${size}/${path}`
}
