// Love Birds website settings: one place for the addresses and App Store details.

export const SITE = {
  url: 'https://getlovebirds.app',
  name: 'Love Birds',
  email: 'gustifferbuilds@gmail.com',
  terms: 'https://www.apple.com/legal/internet-services/itunes/dev/stdeula/',
  ogImage: '/assets/og-invite.png',
  ogImageAlt: 'A white dove carrying a sealed scroll past a window',

  // Love Birds' Apple ID in App Store Connect. Set appLive to true once the app is
  // on the App Store: the "Get Love Birds" buttons then go to the store instead of
  // showing "coming soon".
  appStoreID: '6825179721',
  appLive: false,

  // App Store Connect's provider token (App Analytics > Campaigns). With it, each
  // blog post's button is tagged so App Store Connect shows installs per post.
  campaignProvider: '',
};

export const appStoreURL = `https://apps.apple.com/app/id${SITE.appStoreID}`;

export const absolute = (path: string) => new URL(path, SITE.url).href;
