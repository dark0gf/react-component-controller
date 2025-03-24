import {useEffect, useMemo, useRef, useState} from "react";
import {ControllerAbstract} from "./controller-abstract.ts";

export const useController = <T extends ControllerAbstract<P>, P extends object>(controllerCreator: () => T, props: P) => {
    const memoController = useMemo(controllerCreator, []);
    const prevPropsRef  = useRef<P>(props);
    const [, triggerUpdate] = useState(0);

    useEffect(() => {
        memoController.setTriggerUpdate(triggerUpdate);
        memoController.componentCreated(props);
        return () => memoController.componentDestroy();
    }, []);

    useEffect(() => {
        memoController.setProps(props);
        memoController.componentPropsChanged(prevPropsRef.current);
        prevPropsRef.current = props;
    }, [Object.keys(props).map(key => props[key as keyof P])]);

    memoController.componentRender();
    return memoController;
}
