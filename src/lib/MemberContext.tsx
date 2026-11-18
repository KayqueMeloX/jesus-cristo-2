import { createContext, useContext } from "react";
import type { MemberSession } from "./session";

export interface MemberContextType {
  session: MemberSession;
  signOut: () => void;
}

export const MemberContext = createContext<MemberContextType | null>(null);

export function useMember(): MemberContextType {
  const ctx = useContext(MemberContext);
  if (!ctx) {
    throw new Error("useMember must be used inside /membros");
  }
  return ctx;
}
