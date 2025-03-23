import React from "react";

export abstract class ControllerAbstract<P> {
    private triggerUpdateCallback: React.Dispatch<React.SetStateAction<number>> | undefined;
    protected props: P

    constructor(props: P) {
        this.props = props;
    }

    setProps(props: P) {
        this.props = props;
    }

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

    componentDestroy = (props: P) => {
        console.log('ControllerAbstract componentDestroy', props);
    }

    triggerUpdate = () => {
        if (!this.triggerUpdateCallback) {
            console.error('No triggerUpdateCallback is not set, update of react component will not happen');
            return;
        }
        this.triggerUpdateCallback(prev => prev + 1);
    }
}
