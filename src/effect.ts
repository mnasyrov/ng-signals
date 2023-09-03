/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { MicrotaskScheduler } from './scheduler';
import { Watch } from './watch';

/**
 * An effect can, optionally, register a cleanup function. If registered, the cleanup is executed
 * before the next effect run. The cleanup function makes it possible to "cancel" any work that the
 * previous effect run might have started.
 *
 * @developerPreview
 */
export type EffectCleanupFn = () => void;

/**
 * A callback passed to the effect function that makes it possible to register cleanup logic.
 */
export type EffectCleanupRegisterFn = (cleanupFn: EffectCleanupFn) => void;

/**
 * A global reactive effect, which can be manually destroyed.
 *
 * @developerPreview
 */
export interface EffectRef {
  /**
   * Shut down the effect, removing it from any upcoming scheduled executions.
   */
  destroy(): void;
}

/**
 * Options passed to the `effect` function.
 *
 * @developerPreview
 */
export interface CreateEffectOptions {
  /**
   * Whether the `effect` should allow writing to angular.
   *
   * Using effects to synchronize data by writing to angular can lead to confusing and potentially
   * incorrect behavior, and should be enabled only when necessary.
   */
  allowSignalWrites?: boolean;
}

export class EffectManager {
  private readonly scheduler = new MicrotaskScheduler<Watch>((entry) => {
    entry.run();
  });

  create(
    effectFn: (onCleanup: (cleanupFn: EffectCleanupFn) => void) => void,
    options?: CreateEffectOptions,
  ): EffectRef {
    const allowSignalWrites = options?.allowSignalWrites === true;
    const watch = new Watch(
      effectFn,
      (watch) => this.scheduler.schedule(watch),

      allowSignalWrites,
    );

    // Effects start dirty.
    watch.notify();

    const destroy = () => {
      watch.cleanup();
    };

    return {
      destroy,
    };
  }

  flush(): void {
    this.scheduler.execute();
  }

  isEmpty(): boolean {
    return this.scheduler.isEmpty();
  }
}

export const EFFECT_MANAGER = new EffectManager();

/**
 * Create a global `Effect` for the given reactive function.
 *
 * @developerPreview
 */
export function effect(
  effectFn: (onCleanup: EffectCleanupRegisterFn) => void,
  options?: CreateEffectOptions,
): EffectRef {
  return EFFECT_MANAGER.create(effectFn, options);
}
