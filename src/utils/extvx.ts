import { EztvxIMDBResponse } from "../types"

export async function eztvxDownlodsFetch(id: string): Promise<EztvxIMDBResponse> {
  if (id.startsWith('tt')) {
    id = id.replace('tt', '')
  }

  let all_jsons: EztvxIMDBResponse[] = [];
  let page = 1;
  let totalTorrents = 0;

  try {
    do {
      const res = await fetch(`https://eztvx.to/api/get-torrents?imdb_id=${id}&limit=100&page=${page}`, {cache: 'force-cache'})
      const json = await res.json() as EztvxIMDBResponse
      all_jsons.push(json);
      totalTorrents = json.torrents_count;
      page++;
    } while ((page - 1) * 100 < totalTorrents);

    return {
      page,
      limit: all_jsons[0].limit,
      imdb_id: all_jsons[0].imdb_id,
      torrents_count: totalTorrents,
      torrents: all_jsons.flatMap(all => all.torrents)
    } as EztvxIMDBResponse;
  } catch (err) {
    throw new Error(JSON.stringify(err))
  }
}
