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

    // @ts-ignore
    componentPropsChanged = (prevProps: P) => {
    }

    // @ts-ignore
    componentCreated = (props: P) => {
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
