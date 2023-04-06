import { topTracks } from "../../lib/spotify";
import type {
  NextApiRequest as Request,
  NextApiResponse as Response,
} from "next";
import { decode, ParsedUrlQuery } from "querystring";
import { TopPlayed } from "../../components/spotify/TopPlayed";

// Types
import { IConvertedTrackObject, ITrackObject } from "../../types/spotify";
import { convertTrackToMinimumData } from "@/helpers/spotify";
import { convertToImageResponse } from "@/helpers/image";
import { renderToString } from "react-dom/server";

export default async function handler(req: Request, res: Response) {
  const response = await topTracks();
  const data = await response.json();
  // console.log("DATA", data);
  // res.status(200).json(data);
  const { items } = data || {};
  // If the link was clicked, reroute them to the href. ie the spotify page.
  if (req.url) {
    const params: ParsedUrlQuery = decode(req.url.split("?")[1]);

    if (params && typeof params.open !== "undefined") {
      if (items && items.external_urls) {
        res.writeHead(302, {
          location: items.external_urls.spotify,
        });
        return res.end();
      }
    }
    // return res.status(200).end();
    // what a monster of a function
    // const convertedItems = await Promise.all(
    //   items.map(
    //     async (tracks) =>
    //       await Promise.all(
    //         tracks.map(async (track: ITrackObject) =>
    //           convertTrackToMinimumData(track)
    //         )
    //       )
    //   )
    // );
    const convertedItems = await Promise.all(
      items.map(
        async (track: ITrackObject) => await convertTrackToMinimumData(track)
      )
    );
    convertToImageResponse(res);

    // console.log("CONVERTED ITEMS", convertedItems);
    const text: string = renderToString(
      // @ts-ignore
      TopPlayed({ trackLists: convertedItems })
    );
    // console.log("Did we make it?", text);
    return res.status(200).send(text);
  }
}
