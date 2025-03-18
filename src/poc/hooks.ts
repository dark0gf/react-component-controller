import {useEffect, useMemo, useState} from "react";
import {ControllerAbstract} from "./controller-abstract.ts";

export const useController = <T extends ControllerAbstract<P>, P>(controllerCreator: () => T, props: P) => {
    const memoController = useMemo(controllerCreator, []);
    const [, triggerUpdate] = useState(0);

    useEffect(() => {
        memoController.setTriggerUpdate(triggerUpdate);
        memoController.componentCreated(props);
        return () => memoController.componentDestroy(props);
    }, []);

    memoController.componentRender(props);
    return memoController;
}
