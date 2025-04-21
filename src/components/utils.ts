export class AssertionError extends Error {}

export function assert(condition: any, msg?: string): asserts condition {
  if (!condition) {
    throw new AssertionError(msg);
  }
}

export type Result<T, E = undefined> = 
    { ok: true, value: T }
    | { ok: false, error: E | undefined };

export const Ok = <T>(data: T): Result<T, never> => {
    return { ok: true, value: data };
};
    
export const Err = <E>(error?: E): Result<never, E> => {
    return { ok: false, error };
};