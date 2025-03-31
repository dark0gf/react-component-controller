import { useState } from "react";
import { TodoWithHooks } from "./todoWithHooks/TodoWithHooks.tsx";
import {TodoWithController} from "./todoWithController/TodoWithController.tsx";

export const Home = () => {
    const [showProfile, setShowProfile] = useState(true);
    const [showTodoWithController, setshowTodoWithController] = useState(true);
    const [profileUsername, setProfileUsername] = useState("John Doe");
    const [controllerUsername, setControllerUsername] = useState("Jane Smith");

    return (
        <div className="p-4">
            <div className="grid grid-cols-2 gap-4">
                {/* Profile Column */}
                <div className="border p-4 rounded">
                    <h3 className="text-lg font-semibold mb-2">TodoWithHooks Component</h3>
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
                            {showProfile ? 'Destroy' : 'Create'} TodoWithHooks
                        </button>
                    </div>
                    {showProfile && <TodoWithHooks username={profileUsername} />}
                </div>

                <div className="border p-4 rounded">
                    <h3 className="text-lg font-semibold mb-2">TodoWithController Component</h3>
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
                            onClick={() => setshowTodoWithController(!showTodoWithController)}
                            className="bg-blue-500 text-white px-4 py-2 rounded w-full"
                        >
                            {showTodoWithController ? 'Destroy' : 'Show'} TodoWithController
                        </button>
                    </div>
                    {showTodoWithController && <TodoWithController username={controllerUsername} />}
                </div>
            </div>
        </div>
    );
}; 
