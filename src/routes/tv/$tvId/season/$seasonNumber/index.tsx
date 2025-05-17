import { useQuery } from "@tanstack/react-query"
import { createFileRoute, Link } from "@tanstack/react-router"
import { TMDBTvExternalIds, TMDBTvSeasonsDetailsResponse } from "../../../../../types"
import { eztvxDownlodsFetch, tmdbFetch, tmdbImageURL } from "../../../../../utils"
import { formatSize } from "../../../../../utils/tools"

export const Route = createFileRoute('/tv/$tvId/season/$seasonNumber/')({
    preload: true,
    loader: async ({ params }) => {
        const infoData = await tmdbFetch<TMDBTvSeasonsDetailsResponse>
            (`/3/tv/${params.tvId}/season/${params.seasonNumber}?language=en-US`)
        console.log(infoData)
        return { infoData };
    },
    component: TvSeason,
})
function TvSeason() {
    const { infoData } = Route.useLoaderData()
    const { tvId } = Route.useParams()
    const { data: tvIds } = useTVSeasonIds(tvId)
    const { data: downloadData } = useDownloads(tvIds?.imdb_id || '')

    return (
        <>
            <img src={tmdbImageURL(infoData.poster_path)} />
            <div className="">
                {infoData.episodes
                    .sort((a, b) => b.episode_number - a.episode_number)
                    .map(e => (
                        <div key={e.id}>
                            <div>  </div>
                            <div>
                                <div className="flex">
                                    <table className="w-full">
                                        <thead className="text-center">
                                            <tr>
                                                <td>
                                                    {e.episode_number} | {e.name} | {e.air_date}
                                                </td>
                                                <td> Quality</td>
                                                <td> Seeds</td>
                                                <td> Size</td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                downloadData && downloadData.torrents
                                                    .filter(d => d.episode.toString() == e.episode_number.toString() &&
                                                        d.season.toString() == e.season_number.toString())
                                                    .sort((a, b) => +b.size_bytes - +a.size_bytes)
                                                    .map(download => (
                                                        <tr key={download.hash}>
                                                            <td>   {download.title}</td>
                                                            <td>   {downloadTitleToDetails(download.title).quality}</td>
                                                            <td>   {download.seeds}</td>
                                                            <td>
                                                                <Link className="visited:text-shadow-amber-950" to={download.magnet_url}>
                                                                    {formatSize(+download.size_bytes)}
                                                                </Link>
                                                            </td>
                                                        </tr>
                                                    ))
                                                || 'loading ...'
                                            }

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div >
                    ))}
            </div>
        </>)
}

function useTVSeasonIds(tvId: string) {
    return useQuery({
        queryKey: [useTVSeasonIds.name, tvId],
        queryFn: async () => {
            if (!tvId) throw new Error('tvId is not defined or empty');

            const imdbId = await tmdbFetch<TMDBTvExternalIds>(`3/tv/${tvId}/external_ids`)
            return imdbId
        }
    })
}


function useDownloads(imdbId: string) {
    return useQuery({
        queryKey: [useDownloads.name, imdbId],
        queryFn: async () => {
            const downloadData = await eztvxDownlodsFetch(imdbId)
            return downloadData
        }
    })
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
