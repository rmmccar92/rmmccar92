import dotenv from "dotenv";
import { Environment } from "../helpers/environment";

dotenv.config();

/**
 * Callback URL for Spotify authorization.
 */
export const CALLBACK_URL = "http://localhost:3000/api/auth";

/**
 * Spotify authorization endpoint.
 */
export const SPOTIFY_AUTHORIZATION_URL = new URL(
  "https://accounts.spotify.com/api/token"
);

/**
 * Spotify currently playing endpoint.
 */
export const SPOTIFY_CURRENT_PLAYING_URL =
  "https://api.spotify.com/v1/me/player/currently-playing";

/**
 * Spotify top played endpoint.
 */
export const SPOTIFY_GET_TOP_PLAYED_URL =
  "https://api.spotify.com/v1/me/top/tracks?limit=5&time_range=";

/**
 * Spotify audio features endpoint.
 */
export const SPOTIFY_GET_TRACK_AUDIO_FEATURES_URL =
  "https://api.spotify.com/v1/audio-features";

/**
 * Spotify get track endpoint.
 */
export const SPOTIFY_GET_TRACK_URL = "https://api.spotify.com/v1/tracks";

/**
 * Spotify recently played endpoint.
 */
export const SPOTIFY_RECENTLY_PLAYED_URL =
  "https://api.spotify.com/v1/me/player/recently-played?limit=1";

/**
 * Spotify authorization header.
 */
export const SPOTIFY_AUTHORIZATION = `Basic ${Buffer.from(
  `${Environment.getSpotifyClientId()}:${Environment.getSpotifyClientSecret()}`
).toString("base64")}`;

/**
 * Spotify authorization url.
 */
export const SPOTIFY_AUTHORIZE_URL = "https://accounts.spotify.com/authorize";

/**
 * Spotify authorization scopes.
 */
export const SPOTIFY_AUTHORIZATION_SCOPES = [
  "user-read-playback-position",
  "user-read-recently-played",
  "user-read-currently-playing",
  "user-read-playback-state",
  "user-top-read",
];

/**
 * Time range keys for top played Spotify endpoint.
 */
export const SPOTIFY_TIME_RANGE_KEYS: string[] = [
  "long_term",
  "medium_term",
  "short_term",
];

/**
 * Lets Github know we're returning an image.
 */
export const IMAGE_RESPONSE_HEADERS: [string, string] = [
  "Content-Type",
  "image/svg+xml",
];

/**
 * Tells the user when to update the image.
 */
export const CACHE_CONTROL_RESPONSE_HEADERS: [string, string] = [
  "Cache-Control",
  "s-maxage=1, stale-while-revalidate",
];

/**
 * Message for 405 error when not in development environment.
 */
export const ERROR_MESSAGE_405 =
  "Endpoint blocked: Not in development environment.";

/**
 * Message for 500 on server error.
 */
export const ERROR_MESSAGE_500 = "Oops it's broken...";
