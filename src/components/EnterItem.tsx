import type { ReactNode } from "react";

type EnterItemProps = {
  index?: number;
  delay?: number;
  duration?: number;
  fadeOnly?: boolean;
  children: ReactNode;
  className?: string;
};

export function EnterItem({
  index = 0,
  delay,
  duration,
  fadeOnly = false,
  children,
  className = "",
}: EnterItemProps) {
  const animationDelay = delay ?? index * 0.1;
  const enterClass = fadeOnly ? "page-enter-fade" : "page-enter";

  return (
    <div
      className={`${enterClass} ${className}`.trim()}
      style={{
        animationDelay: `${animationDelay}s`,
        ...(duration !== undefined && { animationDuration: `${duration}s` }),
      }}
    >
      {children}
    </div>
  );
}
