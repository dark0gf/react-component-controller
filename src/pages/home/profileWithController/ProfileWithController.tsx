import {ProfileController, Todo} from "./profile.controller.ts";
import {useController} from "../../../poc/hooks.ts";
import {TProfile} from "../types.tsx";

export const ProfileWithController = (props: TProfile) => {
    const ctrl = useController(() => new ProfileController(props), props);
    const state = ctrl.state;

    return (
        <div className='m-4'>
            <div className="mb-4">
                <h2 className="text-xl font-bold mb-2">User Profile</h2>
                <div>Username: {props.username}</div>
                <div>Data from init: {state.value1}</div>
                <button
                    onClick={ctrl.loadData}
                    className='border-2 p-1 mt-2 rounded hover:bg-gray-100'
                >
                    Fetch data from controller
                </button>
                <div>Result: {state.value2}</div>
            </div>

            <div className="mt-6">
                <h2 className="text-xl font-bold mb-4">Todo List</h2>

                {/* Add new todo form */}
                <div className="flex mb-4">
                    <input
                        type="text"
                        value={state.newTodoText}
                        onChange={(e) => ctrl.updateNewTodoText(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && ctrl.addTodo()}
                        placeholder="Add a new todo..."
                        className="border p-2 flex-grow rounded-l"
                    />
                    <button
                        onClick={ctrl.addTodo}
                        className="bg-blue-500 text-white p-2 rounded-r"
                    >
                        Add
                    </button>
                </div>

                {/* Todo list */}
                <ul className="border rounded divide-y">
                    {state.todos.length === 0 ? (
                        <li className="p-3 text-gray-500">No todos yet. Add one above!</li>
                    ) : (
                        state.todos.map((todo: Todo) => (
                            <li key={todo.id} className="p-3 flex items-center">
                                <input
                                    type="checkbox"
                                    checked={todo.completed}
                                    onChange={() => ctrl.toggleTodo(todo.id)}
                                    className="mr-3"
                                />
                                <span className={`flex-grow ${todo.completed ? 'line-through text-gray-500' : ''}`}>
                                    {todo.text}
                                </span>
                                <button
                                    onClick={() => ctrl.deleteTodo(todo.id)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    Delete
                                </button>
                            </li>
                        ))
                    )}
                </ul>

                {/* Actions */}
                {state.todos.length > 0 && (
                    <div className="mt-4 flex justify-between">
                        <div>
                            {state.todos.filter(t => !t.completed).length} items left
                        </div>
                        <button
                            onClick={ctrl.clearCompletedTodos}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            Clear completed
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
