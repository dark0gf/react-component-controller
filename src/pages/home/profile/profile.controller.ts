import {ControllerAbstract} from "../../../poc/controller-abstract.ts";
import {fetchProfile} from "../../../services/data.service.ts";
import {TProfile} from "./types.tsx";

export class ProfileController extends ControllerAbstract<TProfile> {
    someValue = this.createReactive("foo bar");
    otherValue?: string = this.createReactive();

    componentCreated = async (props: TProfile) => {
        await this.loadDataOnInit(props.username);
    }

    componentRender = async () => {
        console.log('componentRender', this.props);
    }

    loadDataOnInit = async (username: string) => {
        this.someValue = await fetchProfile(username);
    }

    loadData = async () => {
        this.otherValue = await fetchProfile(Math.random().toString());
    }
}
