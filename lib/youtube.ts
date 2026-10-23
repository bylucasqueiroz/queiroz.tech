import { site } from "@/lib/site"

// Public channel feed: no API key, lists up to the 15 most recent uploads.
const FEED_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${site.youtubeChannelId}`

export interface YouTubeVideo {
  id: string
  title: string
  url: string
  /** 320×180, 16:9 with no letterboxing. */
  thumbnail: string
  published: string
}

function decodeXml(text: string) {
  return text
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&")
}

/**
 * Videos from the channel feed, newest first. The page that calls this is regenerated at most
 * once a day, so a new upload shows up without a deploy. Returns an empty list if the feed is
 * unreachable; callers then fall back to a plain link to the channel.
 */
export async function getYouTubeVideos(): Promise<YouTubeVideo[]> {
  try {
    const response = await fetch(FEED_URL, { next: { revalidate: 60 * 60 * 24 } })
    if (!response.ok) return []
    const xml = await response.text()
    return [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)]
      .map(([, entry]) => {
        const id = entry.match(/<yt:videoId>([^<]+)<\/yt:videoId>/)?.[1]
        const title = entry.match(/<title>([^<]*)<\/title>/)?.[1]
        const published = entry.match(/<published>([^<]+)<\/published>/)?.[1] ?? ""
        if (!id || !title) return null
        return {
          id,
          title: decodeXml(title),
          url: `https://www.youtube.com/watch?v=${id}`,
          thumbnail: `https://i.ytimg.com/vi/${id}/mqdefault.jpg`,
          published,
        }
      })
      .filter((video): video is YouTubeVideo => video !== null)
      .sort((a, b) => b.published.localeCompare(a.published))
  } catch {
    return []
  }
}
