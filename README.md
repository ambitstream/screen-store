## screen-store

Shared screen state utilities for React and React Native backed by Redux.

### Problem

Screens often need local-ish state that survives navigation or remounts but does not belong in a global domain slice. Hand-rolling this logic in every feature leads to duplicated reducers, ad-hoc keys, and inconsistent patterns between web and React Native.

### Solution

`screen-store` provides a tiny, Redux-backed key/value store for screen-specific state:

- Each screen registers under a string key.
- State for a given key is a shallow-merged object.
- A single reducer manages the whole screen state slice.
- A small hook API (`useScreen`) makes usage feel like `useState`, while still using Redux under the hood.

### Trade-offs

- **Pros**
  - Centralized reducer logic.
  - Works the same in React and React Native (no platform APIs).
  - Simple, string-based keys; easy to co-locate usage in components.
- **Cons**
  - Requires Redux and `react-redux` (peer dependencies).
  - State is shallow-merged; deeply nested updates still need care.
  - Uses a single `screen` slice by convention; custom slice names require your own selector.

### Installation

This package is not published to npm.  
It is intended to be used directly from this repository, either by copying the code or by linking it locally during development.

#### Option 1: Copy into your project (simplest)

Clone the repository and copy the `screen-store` folder into your project:

~~~bash
git clone https://github.com/ambitstream/screen-store.git
~~~

Then move the folder into your React or React Native project and import from it directly.

#### Option 2: Use as a local dependency

If you keep this repository next to your project, you can install it as a local dependency:

~~~bash
npm install ../screen-store
~~~

This approach is useful during development if you want to iterate on the library and the app at the same time.

### Usage

- Integrate `screenReducer` under a `screen` key in your root reducer.
- Use `useScreen(key, initialValue)` inside components to read and write screen state.

#### Initialization behavior

If `initialValue` is provided, the hook will **lazily initialize** the screen state for the given key on first mount by dispatching `screenSet(key, initialValue)`.

If you need stricter control over when a key appears in the global store (for example, to avoid polluting debug state), you can omit `initialValue` and dispatch `screenSet` manually.

#### Example

~~~tsx
const [screen, setScreen, unsetScreen] = useScreen('profile', {
  name: '',
})

return (
    <input
      type="text"
      value={screen?.name}
      onChange={(e) => setScreen({ name: e.target.value })}
    />
)
~~~

- Optionally dispatch `screenSet`, `screenUnset`, and `screenReset` directly from thunks or sagas.

### Testing

This package does not currently include unit tests.  
The reducer and actions are intentionally kept small and pure to make behavior easy to reason about and straightforward to test externally if needed.

### API surface

- **Reducer**
  - `screenReducer`
  - `initialScreenState`
- **Actions**
  - `screenSet(key, state)`
  - `screenUnset(key)`
  - `screenReset()`
- **Hooks**
  - `useScreen<T>(key, initialValue?)` → `[value, setValue, unset]`
- **Types**
  - `ScreenKey`, `ScreenData`, `ScreenState`
  - `ScreenSetAction`, `ScreenUnsetAction`, `ScreenResetAction`, `ScreenActions`
  - `UseScreenReturn<T>`