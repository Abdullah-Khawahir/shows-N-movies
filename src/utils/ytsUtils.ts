import { YtsMovieDetailsResponse, YtsTorrent } from "../types";



export async function ytsDownlodsFetch(imdbId: string): Promise<YtsMovieDetailsResponse> {
  try {
    const res = await fetch(`https://yts.mx/api/v2/movie_details.json?imdb_id=${imdbId}`)
    const json = await res.json()
    console.log(json);
    return json
  } catch (err) {
    throw new Error('failed yts request' + err,)
  }
}

export function ytsMagentLink(torrent: YtsTorrent, movieName: string): string {
  const baseUrl = "magnet:?xt=urn:btih:";
  const hash = torrent.hash;
  movieName = encodeURIComponent(movieName);
  const trackers = [
    "udp://open.demonii.com:1337/announce",
    "udp://tracker.openbittorrent.com:80",
    "udp://tracker.coppersurfer.tk:6969",
    "udp://glotorrents.pw:6969/announce",
    "udp://tracker.opentrackr.org:1337/announce",
    "udp://torrent.gresille.org:80/announce",
    "udp://p4p.arenabg.com:1337",
    "udp://tracker.leechers-paradise.org:6969"
  ];

  const trackerParams = trackers.map(tracker => `&tr=${encodeURIComponent(tracker)}`).join('');
  const magnetUrl = `${baseUrl}${hash}&dn=${movieName}${trackerParams}`;

  return magnetUrl;
}
