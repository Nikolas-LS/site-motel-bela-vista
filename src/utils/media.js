// Consultas de mídia usadas para decidir quando ativar efeitos de ponteiro e movimento.
export const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export const hasFinePointer = () =>
  window.matchMedia('(hover: hover) and (pointer: fine)').matches

// Efeitos que dependem do mouse (tilt, ímã, cursor personalizado).
export const canUsePointerEffects = () => hasFinePointer() && !prefersReducedMotion()
