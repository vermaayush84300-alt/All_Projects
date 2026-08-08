import { useState, type FormEvent } from "react";
import { GitCommitVertical, Share2, Loader2, CheckCircle2, AlertCircle } from "lucide-react";

function isValidGithubUrl(value: string): boolean {
  return /^https:\/\/(www\.)?github\.com\/[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+(\/.*)?$/.test(value.trim());
}

function isValidLinkedinUrl(value: string): boolean {
  return /^https:\/\/(www\.)?linkedin\.com\/(posts|feed)\/[A-Za-z0-9\-_%./?=&]+$/.test(value.trim());
}

interface SubmissionFormProps {
  onSubmit: (github: string, linkedin: string) => Promise<void> | void;
}

export default function SubmissionForm({ onSubmit }: SubmissionFormProps) {
  const [github, setGithub] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [touched, setTouched] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const githubValid = isValidGithubUrl(github);
  const linkedinValid = isValidLinkedinUrl(linkedin);
  const canSubmit = githubValid && linkedinValid && status !== "loading";

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setTouched(true);
    if (!githubValid || !linkedinValid) return;

    setStatus("loading");
    setErrorMsg("");
    try {
      await new Promise((res) => setTimeout(res, 700)); // brief, deliberate pause so the loading state is felt
      await onSubmit(github.trim(), linkedin.trim());
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong while saving your submission. Try again.");
      return;
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <FormField
        id="github-url"
        label="GitHub Repository / Commit"
        icon={GitCommitVertical}
        placeholder="https://github.com/username/project"
        value={github}
        onChange={setGithub}
        touched={touched}
        valid={githubValid}
        errorText="Enter a valid GitHub repository or commit URL."
      />
      <FormField
        id="linkedin-url"
        label="LinkedIn Post"
        icon={Share2}
        placeholder="https://linkedin.com/posts/..."
        value={linkedin}
        onChange={setLinkedin}
        touched={touched}
        valid={linkedinValid}
        errorText="Enter a valid LinkedIn post URL."
      />

      {status === "error" && (
        <div
          role="alert"
          className="flex items-start gap-2 rounded-xl border border-coral/30 bg-coral/10 p-3 text-[13px] text-coral"
        >
          <AlertCircle size={16} className="mt-0.5 shrink-0" />
          {errorMsg}
        </div>
      )}

      <button
        type="submit"
        disabled={!canSubmit}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-marigold px-6 py-4 text-[15px] font-semibold text-white shadow-glow transition-all active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-ink-500 disabled:text-muted disabled:shadow-none"
      >
        {status === "loading" ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            Submitting...
          </>
        ) : (
          <>
            <CheckCircle2 size={18} />
            Submit Today&apos;s Proof
          </>
        )}
      </button>
    </form>
  );
}

function FormField({
  id,
  label,
  icon: Icon,
  placeholder,
  value,
  onChange,
  touched,
  valid,
  errorText,
}: {
  id: string;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  touched: boolean;
  valid: boolean;
  errorText: string;
}) {
  const showError = touched && value.length > 0 && !valid;
  const showValid = value.length > 0 && valid;

  return (
    <div>
      <label htmlFor={id} className="mb-1.5 flex items-center gap-1.5 text-[13.5px] font-medium text-paper">
        <Icon size={14} className="text-muted" />
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type="url"
          inputMode="url"
          autoComplete="off"
          spellCheck={false}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={showError}
          aria-describedby={showError ? `${id}-error` : undefined}
          className={`w-full truncate rounded-xl border bg-ink-800 px-4 py-3.5 pr-10 text-[14.5px] text-paper placeholder:text-muted/70 focus:outline-none ${
            showError
              ? "border-coral focus:border-coral"
              : showValid
              ? "border-teal/50 focus:border-teal"
              : "border-ink-500 focus:border-marigold"
          }`}
        />
        {showValid && (
          <CheckCircle2 size={17} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-teal" />
        )}
      </div>
      {showError && (
        <p id={`${id}-error`} className="mt-1.5 flex items-center gap-1 text-[12.5px] text-coral">
          <AlertCircle size={12} />
          {errorText}
        </p>
      )}
    </div>
  );
}
