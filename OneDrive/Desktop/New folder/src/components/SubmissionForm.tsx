import { useState, type FormEvent } from 'react';
import { GitCommitVertical, Share2, Loader2, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';

function isGithubUrl(v: string): boolean {
  return /^https?:\/\/(www\.)?github\.com\/[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+(\/.*)?$/.test(v.trim());
}

function isLinkedinUrl(v: string): boolean {
  return /^https?:\/\/(www\.)?linkedin\.com\/(posts|feed)\/[A-Za-z0-9\-_%./?=&]+$/.test(v.trim());
}

interface SubmissionFormProps {
  onSubmit: (github: string, linkedin: string) => Promise<void> | void;
}

export default function SubmissionForm({ onSubmit }: SubmissionFormProps) {
  const [github, setGithub] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [touched, setTouched] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const githubValid = isGithubUrl(github);
  const linkedinValid = isLinkedinUrl(linkedin);
  const canSubmit = githubValid && linkedinValid && status !== 'loading';

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setTouched(true);
    if (!canSubmit) return;
    setStatus('loading');
    setErrorMsg('');
    try {
      await new Promise((r) => setTimeout(r, 700));
      await onSubmit(github.trim(), linkedin.trim());
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong. Try again.');
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      {/* Step 1 */}
      <div>
        <div className="mb-3 flex items-center gap-2">
          <span className="grid h-5 w-5 place-items-center rounded-full bg-brand/15 font-mono text-[11px] font-bold text-brand">
            1
          </span>
          <span className="text-[12px] font-semibold uppercase tracking-wide text-ash">
            GitHub Repository
          </span>
        </div>
        <UrlField
          id="github-url"
          placeholder="https://github.com/username/project"
          icon={GitCommitVertical}
          value={github}
          onChange={setGithub}
          touched={touched}
          valid={githubValid}
          errorText="Needs to be a valid github.com repository URL."
          iconColor="text-ice"
        />
      </div>

      {/* Step 2 */}
      <div>
        <div className="mb-3 flex items-center gap-2">
          <span className="grid h-5 w-5 place-items-center rounded-full bg-brand/15 font-mono text-[11px] font-bold text-brand">
            2
          </span>
          <span className="text-[12px] font-semibold uppercase tracking-wide text-ash">
            LinkedIn Post
          </span>
        </div>
        <UrlField
          id="linkedin-url"
          placeholder="https://linkedin.com/posts/..."
          icon={Share2}
          value={linkedin}
          onChange={setLinkedin}
          touched={touched}
          valid={linkedinValid}
          errorText="Needs to be a valid linkedin.com/posts URL."
          iconColor="text-brand-light"
        />
      </div>

      {/* Error */}
      {status === 'error' && (
        <div
          role="alert"
          className="flex items-start gap-2 rounded-xl border border-risk/25 bg-risk-soft p-3 text-[13px] text-risk"
        >
          <AlertCircle size={15} className="mt-0.5 shrink-0" />
          {errorMsg}
        </div>
      )}

      {/* Progress indicator */}
      <div className="flex items-center gap-2 py-1">
        <div className="flex-1 h-[2px] rounded-full bg-edge overflow-hidden">
          <div
            className="h-full rounded-full bg-brand transition-all duration-500"
            style={{ width: `${(Number(githubValid) + Number(linkedinValid)) * 50}%` }}
          />
        </div>
        <span className="font-mono text-[10px] text-dusk">
          {Number(githubValid) + Number(linkedinValid)}/2
        </span>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={!canSubmit}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-brand px-6 py-4 text-[15px] font-semibold text-white shadow-glow-brand transition-all active:scale-[0.97] disabled:cursor-not-allowed disabled:bg-edge disabled:text-dusk disabled:shadow-none"
      >
        {status === 'loading' ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            Submitting...
          </>
        ) : (
          <>
            <CheckCircle2 size={18} />
            Submit Proof of Work
            <ArrowRight size={16} />
          </>
        )}
      </button>
    </form>
  );
}

function UrlField({
  id,
  placeholder,
  icon: Icon,
  value,
  onChange,
  touched,
  valid,
  errorText,
  iconColor,
}: {
  id: string;
  placeholder: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  value: string;
  onChange: (v: string) => void;
  touched: boolean;
  valid: boolean;
  errorText: string;
  iconColor: string;
}) {
  const showError = touched && value.length > 0 && !valid;
  const showValid = value.length > 0 && valid;

  return (
    <div>
      <div className="relative">
        <span className={`absolute left-3.5 top-1/2 -translate-y-1/2 ${iconColor}`}>
          <Icon size={15} />
        </span>
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
          className={`w-full rounded-xl border bg-layer py-3.5 pl-10 pr-10 text-[14px] text-snow placeholder:text-dusk focus:outline-none transition-colors ${
            showError
              ? 'border-risk/50 focus:border-risk'
              : showValid
              ? 'border-win/50 focus:border-win'
              : 'border-edge focus:border-brand'
          }`}
        />
        {showValid && (
          <CheckCircle2
            size={16}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-win"
          />
        )}
      </div>
      {showError && (
        <p
          id={`${id}-error`}
          className="mt-1.5 flex items-center gap-1 text-[12px] text-risk"
        >
          <AlertCircle size={11} />
          {errorText}
        </p>
      )}
    </div>
  );
}
