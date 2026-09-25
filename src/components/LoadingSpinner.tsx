type LoadingSpinnerProps = {
  className?: string;
  label?: string;
};

export function LoadingSpinner({
  className = "h-7 w-7",
  label = "Loading",
}: LoadingSpinnerProps) {
  return (
    <span
      className={`inline-block animate-spin rounded-full border-2 border-white/15 border-t-accent ${className}`}
      role="status"
      aria-label={label}
    />
  );
}
