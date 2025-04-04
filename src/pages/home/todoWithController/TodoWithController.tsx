import {TodoController, Todo} from "./Todo.controller.ts";
import {useController} from "../../../poc/hooks.ts";
import {TProfile} from "../types.tsx";

export const TodoWithController = (props: TProfile) => {
    const ctrl = useController(() => new TodoController(props), props);
    const state = ctrl.state;

    return (
        <div className='m-4'>
            <div className="mt-6">
                <h2 className="text-xl font-bold mb-4">Todo List</h2>

                <div className="flex mb-4">
                    <input
                        type="text"
                        value={state.newTodoText}
                        onChange={(e) => ctrl.updateNewTodoText(e.target.value)}
                        onKeyUp={(e) => e.key === 'Enter' && ctrl.addTodo()}
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
