// Decides once per page load whether the opening title sequence plays, so the hero can
// hold its entrance until the curtain parts.
const KEY = 'intro-played';
let decision: boolean | null = null;

/** Seconds the hero waits so its entrance starts as the intro curtain opens. */
export const INTRO_HOLD = 1.7;

export function shouldPlayIntro(onHomePage: boolean): boolean {
  if (decision !== null) return decision;
  let played = false;
  try {
    played = sessionStorage.getItem(KEY) === '1';
  } catch {
    /* storage unavailable */
  }
  const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  decision = onHomePage && !played && !reduced;
  return decision;
}

export function markIntroPlayed() {
  try {
    sessionStorage.setItem(KEY, '1');
  } catch {
    /* storage unavailable: the intro simply plays again next session */
  }
}
