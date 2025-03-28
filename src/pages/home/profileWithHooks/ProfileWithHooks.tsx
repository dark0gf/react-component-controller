import {TProfile} from "../types.tsx";
import {useService} from "./service.hook.ts";

export const ProfileWithHooks = (props: TProfile) => {
    const service = useService(props);

    return <div className='m-4'>
        <div>props: {JSON.stringify(props)}</div>
        <div>
            <div>Data from init: {service.someValue}</div>
            <button onClick={service.loadData} className='border-2 p-1'>Fetch data from component</button>
            <div>Result: {service.otherValue}</div>
        </div>
    </div>
};
