import React, {useEffect, useMemo, useState} from "react";

const fetchProfile = (username: string) => {
    return new Promise<string>(resolve => {
        setTimeout(() => {resolve(username)}, 1000);
    })
}

abstract class ControllerAbstract<P> {
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
        console.log('Triggering update');
        this.triggerUpdateCallback(prev => prev + 1);
    }
}
const useController = <T extends ControllerAbstract<P>, P>(controllerCreator: () => T, props: P) => {
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



/************************/

type TProfile = {
    username: string;
    children: (u: string | null) => React.ReactNode | null
}

class ControllerProfile extends ControllerAbstract<TProfile> {
    someValue = "foo bar";
    otherValue?: string;

    componentCreated = async (props: TProfile) => {
        await this.loadDataOnInit(props.username);
    }

    componentRender = async (props: TProfile) => {
        console.log('componentRender', props);
    }

    loadDataOnInit = async (username: string) => {
        this.someValue = await fetchProfile(username);
        this.triggerUpdate();
    }

    loadData = async () => {
        this.otherValue = await fetchProfile(Math.random().toString());
        this.triggerUpdate();
    }
}

const Profile = (props: TProfile) => {
    const ctrl = useController(() => new ControllerProfile(), props);


    const [v, setV] = useState('');
    const loadData = async () => {
        setV(await fetchProfile(Math.random().toString()));
    }

    return <div>
        {ctrl.someValue}
        <div>
            <button onClick={ctrl.loadData} className='border-2 p-1'>Fetch data from controller</button>
            <div>Result: {ctrl.otherValue}</div>
        </div>
        <div>
            <button onClick={loadData} className='border-2 p-1'>Fetch data from component</button>
            <div>Result: {v}</div>
        </div>
    </div>
};


export function Home() {
    return <Profile username="john_doe">
        {(user) => (user === null ? <div>Loading...</div> : <div>User</div>)}
    </Profile>
}


