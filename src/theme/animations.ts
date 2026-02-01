import { LinearTransition } from 'react-native-reanimated';

/**
 * Standardized Animation Physics for Reanimated.
 * - SOLID: Clean, snappy, precise (UI elements, toggles).
 * - JELLY: Bouncy, energetic (Rubber band effects).
 * - FLUID: Smooth, organic, slower (Large layout changes, expansions).
 */
export const PHYSICS = {
    SOLID: { damping: 20, stiffness: 200, mass: 0.8 },
    JELLY: { damping: 16, stiffness: 240, mass: 1.2 },
    FLUID: { damping: 18, stiffness: 120, mass: 1.0 },
};

export const LAYOUT_TRANSITIONS = {
    SOLID: LinearTransition.springify().damping(20).stiffness(200).mass(0.8),
    JELLY: LinearTransition.springify().damping(16).stiffness(240).mass(1.2),
    FLUID: LinearTransition.springify().damping(18).stiffness(120).mass(1.0),
};
