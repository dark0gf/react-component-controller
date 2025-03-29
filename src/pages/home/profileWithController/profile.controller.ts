import {ControllerAbstract} from "../../../poc/controller-abstract.ts";
import {TProfile} from "../types.tsx";
import {fetchProfile} from "../../../services/data.service.ts";

export class ProfileController extends ControllerAbstract<TProfile> {
    state = this.createReactive<{value1?: string, value2?: string}>({});

    // Changed from arrow function to regular method for consistent behavior with decorators
    componentCreated = async () => {
        this.state.value1 = await fetchProfile(this.props.username);
    }

    componentPropsChanged = (prevProps: TProfile) => {
        if (prevProps.username !== this.props.username) {
            console.log('ProfileWithController username changed', this.props.username);
        }
    }

    loadData = async () => {
        this.state.value2 = await fetchProfile(Math.random().toString());
    }
}
