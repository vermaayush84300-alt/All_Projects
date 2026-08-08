import { useEffect, useState } from "react";
import { fetchGithubUser, type GithubUser } from "./github";

type State =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "success"; user: GithubUser };

export function useGithubUser(username: string | null) {
  const [state, setState] = useState<State>({ status: "loading" });

  useEffect(() => {
    if (!username) {
      setState({ status: "error", message: "No GitHub username to look up." });
      return;
    }
    let cancelled = false;
    setState({ status: "loading" });

    fetchGithubUser(username)
      .then((user) => {
        if (!cancelled) setState({ status: "success", user });
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          const message = err instanceof Error ? err.message : "Couldn't load GitHub data.";
          setState({ status: "error", message });
        }
      });

    return () => {
      cancelled = true;
    };
  }, [username]);

  return state;
}
