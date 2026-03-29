import { ReactNode } from "react";

export default function PageWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="animate-fade-in">
      {children}
    </div>
  );
}
