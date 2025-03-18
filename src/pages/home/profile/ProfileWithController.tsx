import {ProfileController} from "./profile.controller.ts";
import {useController} from "../../../poc/hooks.ts";
import {TProfile} from "./types.tsx";

export const ProfileWithController = (props: TProfile) => {
    const ctrl = useController(() => new ProfileController(), props);

    return <div className='m-4'>
        <div>props: {JSON.stringify(props)}</div>
        <div>
            <button onClick={ctrl.loadData} className='border-2 p-1'>Fetch data from controller</button>
            <div>Result: {ctrl.otherValue}</div>
        </div>
    </div>
};
