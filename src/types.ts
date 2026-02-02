// Public TypeScript types for the screen-store package.
// These types are designed to be simple and easily unit-testable.

// Keys used to identify individual screens in the shared state.
export type ScreenKey = string;

// Core data stored for each screen. This mirrors the legacy behavior of
// storing plain objects per screen key.
export type ScreenData = Record<string, unknown>;

// Full screen state shape: string keys mapping to either:
// - a data object, or
// - false when the screen has been explicitly unset.
export type ScreenState = Record<ScreenKey, ScreenData | false>;

// Action type constants as string literal types. The runtime constants
// are exported from `actions.ts`.
export type ScreenSetType = 'SCREEN_SET';
export type ScreenUnsetType = 'SCREEN_UNSET';
export type ScreenResetType = 'SCREEN_RESET';

export interface ScreenSetAction {
  type: ScreenSetType;
  key: ScreenKey;
  state: ScreenData;
}

export interface ScreenUnsetAction {
  type: ScreenUnsetType;
  key: ScreenKey;
}

export interface ScreenResetAction {
  type: ScreenResetType;
}

export type ScreenActions = ScreenSetAction | ScreenUnsetAction | ScreenResetAction;

// Hook return type is kept for future implementation but not used here.
export type UseScreenReturn<TState> = [
  TState | undefined,
  (nextState: Partial<TState>) => void,
  () => void
];

