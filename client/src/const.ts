export { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";

// Generate login URL at runtime so redirect URI reflects the current origin.
export const getLoginUrl = () => {
  // Check if we're in a browser environment
  if (typeof window === "undefined") {
    return "/";
  }
  
  const oauthPortalUrl = import.meta.env.VITE_OAUTH_PORTAL_URL;
  const appId = import.meta.env.VITE_APP_ID;
  
  // Return a placeholder URL if OAuth is not configured (both dev and prod)
  // This allows the app to load even without OAuth configuration
  if (!oauthPortalUrl || oauthPortalUrl.trim() === "" || !appId || appId.trim() === "") {
    if (import.meta.env.DEV) {
      console.warn("[getLoginUrl] OAuth not configured, using fallback URL");
    }
    return "/";
  }
  
  const redirectUri = `${window.location.origin}/api/oauth/callback`;
  const state = btoa(redirectUri);

  const url = new URL(`${oauthPortalUrl}/app-auth`);
  url.searchParams.set("appId", appId);
  url.searchParams.set("redirectUri", redirectUri);
  url.searchParams.set("state", state);
  url.searchParams.set("type", "signIn");

  return url.toString();
};
