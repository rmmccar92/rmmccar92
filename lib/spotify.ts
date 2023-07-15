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
  console.log("REFRESH TOKEN", refresh_token);
  try {
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
    const result = await response.json();
    console.log("RESPONSE", result);
    return result;
  } catch (e) {
    console.log("ERROR", e);
    return {};
  }
};

export const topTracks = async () => {
  const { access_token } = await getAccessToken();
  // console.log("ACCESS TOKEN", access_token);

  return fetch(
    "https://api.spotify.com/v1/me/top/tracks?limit=4&time_range=short_term",
    {
      headers: {
        "Authorization": `Bearer ${access_token}`,
      },
    }
  );
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

export const lastPlayed = async () => {
  const { access_token } = await getAccessToken();

  return fetch("https://api.spotify.com/v1/me/player/recently-played", {
    headers: {
      "Authorization": `Bearer ${access_token}`,
    },
  });
};

export const getAudioFeatures = async (id: string): Promise<any | object> => {
  // This is for if it doesn't work we don't want this right now
  // if(Environment.useMockData()) {
  //     return MOCKED_SPOTIFY_AUDIO_FEATURES;
  // }
  console.log("GET AUDIO FEATURES", id);
  const { access_token } = await getAccessToken();
  try {
    return fetch(`https://api.spotify.com/v1/audio-features/${id}`, {
      headers: {
        "Authorization": `Bearer ${access_token}`,
      },
    });
    // console.log("RESPONSE", response);
    // return response;
  } catch (e) {
    console.log("ERROR", e);
    return {};
  }
};
