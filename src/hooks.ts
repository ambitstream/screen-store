// React / React Native hooks for the screen-store package.
// This file contains the primary hook used by consumers.

import { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { screenSet, screenUnset } from './actions';
import type { ScreenKey, ScreenState, UseScreenReturn } from './types';

/**
 * useScreen
 *
 * Hook for working with shared screen state backed by Redux.
 *
 * - Reads the value for the given `key` from the `screen` slice of the store.
 * - On first mount, if `initialValue` is provided, dispatches
 *   `screenSet(key, initialValue)` once to initialize the store.
 * - If the key is missing or explicitly unset (`false`), the hook returns
 *   `initialValue` as the current value.
 * - `setValue` dispatches `screenSet(key, nextValue)`.
 * - `unset` dispatches `screenUnset(key)`.
 *
 * This hook assumes that your Redux state includes a `screen` slice managed
 * by `screenReducer`.
 */
export function useScreen<TState = unknown>(
  key: ScreenKey,
  initialValue?: TState
): UseScreenReturn<TState> {
  const dispatch = useDispatch();
  const didInitRef = useRef(false);

  const value = useSelector((rootState: any) => {
    const slice = (rootState as any).screen as ScreenState | undefined;
    if (!slice) return initialValue;

    const entry = slice[key];
    if (entry === undefined || entry === false) {
      return initialValue;
    }

    return entry as TState;
  });

  useEffect(() => {
    if (didInitRef.current) return;
    if (initialValue === undefined) return;

    dispatch(screenSet(key, initialValue as any));
    didInitRef.current = true;
  }, [dispatch, key, initialValue]);

  const setValue = useCallback(
    (next: Partial<TState>) => {
      // We intentionally keep this simple: the reducer performs the merge,
      // and we rely on the caller to pass object-like values.
      dispatch(screenSet(key, next as any));
    },
    [dispatch, key]
  );

  const unset = useCallback(() => {
    dispatch(screenUnset(key));
  }, [dispatch, key]);

  return [value, setValue, unset];
}

