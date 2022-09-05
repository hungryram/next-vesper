import { createClient } from "next-sanity";
import { config } from "./client";
import imageUrlBuilder from '@sanity/image-url'

import {createPreviewSubscriptionHook, createCurrentUserHook} from 'next-sanity'

// Connect Sanity Client
export const sanityRes = createClient(config)

const builder = imageUrlBuilder(config)
export default function urlFor(source) {
    return builder.image(source)
}


// Set up the live preview subscription hook
export const usePreviewSubscription = createPreviewSubscriptionHook(config)

// Helper function for using the current logged in user account
export const useCurrentUser = createCurrentUserHook(config)