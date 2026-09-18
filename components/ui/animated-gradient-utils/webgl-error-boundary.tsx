"use client";

import { Component, ReactNode } from "react";
import { cn } from "@/lib/utils";

export function WebGLFallback({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "bg-linear-to-br from-white via-slate-100 to-white",
        className,
      )}
    />
  );
}

export class WebGLErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}
