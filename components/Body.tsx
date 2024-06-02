import { ReactNode } from "react";

export const Body = ({ children }: { children: ReactNode }) => {
  return (
    <div className="overflow-y-auto h-72 mb-4 p-4 flex flex-col">
      {children}
    </div>
  );
};
