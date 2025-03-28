import { useState } from "react";
import { ProfileWithHooks } from "./profileWithHooks/ProfileWithHooks.tsx";
import { ProfileWithController } from "./profileWithController/ProfileWithController.tsx";

export const Home = () => {
    const [showProfile, setShowProfile] = useState(true);
    const [showProfileWithController, setShowProfileWithController] = useState(true);
    const [profileUsername, setProfileUsername] = useState("John Doe");
    const [controllerUsername, setControllerUsername] = useState("Jane Smith");

    return (
        <div className="p-4">
            <div className="grid grid-cols-2 gap-4">
                {/* Profile Column */}
                <div className="border p-4 rounded">
                    <h3 className="text-lg font-semibold mb-2">Profile Component</h3>
                    <div className="space-y-4 mb-4">
                        <div>
                            <label className="block mb-2">username:</label>
                            <input 
                                type="text" 
                                value={profileUsername}
                                onChange={(e) => setProfileUsername(e.target.value)}
                                className="border p-2 rounded w-full"
                            />
                        </div>
                        <button 
                            onClick={() => setShowProfile(!showProfile)}
                            className="bg-blue-500 text-white px-4 py-2 rounded w-full"
                        >
                            {showProfile ? 'Destroy' : 'Create'} ProfileWithHooks
                        </button>
                    </div>
                    {showProfile && <ProfileWithHooks username={profileUsername} />}
                </div>

                {/* ProfileWithController Column */}
                <div className="border p-4 rounded">
                    <h3 className="text-lg font-semibold mb-2">ProfileWithController Component</h3>
                    <div className="space-y-4 mb-4">
                        <div>
                            <label className="block mb-2">username:</label>
                            <input 
                                type="text" 
                                value={controllerUsername}
                                onChange={(e) => setControllerUsername(e.target.value)}
                                className="border p-2 rounded w-full"
                            />
                        </div>
                        <button 
                            onClick={() => setShowProfileWithController(!showProfileWithController)}
                            className="bg-blue-500 text-white px-4 py-2 rounded w-full"
                        >
                            {showProfileWithController ? 'Hide' : 'Show'} ProfileWithController
                        </button>
                    </div>
                    {showProfileWithController && <ProfileWithController username={controllerUsername} />}
                </div>
            </div>
        </div>
    );
}; 
