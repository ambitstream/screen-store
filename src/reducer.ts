// Redux reducer for the screen-store package.
// This is a pure function that mirrors the legacy behavior while using
// TypeScript types and a generic-friendly state shape.

import type { ScreenState, ScreenActions, ScreenData } from './types';
import { SCREEN_SET, SCREEN_UNSET, SCREEN_RESET } from './actions';

export const initialScreenState: ScreenState = {};

export function screenReducer(
  state: ScreenState = initialScreenState,
  action: ScreenActions
): ScreenState {
  switch (action.type) {
    case SCREEN_SET: {
      const prevValue = state[action.key];
      const prevData: ScreenData =
        prevValue && typeof prevValue === 'object' ? (prevValue as ScreenData) : {};

      return {
        ...state,
        [action.key]: {
          ...prevData,
          ...(action.state ?? {}),
        },
      };
    }

    case SCREEN_UNSET: {
      // Remove the key from the state entirely.
      const { [action.key]: _removed, ...rest } = state;
      return rest;
    }

    case SCREEN_RESET: {
      // Reset the entire screen state back to its initial value.
      return {
        ...initialScreenState,
      };
    }

    default:
      return state;
  }
}

