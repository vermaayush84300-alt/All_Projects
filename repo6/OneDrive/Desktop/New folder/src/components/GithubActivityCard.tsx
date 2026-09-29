import { ExternalLink, FolderGit2, Users, RefreshCw, AlertCircle, GitBranch } from 'lucide-react';
import { useGithubUser } from '../lib/useGithubUser';

export default function GithubActivityCard({ username }: { username: string }) {
  const state = useGithubUser(username);

  return (
    <section className="rounded-2xl border border-edge bg-card p-4 shadow-card sm:p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="grid h-6 w-6 place-items-center rounded-lg bg-ice-soft">
            <GitBranch size={13} className="text-ice" />
          </span>
          <p className="font-mono text-[10px] uppercase tracking-widest text-dusk">
            Live GitHub
          </p>
        </div>
        {state.status === 'success' && (
          <a
            href={state.user.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 rounded-full border border-ice/30 bg-ice-soft/60 px-2.5 py-1 text-[11px] font-medium text-ice transition-colors hover:bg-ice/10"
          >
            View profile <ExternalLink size={10} />
          </a>
        )}
      </div>

      {/* Loading skeleton */}
      {state.status === 'loading' && (
        <div className="flex items-center gap-3 animate-pulse" role="status">
          <div className="h-12 w-12 rounded-full shimmer-loading" />
          <div className="flex-1 space-y-2">
            <div className="h-3 w-2/5 rounded-md shimmer-loading" />
            <div className="h-3 w-3/5 rounded-md shimmer-loading" />
          </div>
        </div>
      )}

      {/* Error state */}
      {state.status === 'error' && (
        <div className="flex items-start gap-2.5 rounded-xl border border-risk/20 bg-risk/5 p-3 text-[13px]">
          <AlertCircle size={15} className="mt-0.5 shrink-0 text-risk" />
          <div>
            <p className="text-ash">{state.message}</p>
            <p className="mt-0.5 text-[11.5px] text-dusk">
              Your streak and submissions are safe.
            </p>
          </div>
        </div>
      )}

      {/* Success state */}
      {state.status === 'success' && (
        <div>
          <div className="flex items-center gap-3">
            <img
              src={state.user.avatar_url}
              alt=""
              className="h-12 w-12 shrink-0 rounded-full ring-2 ring-ice/30"
            />
            <div className="min-w-0">
              <p className="truncate font-display text-[15px] font-semibold text-snow">
                {state.user.name || state.user.login}
              </p>
              <p className="font-mono text-[12px] text-dusk">@{state.user.login}</p>
              {state.user.bio && (
                <p className="mt-0.5 truncate text-[11.5px] text-ash">{state.user.bio}</p>
              )}
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2.5">
            <div className="flex items-center gap-2 rounded-xl border border-edge bg-layer px-3 py-2.5">
              <FolderGit2 size={14} className="shrink-0 text-ice" />
              <div>
                <p className="font-mono text-[15px] font-bold leading-none text-snow">
                  {state.user.public_repos}
                </p>
                <p className="mt-0.5 text-[10.5px] text-dusk">Repos</p>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-edge bg-layer px-3 py-2.5">
              <Users size={14} className="shrink-0 text-ice" />
              <div>
                <p className="font-mono text-[15px] font-bold leading-none text-snow">
                  {state.user.followers}
                </p>
                <p className="mt-0.5 text-[10.5px] text-dusk">Followers</p>
              </div>
            </div>
          </div>

          <p className="mt-3 flex items-center gap-1.5 text-[11px] text-dusk">
            <RefreshCw size={10} />
            Pulled live · not mocked
          </p>
        </div>
      )}
    </section>
  );
}
