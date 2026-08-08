import { ExternalLink, GitCommitVertical, Users, FolderGit2, RefreshCw, AlertCircle } from "lucide-react";
import { useGithubUser } from "../lib/useGithubUser";

/**
 * The app's one real API integration: a live pull from api.github.com for
 * the student's connected GitHub account. No key required — GitHub's public
 * user endpoint is CORS-open. This is what makes "GitHub proof of work"
 * feel like more than a text field: the platform actually looks the profile up.
 */
export default function GithubActivityCard({ username }: { username: string }) {
  const state = useGithubUser(username);

  return (
    <section className="rounded-2xl border border-ink-600 bg-ink-700 p-5 shadow-card">
      <div className="flex items-center justify-between">
        <p className="flex items-center gap-1.5 font-mono text-xs tracking-wide text-muted">
          <GitCommitVertical size={13} className="text-teal" />
          LIVE GITHUB ACTIVITY
        </p>
        {state.status === "success" && (
          <a
            href={state.user.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-[12px] font-medium text-teal"
          >
            View profile <ExternalLink size={11} />
          </a>
        )}
      </div>

      {state.status === "loading" && (
        <div className="mt-4 flex items-center gap-3 animate-pulse" role="status" aria-label="Loading GitHub activity">
          <div className="h-12 w-12 rounded-full bg-ink-600" />
          <div className="flex-1 space-y-2">
            <div className="h-3 w-2/5 rounded bg-ink-600" />
            <div className="h-3 w-3/5 rounded bg-ink-600" />
          </div>
        </div>
      )}

      {state.status === "error" && (
        <div className="mt-4 flex items-start gap-2 text-[13px] text-muted">
          <AlertCircle size={15} className="mt-0.5 shrink-0 text-coral" />
          <div>
            <p>{state.message}</p>
            <p className="mt-1 text-[12px]">Your streak and submissions aren&apos;t affected.</p>
          </div>
        </div>
      )}

      {state.status === "success" && (
        <div className="mt-4">
          <div className="flex items-center gap-3">
            <img
              src={state.user.avatar_url}
              alt=""
              className="h-12 w-12 shrink-0 rounded-full ring-2 ring-ink-500"
            />
            <div className="min-w-0">
              <p className="truncate font-display text-[15px] font-semibold text-paper">
                {state.user.name || state.user.login}
              </p>
              <p className="truncate font-mono text-[12.5px] text-muted">@{state.user.login}</p>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2 rounded-xl bg-ink-800 px-3 py-2.5">
              <FolderGit2 size={15} className="shrink-0 text-teal" />
              <div>
                <p className="font-mono text-[15px] font-semibold leading-none text-paper">
                  {state.user.public_repos}
                </p>
                <p className="mt-0.5 text-[11px] text-muted">Public repos</p>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-xl bg-ink-800 px-3 py-2.5">
              <Users size={15} className="shrink-0 text-teal" />
              <div>
                <p className="font-mono text-[15px] font-semibold leading-none text-paper">
                  {state.user.followers}
                </p>
                <p className="mt-0.5 text-[11px] text-muted">Followers</p>
              </div>
            </div>
          </div>

          <p className="mt-3 flex items-center gap-1.5 text-[11.5px] text-muted">
            <RefreshCw size={11} />
            Pulled live from GitHub — not mocked
          </p>
        </div>
      )}
    </section>
  );
}
