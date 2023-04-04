import { nowPlaying } from "../../lib/spotify";
import type {
  NextApiRequest as Request,
  NextApiResponse as Response,
} from "next";

export default async function handler(req: Request, res: Response) {
  const response = await nowPlaying();
  const data = await response.json();
  console.log("DATA", data);
  res.status(200).json(data);
}
