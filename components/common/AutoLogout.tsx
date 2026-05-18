"use client";

import { useInactivityLogout } from "@/hooks/useAuth";

export default function AutoLogout() {
  // Passa 600.000 ms (10 minutos)
  useInactivityLogout(600000);
  
  return null; // Componente lógico, sem UI
}
