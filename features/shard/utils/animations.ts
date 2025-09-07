/**
 * Centralized animation configuration for consistent timing across the app
 */

// Base animation timings (in seconds)
export const ANIMATION_TIMINGS = {
  // Very fast animations for instant feedback
  instant: 0,
  fast: 0.1,

  // Quick animations for UI interactions
  quick: 0.15,
  normal: 0.2,

  // Standard animations for content
  standard: 0.3,
  relaxed: 0.4,

  // Slow animations for emphasis
  slow: 0.5,
  emphasis: 0.6,
} as const;

// Animation delay patterns for sequential content
export const DELAY_PATTERNS = {
  // Immediate appearance
  immediate: 0,

  // Staggered appearance for lists/grids
  stagger: {
    base: 0.05,
    increment: 0.03,
  },

  // Sequential sections
  sequential: {
    first: 0.1,
    second: 0.15,
    third: 0.2,
    fourth: 0.25,
  },

  // Hero section pattern
  hero: {
    main: 0.1,
    secondary: 0.2,
    accent: 0.25,
  },

  // Card/item patterns
  card: {
    container: 0.1,
    content: 0.15,
    actions: 0.2,
  },
} as const;

// Animation durations for different use cases
export const ANIMATION_DURATIONS = {
  micro: 0.15,
  short: 0.25,
  base: 0.3,
  long: 0.5,
} as const;

// Easing curves
export const EASING = {
  // Standard easing for most animations
  standard: [0.25, 0.1, 0.25, 1] as const,

  // Smooth easing for continuous animations
  smooth: [0.4, 0, 0.2, 1] as const,

  // Snappy easing for UI interactions
  snappy: [0.25, 0.46, 0.45, 0.94] as const,

  // Bouncy easing for playful interactions
  bouncy: [0.68, -0.55, 0.265, 1.55] as const,
} as const;

/**
 * Calculate staggered delay for items in a list
 */
export function getStaggerDelay(index: number, baseDelay = DELAY_PATTERNS.stagger.base): number {
  return baseDelay + index * DELAY_PATTERNS.stagger.increment;
}

/**
 * Get optimized delay for navbar items
 */
export function getNavDelay(index: number): number {
  return DELAY_PATTERNS.immediate + index * 0.02; // Much faster for navbar
}

/**
 * Get card animation delays
 */
export function getCardDelays() {
  return {
    container: DELAY_PATTERNS.card.container,
    content: DELAY_PATTERNS.card.content,
    actions: DELAY_PATTERNS.card.actions,
  };
}

/**
 * Get hero section delays
 */
export function getHeroDelays() {
  return {
    main: DELAY_PATTERNS.hero.main,
    secondary: DELAY_PATTERNS.hero.secondary,
    accent: DELAY_PATTERNS.hero.accent,
  };
}
