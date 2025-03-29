import React from "react";

export abstract class ControllerAbstract<P> {
    private triggerUpdateCallback: React.Dispatch<React.SetStateAction<number>> | undefined;
    protected props: P

    constructor(props: P) {
        this.props = props;
    }

    //** Do not override this method, internal use only */
    setProps = (props: P) => {
        this.props = props;
    }

    //** Do not override this method, internal use only */
    setTriggerUpdate = (triggerUpdateCallback: React.Dispatch<React.SetStateAction<number>>) => {
        this.triggerUpdateCallback = triggerUpdateCallback;
    }

    //** Do not override this method, use for reactive update */
    createReactive = <T extends object>(target: T): T => {
        const self = this;

        // Handler for the Proxy
        const handler: ProxyHandler<any> = {
            get(target, property, receiver) {
                const value = Reflect.get(target, property, receiver);

                if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
                    return self.createReactive(value);
                }

                if (Array.isArray(value)) {
                    return self.createReactive(value);
                }

                return value;
            },
            set(target, property, value, receiver) {
                const result = Reflect.set(target, property, value, receiver);
                self.triggerUpdate();
                return result;
            },

            deleteProperty(target, property) {
                const result = Reflect.deleteProperty(target, property);
                self.triggerUpdate();

                return result;
            }
        };

        // Create and return a proxy for the target object
        return new Proxy(target, handler);
    }

    // @ts-ignore
    componentPropsChanged = (prevProps: P) => {
    }

    // @ts-ignore
    componentCreated = () => {
    }

    componentRender = () => {
    }

    componentDestroy = () => {
    }

    triggerUpdate = () => {
        if (!this.triggerUpdateCallback) {
            console.error('No triggerUpdateCallback is set, update of react component will not happen');
            return;
        }
        this.triggerUpdateCallback(prev => prev + 1);
    }
}
