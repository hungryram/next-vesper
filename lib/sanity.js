import { createClient } from "next-sanity";
import { config } from "./client";

export const sanityRes = createClient(config)
