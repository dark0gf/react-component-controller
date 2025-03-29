import {ProfileController} from "./profile.controller.ts";
import {useController} from "../../../poc/hooks.ts";
import {TProfile} from "../types.tsx";

export const ProfileWithController = (props: TProfile) => {
    const ctrl = useController(() => new ProfileController(props), props);
    const state = ctrl.state;

    return <div className='m-4'>
        <div>props: {JSON.stringify(props)}</div>
        <div>
            <div>Data from init: {state.value1}</div>
            <button onClick={ctrl.loadData} className='border-2 p-1'>Fetch data from controller</button>
            <div>Result: {state.value2}</div>
        </div>
    </div>
};
