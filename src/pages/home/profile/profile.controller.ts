import {ControllerAbstract} from "../../../poc/controller-abstract.ts";
import {fetchProfile} from "../../../services/data.service.ts";
import {TProfile} from "./types.tsx";
import {Reactive} from "../../../poc/reactive-decorator.ts";

export class ProfileController extends ControllerAbstract<TProfile> {
    someValue = "foo bar";

    @Reactive()
    otherValue?: string;

    @Reactive()
    thirdValue?: string;

    componentCreated = async (props: TProfile) => {
        await this.loadDataOnInit(props.username);
    }

    componentRender = async () => {
    }

    loadDataOnInit = async (username: string) => {
        this.someValue = await fetchProfile(username);
    }

    loadData = async () => {
        this.otherValue = await fetchProfile(Math.random().toString());
        this.thirdValue = "Updated value: " + new Date().toISOString();
    }
}
