import { nowPlaying, getAudioFeatures } from "../../lib/spotify";
import type {
  NextApiRequest as Request,
  NextApiResponse as Response,
} from "next";
import { decode, ParsedUrlQuery } from "querystring";
import { IAudioFeaturesResponse } from "../../types/spotify";
import { convertTrackToMinimumData } from "../../helpers/spotify";
import { convertToImageResponse } from "../../helpers/image";
import { Player } from "../../components/spotify/NowPlaying";
import { renderToString } from "react-dom/server";

export default async function handler(req: Request, res: Response) {
  const response = await nowPlaying();
  const data = await response.json();
  console.log("DATA", data);
  // res.status(200).json(data);
  const { item } = data;
  const { is_playing: isPlaying = false, progress_ms: progress = 0 } = data;
  // console.log("is_playing01", is_playing);

  // TODO: Build exception if nothing is playing this won't work right now
  // if(!item) {
  //   const response = await lastPlayed();
  //   res.status(200).json({is_playing: false});
  // }
  // If the link was clicked, reroute them to the href.

  if (req.url) {
    const params: ParsedUrlQuery = decode(req.url.split("?")[1]);

    if (params && typeof params.open !== "undefined") {
      if (item && item.external_urls) {
        res.writeHead(302, {
          location: item.external_urls.spotify,
        });
        return res.end();
      }
      return res.status(200).end();
    }
  }
  // The music bars are colored based on the songs danceability, energy and happiness
  // And they move to the beat of the song :) apparently
  let audioFeatures: IAudioFeaturesResponse | object = {};
  if (item !== null) {
    if (Object.keys(item).length) {
      // console.log("ITEM");
      audioFeatures = await getAudioFeatures(item.id);
    }

    const track = await convertTrackToMinimumData(item);
    const { duration_ms: duration } = item;
    convertToImageResponse(res);

    const text: string = renderToString(
      // @ts-ignore
      Player({
        audioFeatures,
        duration,
        isPlaying,
        progress,
        track,
      })
    );
    console.log("TEXT", text);
    return res.send(text);
  }
}
