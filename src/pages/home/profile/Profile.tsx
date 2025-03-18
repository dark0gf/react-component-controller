import {useState} from "react";
import {fetchProfile} from "../../../services/data.service.ts";
import {TProfile} from "./types.tsx";

export const Profile = (props: TProfile) => {
    const [v, setV] = useState('');
    const loadData = async () => {
        setV(await fetchProfile(Math.random().toString()));
    }

    return <div className='m-4'>
        <div>props: {JSON.stringify(props)}</div>
        <div>
            <button onClick={loadData} className='border-2 p-1'>Fetch data from component</button>
            <div>Result: {v}</div>
        </div>
    </div>
};
