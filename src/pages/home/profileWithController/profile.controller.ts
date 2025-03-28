import {ControllerAbstract} from "../../../poc/controller-abstract.ts";
import {fetchProfile} from "../../../services/data.service.ts";
import {TProfile} from "../types.tsx";
import {Reactive} from "../../../poc/reactive-decorator.ts";

export class ProfileController extends ControllerAbstract<TProfile> {
    @Reactive()
    someValue = "init value";

    @Reactive()
    otherValue?: string;

    componentCreated = async (props: TProfile) => {
        console.log('fetching profile');
        this.someValue = 'test';
        this.someValue = await fetchProfile(props.username);
    }

    componentPropsChanged = (prevProps: TProfile) => {
        if (prevProps.username !== this.props.username) {
            console.log('ProfileWithController username changed', this.props.username);
        }
    }

    loadData = async () => {
        this.otherValue = await fetchProfile(Math.random().toString());
    }
}
