import { ControllerAbstract } from "./controller-abstract";

// Store private keys globally to ensure they're accessible
const privateKeys = new Map<string, symbol>();

/**
 * Decorator factory that creates a reactive property
 * @param initialValue Optional initial value for the property
 */
export function Reactive() {
  return function(target: any, propertyKey: string) {
    // Create a unique key for this property
    const privateKey = Symbol(propertyKey);

    // Store the key globally
    privateKeys.set(`${target.constructor.name}.${propertyKey}`, privateKey);

    // Get property descriptor
    const descriptor = Object.getOwnPropertyDescriptor(target, propertyKey) || {
      configurable: true,
      enumerable: true
    };

    // Get the initial value
    const initialValue = target[propertyKey];

    // Define the property with getter and setter
    Object.defineProperty(target, propertyKey, {
      configurable: true,
      enumerable: true,
      get: function() {
        // Initialize with the initial value if it hasn't been set yet
        if (this[privateKey] === undefined && initialValue !== undefined) {
          this[privateKey] = initialValue;
        }
        return this[privateKey];
      },
      set: function(value: any) {
        console.log('Setting reactive property', propertyKey, 'to', value);

        // Store the value
        this[privateKey] = value;

        // Trigger update if available
        if (this instanceof ControllerAbstract && typeof this.triggerUpdate === 'function') {
          console.log('Triggering update for', propertyKey);
          this.triggerUpdate();
        } else {
          console.warn('No triggerUpdate method available on', this.constructor.name);
        }
      }
    });
  };
}
