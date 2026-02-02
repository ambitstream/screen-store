// Action creators for the screen-store package.
// These mirror the legacy behavior but are typed and framework-agnostic.

import type {
  ScreenKey,
  ScreenData,
  ScreenSetAction,
  ScreenUnsetAction,
  ScreenResetAction,
  ScreenSetType,
  ScreenUnsetType,
  ScreenResetType,
} from './types';

// Runtime action type constants. These align with the string literal
// types defined in `types.ts` and are safe for use in reducers and middleware.
export const SCREEN_SET: ScreenSetType = 'SCREEN_SET';
export const SCREEN_UNSET: ScreenUnsetType = 'SCREEN_UNSET';
export const SCREEN_RESET: ScreenResetType = 'SCREEN_RESET';

// Set or update state for a given screen key. The provided `state`
// will be shallow-merged with any existing state for that key by the reducer.
export function screenSet(key: ScreenKey, state: ScreenData): ScreenSetAction {
  return {
    type: SCREEN_SET,
    key,
    state,
  };
}

// Explicitly unset a screen's state. The reducer will remove the key
// from the screen state object.
export function screenUnset(key: ScreenKey): ScreenUnsetAction {
  return {
    type: SCREEN_UNSET,
    key,
  };
}

// Reset all screen state back to its initial shape. This mirrors the
// legacy behavior of clearing the entire screen store at once.
export function screenReset(): ScreenResetAction {
  return {
    type: SCREEN_RESET,
  };
}

