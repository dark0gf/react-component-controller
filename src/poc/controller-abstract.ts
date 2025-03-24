import React from "react";

export abstract class ControllerAbstract<P> {
    private triggerUpdateCallback: React.Dispatch<React.SetStateAction<number>> | undefined;
    protected props: P

    constructor(props: P) {
        this.props = props;
    }

    //** Do not override this method, internal use only */
    setProps(props: P) {
        this.props = props;
    }

    //** Do not override this method, internal use only */
    setTriggerUpdate(triggerUpdateCallback: React.Dispatch<React.SetStateAction<number>>) {
        this.triggerUpdateCallback = triggerUpdateCallback;
    }

    componentPropsChanged = (prevProps: P) => {
        console.log('ControllerAbstract componentPropsChanged', { prevProps });
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
            console.error('No triggerUpdateCallback is not set, update of react component will not happen');
            return;
        }
        this.triggerUpdateCallback(prev => prev + 1);
    }
}
