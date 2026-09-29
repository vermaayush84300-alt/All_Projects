// Thin client for the public GitHub REST API (https://api.github.com).
// No auth token needed for these read-only endpoints — GitHub allows
// unauthenticated requests (rate-limited to 60/hr per IP) and sends
// permissive CORS headers, so this can be called straight from the browser.

export interface GithubUser {
  login: string;
  name: string | null;
  avatar_url: string;
  bio: string | null;
  public_repos: number;
  followers: number;
  html_url: string;
}

export class GithubApiError extends Error {}

/** Pulls the username out of a github.com profile/repo URL, e.g.
 *  "https://github.com/octocat/Hello-World" -> "octocat". Returns null
 *  if the URL isn't a github.com URL at all. */
export function extractGithubUsername(url: string): string | null {
  try {
    const parsed = new URL(url.trim());
    const host = parsed.hostname.replace(/^www\./, "");
    if (host !== "github.com") return null;
    const [username] = parsed.pathname.split("/").filter(Boolean);
    return username || null;
  } catch {
    return null;
  }
}

export async function fetchGithubUser(username: string): Promise<GithubUser> {
  let res: Response;
  try {
    res = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}`, {
      headers: { Accept: "application/vnd.github+json" },
    });
  } catch {
    throw new GithubApiError("Couldn't reach GitHub. Check your connection and try again.");
  }

  if (res.status === 404) {
    throw new GithubApiError(`No GitHub user found for "${username}".`);
  }
  if (res.status === 403) {
    throw new GithubApiError("GitHub's rate limit kicked in — try again in a few minutes.");
  }
  if (!res.ok) {
    throw new GithubApiError("GitHub didn't respond as expected. Try again shortly.");
  }

  return res.json();
}
