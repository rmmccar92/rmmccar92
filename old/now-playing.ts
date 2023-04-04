// Packages
import type {
  NextApiRequest as Request,
  NextApiResponse as Response,
} from "next";
import { decode, ParsedUrlQuery } from "querystring";
import { renderToString } from "react-dom/server";

// Local Imports
import { convertTrackToMinimumData } from "../helpers/spotify";
import { convertToImageResponse } from "../helpers/image";
import { ERROR_MESSAGE_500 } from "../config";
import { Player } from "../components/spotify/NowPlaying";
import spotify from "./spotify";

// Types
import { IAudioFeaturesResponse } from "../types/spotify";

/**
 * Returns an image displaying my current playback state, with nice music bars.
 *
 * @param {Request} req Request for image.
 * @param {Response} res Response to request.
 */
export default async function (req: Request, res: Response) {
  try {
    // Get current playing item.
    const nowPlaying = await spotify.getNowPlaying();

    let { item } = nowPlaying;
    const { is_playing: isPlaying = false, progress_ms: progress = 0 } =
      nowPlaying;

    // Get last played if it's not playing.
    if (!item) {
      const response = await spotify.getLastPlayed();
      item = response.item;
    }

    // If the link was clicked, reroute them to the href.
    if (req.url) {
      const params: ParsedUrlQuery = decode(req.url.split("?")[1]);

      if (params && typeof params.open !== "undefined") {
        if (item && item.external_urls) {
          res.writeHead(302, {
            Location: item.external_urls.spotify,
          });
          return res.end();
        }
        return res.status(200).end();
      }
    }
    // The music bars are colored based on the songs danceability, energy and happiness
    // And they move to the beat of the song :)
    let audioFeatures: IAudioFeaturesResponse | object = {};
    if (item !== null) {
      if (Object.keys(item).length) {
        audioFeatures = await spotify.getTracksAudioFeatures(item.id);
      }

      // Minimum data for the track.
      const track = await convertTrackToMinimumData(item);

      // Getting duration of the track.
      const { duration_ms: duration } = item;

      // Hey! I'm returning an image!
      convertToImageResponse(res);

      // Generating the component and rendering it
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
      return res.send(text);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send(ERROR_MESSAGE_500);
  }
}
