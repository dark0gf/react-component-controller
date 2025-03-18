import React from "react";

export abstract class ControllerAbstract<P> {
    private triggerUpdateCallback: React.Dispatch<React.SetStateAction<number>> | undefined;
    setTriggerUpdate(triggerUpdateCallback: React.Dispatch<React.SetStateAction<number>>) {
        this.triggerUpdateCallback = triggerUpdateCallback;
    }

    componentCreated = (props: P) => {
        console.log('ControllerAbstract componentCreated', props);
    }

    componentRender = (props: P) => {
        console.log('ControllerAbstract componentRender', props);
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
