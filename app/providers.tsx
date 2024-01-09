"use client";

import { MovementsProvider } from "./contexts/MovementContext";

export function Providers({children}: {children: React.ReactNode}) {
  return <MovementsProvider>{children}</MovementsProvider>;
}