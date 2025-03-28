import {TProfile} from "../types.tsx";
import {useCallback, useEffect, useState} from "react";
import {fetchProfile} from "../../../services/data.service.ts";

export const useService = (props: TProfile) => {
    const [someValue, setSomeValue] = useState<string>("init value");
    const [otherValue, setOtherValue] = useState<string>();

    useEffect(() => {
        (async () => {
            setSomeValue(await fetchProfile(Math.random().toString()));
        })()
    }, []);

    const loadData = useCallback(async () => {
        setOtherValue(await fetchProfile(Math.random().toString()));
    }, []);

    useEffect(() => {
        console.log('ProfileWithHooks username changed', props.username);
    }, [props.username]);

    return {someValue, otherValue, loadData}
}
