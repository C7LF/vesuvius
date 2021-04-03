import fetch from "node-fetch";
import { URLSearchParams } from "url";
import { ENDPOINTS } from "../config/endpoints";

import { RequestModel, WatchTogetherRoomModel } from "../models";

const w2gBodyParams = (url: string): URLSearchParams => {
  return new URLSearchParams({
    share: url,
    w2g_api_key: process.env.W2G_KEY,
    bg_color: "#D9D9D9",
  });
};

const requestOptions = (url: string): RequestModel => {
  const reqOps = {
    method: "POST",
    body: w2gBodyParams(url),
    redirect: "follow",
  };
  return reqOps;
};

export const createRoom = async (
  url: string
): Promise<WatchTogetherRoomModel> => {
  const response = await fetch(ENDPOINTS.W2G, requestOptions(url));
  const body = await response.json();
  return body;
};
