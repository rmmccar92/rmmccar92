import {
  IAudioFeaturesResponse,
  IAuthorizationTokenResponse,
  ICurrentlyPlayingResponse,
  ICursorBasedPagingObject,
  IPagingObject,
  IPlayHistoryObject,
  ITrackObject,
} from "../types/spotify";

const getAccessToken = async () => {
  const refresh_token = process.env.REFRESH_TOKEN;

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(
        `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
      ).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refresh_token ?? "",
    }),
  });
  return response.json();
};

export const topTracks = async () => {
  const { access_token } = await getAccessToken();
  console.log("ACCESS TOKEN", access_token);

  return fetch("https://api.spotify.com/v1/me/top/tracks", {
    headers: {
      "Authorization": `Bearer ${access_token}`,
    },
  });
};

export const nowPlaying = async () => {
  const { access_token } = await getAccessToken();
  console.log("ACCESS TOKEN", access_token);

  return fetch("https://api.spotify.com/v1/me/player/currently-playing", {
    headers: {
      "Authorization": `Bearer ${access_token}`,
    },
  });
};

export const getAudioFeatures = async (
  id: string
): Promise<IAudioFeaturesResponse | object> => {
  // This is for if it doesn't work we don't want this right now
  // if(Environment.useMockData()) {
  //     return MOCKED_SPOTIFY_AUDIO_FEATURES;
  // }
  const { access_token } = await getAccessToken();

  const response: any = await fetch(
    "https://api.spotify.com/v1/audio-features",
    {
      headers: {
        "Authorization": `Bearer ${access_token}`,
      },
    }
  );

  return response;
};
