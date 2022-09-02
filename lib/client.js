export const config = {
    /**
     * Find your project ID and dataset in `sanity.json` in your studio project.
     * These are considered “public”, but you can use environment variables
     * if you want differ between local dev and production.
     *
     * https://nextjs.org/docs/basic-features/environment-variables
     **/
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    apiVersion: '2022-08-18', // Learn more: https://www.sanity.io/docs/api-versioning
    /**
     * Set useCdn to `false` if your application require the freshest possible
     * data always (potentially slightly slower and a bit more expensive).
     * Authenticated request (like preview) will always bypass the CDN
     **/
    useCdn: process.env.NODE_ENV === 'production',
  
    /**
     * OPTIONAL config to enable authentication with custom token
     * You might need this if you host the preview on a different url than Sanity Studio
     */
  }

  // IHOMEFINDER
  const authCredential = 'Basic ' + new Buffer.from(process.env.NEXT_PUBLIC_IHOMEFINDERUSERNAME + ':' + process.env.NEXT_PUBLIC_IHOMEFINDERPASSWORD).toString('base64')
  export const idxConnection = {
      'method': 'GET',
      'headers': {
          'Accept': 'application/json',
          'Authorization': authCredential,
      }
  };

  export const formatPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
});
