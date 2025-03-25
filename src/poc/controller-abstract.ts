import React from "react";

export abstract class ControllerAbstract<P> {
    private triggerUpdateCallback: React.Dispatch<React.SetStateAction<number>> | undefined;
    protected props: P

    constructor(props: P) {
        this.props = props;
        // Create a proxy for the controller instance
        return new Proxy(this, {
            set: (target, prop, value) => {
                (target as any)[prop] = value;
                if (prop !== 'props' && prop !== 'triggerUpdateCallback') {
                    target.triggerUpdate();
                }
                return true;
            }
        });
    }

    //** Do not override this method, internal use only */
    setProps = (props: P) => {
        this.props = props;
    }

    //** Do not override this method, internal use only */
    setTriggerUpdate = (triggerUpdateCallback: React.Dispatch<React.SetStateAction<number>>) => {
        this.triggerUpdateCallback = triggerUpdateCallback;
    }

    componentPropsChanged = (prevProps: P) => {
        console.log('ControllerAbstract componentPropsChanged', { props: this.props, prevProps });
    }

    componentCreated = (props: P) => {
        console.log('ControllerAbstract componentCreated', props);
    }

    componentRender = () => {
        console.log('ControllerAbstract componentRender');
    }

    componentDestroy = () => {
        console.log('ControllerAbstract componentDestroy');
    }

    triggerUpdate = () => {
        if (!this.triggerUpdateCallback) {
            console.error('No triggerUpdateCallback is set, update of react component will not happen');
            return;
        }
        this.triggerUpdateCallback(prev => prev + 1);
    }

    protected createReactive<T>(value?: T): T | undefined {
        return new Proxy({ value }, {
            get: (target) => target.value,
            set: (target, _, newValue) => {
                target.value = newValue;
                this.triggerUpdate();
                return true;
            }
        }).value;
    }
}
