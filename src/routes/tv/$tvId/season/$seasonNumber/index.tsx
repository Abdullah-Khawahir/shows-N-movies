import { createFileRoute } from "@tanstack/react-router"
import { TMDBTvExternalIds, TMDBTvSeasonsDetailsResponse } from "../../../../../types"
import { eztvxDownlodsFetch, tmdbFetch, tmdbImageURL } from "../../../../../utils"
import { formatSize } from "../../../../../utils/tools"

export const Route = createFileRoute('/tv/$tvId/season/$seasonNumber/')({
    preload: true,
    loader: async ({ params }) => {

        const infoData = await tmdbFetch<TMDBTvSeasonsDetailsResponse>
            (`/3/tv/${params.tvId}/season/${params.seasonNumber}?language=en-US`)

        const imdbId = await tmdbFetch<TMDBTvExternalIds>(`3/tv/${params.tvId}/external_ids`)

        const downloadData = await eztvxDownlodsFetch(imdbId.imdb_id)
        return { downloadData, infoData };
    },
    component: TvSeason,

})
function TvSeason() {
    const { downloadData, infoData } = Route.useLoaderData()

    return (
        <>
            <img src={tmdbImageURL(infoData.poster_path)} />
            <div>
                epsionds:
                {infoData.episodes
                    .sort((a, b) => b.episode_number - a.episode_number)
                    .map(e => (
                        <div key={e.id}>
                            <div> {e.episode_number} </div>
                            <div>
                                <div>
                                    {e.name}
                                </div>
                                <div>
                                    {e.air_date}
                                </div>
                                {downloadData.torrents
                                    .filter(d => d.episode.toString() == e.episode_number.toString() &&
                                        d.season.toString() == e.season_number.toString())
                                    .sort((a, b) => +b.size_bytes - +a.size_bytes)
                                    .map(download => (
                                        <div key={download.hash}>
                                            <a href={download.magnet_url}>
                                                {downloadTitleToDetails(download.title).quality}
                                                <span> {formatSize(+download.size_bytes)}</span>
                                            </a>
                                            <span>
                                                <span> seeds:{download.seeds} </span>
                                            </span>
                                        </div>
                                    ))}
                            </div>
                        </div >
                    ))}
            </div>
        </>)
}

function downloadTitleToDetails(title: string) {
    const quality = title.match(/\b(2160p|1080p|720p|480p|360p|\d{3,4}p)\b/i)?.[0] ?? 'N/A';
    const type = title.match(/\b(WEB[-_. ]?(DL|Rip)?|Blu[-_. ]?Ray|BDRip|BRRip|HDRip|DVDRip|DVD|HDTV|CAM|TS|TC|DVDScr|4K|UHD|Remux|SD)\b/i)?.[0] ?? 'N/A';
    const codec = title.match(/\b(x264|x265|h\.?264|h\.?265|HEVC|AV1|DivX|XviD)\b/i)?.[0] ?? 'N/A';
    const audio = title.match(/\b(DTS(?:-HD)?|AAC(?:[.-]LC)?|AC3|EAC3|TrueHD|FLAC|MP3|OGG|5\.1|2\.0|7\.1)\b/i)?.[0] ?? 'N/A';
    const container = title.match(/\b(mkv|mp4|avi|mov|wmv|webm|flv)\b/i)?.[0] ?? 'N/A';
    const language = title.match(/\b(EN|ENG|English|FR|French|ES|Spanish|AR|Arabic|JP|Japanese|KR|Korean)\b/i)?.[0] ?? 'N/A';
    const releaseGroup = title.match(/[-_. ]([^-_. ]+)(?:\.mkv|\.mp4|$)/i)?.[1] ?? 'N/A';

    return {
        quality,
        type,
        codec,
        audio,
        container,
        language,
        releaseGroup,
    };
}
