import { createClient } from "next-sanity";
import { config } from "./client";
import imageUrlBuilder from '@sanity/image-url'

export const sanityRes = createClient(config)

const builder = imageUrlBuilder(config)

export default function urlFor(source) {
    return builder.image(source)
  }