/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
export { createSignalFromFunction, defaultEquals, isSignal } from './api';
export type { Signal, ValueEqualityFn } from './api';

export { computed } from './computed';
export type { CreateComputedOptions } from './computed';

export { setThrowInvalidWriteToSignalError } from './errors';
export { ReactiveNode, setActiveConsumer } from './graph';

export { setPostSignalSetFn, signal } from './signal';
export type { CreateSignalOptions, WritableSignal } from './signal';

export { untracked } from './untracked';

export { Watch } from './watch';
export type { WatchCleanupFn } from './watch';

export { effect, EFFECT_MANAGER } from './effect';
export type {
  CreateEffectOptions,
  EffectCleanupFn,
  EffectCleanupRegisterFn,
  EffectRef,
} from './effect';
