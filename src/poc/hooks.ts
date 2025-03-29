import {useEffect, useMemo, useRef, useState} from "react";
import {ControllerAbstract} from "./controller-abstract.ts";

export const useController = <T extends ControllerAbstract<P>, P extends object>(controllerCreator: () => T, props: P) => {
    // Create the controller instance only once
    const memoController = useMemo(controllerCreator, []);
    const prevPropsRef = useRef<P>(props);
    const [, triggerUpdate] = useState(0);

    // Set up the controller when the component is mounted
    useEffect(() => {
        console.log('Setting up controller');
        memoController.setTriggerUpdate(triggerUpdate);
        memoController.componentCreated();
        return () => memoController.componentDestroy();
    }, []);

    // Update the controller when props change
    useEffect(() => {
        memoController.setProps(props);
        memoController.componentPropsChanged(prevPropsRef.current);
        prevPropsRef.current = props;
    }, [Object.keys(props).map(key => props[key as keyof P])]);

    // Call componentRender on each render
    memoController.componentRender();

    return memoController;
}
