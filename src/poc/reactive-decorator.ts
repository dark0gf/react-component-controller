import { ControllerAbstract } from "./controller-abstract";

/**
 * Decorator factory that creates a reactive property
 * @param initialValue Optional initial value for the property
 */
export function Reactive() {
  return function(target: ControllerAbstract<any>, propertyKey: string) {
    const privateKey = Symbol(propertyKey);

    Object.defineProperty(target, propertyKey, {
      get() {
        return this[privateKey];
      },
      set(value: any) {
        this[privateKey] = value;
        this.triggerUpdate();
      },
      enumerable: true,
      configurable: true
    });
  };
}
