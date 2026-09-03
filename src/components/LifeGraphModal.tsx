"use client";

import { LifeGraph } from "@/components/LifeGraph";
import { OverlayModal } from "@/components/OverlayModal";
import type { LifeGraphEdge, LifeGraphNode } from "@/lib/content";

type LifeGraphModalProps = {
  open: boolean;
  onClose: () => void;
  nodes: LifeGraphNode[];
  edges: LifeGraphEdge[];
};

export function LifeGraphModal({ open, onClose, nodes, edges }: LifeGraphModalProps) {
  return (
    <OverlayModal
      open={open}
      onClose={onClose}
      ariaLabel="Life graph"
      contentClassName="relative h-full min-h-screen w-full overflow-hidden p-0"
    >
      {(close) => (
        <div className="about-content-enter flex h-screen w-full flex-col overflow-hidden">
          <header className="flex shrink-0 items-center justify-between px-6 py-5">
            <h2 className="text-[15px] font-medium tracking-tight text-foreground">
              My Life In Graph
            </h2>
            <button
              type="button"
              onClick={close}
              className="font-mono text-[13px] text-foreground-muted transition-colors hover:text-foreground"
            >
              [back]
            </button>
          </header>

          <div className="relative min-h-0 flex-1">
            <LifeGraph nodes={nodes} edges={edges} />
          </div>
        </div>
      )}
    </OverlayModal>
  );
}
