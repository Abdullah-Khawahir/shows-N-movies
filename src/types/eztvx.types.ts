export interface EztvxIMDBResponse {
  imdb_id: string
  torrents_count: number
  limit: number
  page: number
  torrents: EztvxTorrent[]
}

export interface EztvxTorrent {
  id: number
  hash: string
  filename: string
  torrent_url: string
  magnet_url: string
  title: string
  imdb_id: string
  season: string
  episode: string
  small_screenshot: string
  large_screenshot: string
  seeds: number
  peers: number
  date_released_unix: number
  size_bytes: string
}
