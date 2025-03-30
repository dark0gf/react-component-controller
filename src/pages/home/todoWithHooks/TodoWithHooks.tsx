import {TProfile} from "../types.tsx";
import {useService, Todo} from "./service.hook.ts";
import React from "react";

export const TodoWithHooks = (props: TProfile) => {
    const service = useService(props);

    // Handle Enter key press for adding todos
    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            service.addTodo();
        }
    };

    return <div className='m-4'>
        <div className="mt-6">
            <h2 className="text-xl font-bold mb-4">Todo List</h2>

            <div className="flex mb-4">
                <input
                    type="text"
                    value={service.newTodoText}
                    onChange={(e) => service.setNewTodoText(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Add a new todo..."
                    className="border p-2 flex-grow rounded-l"
                />
                <button
                    onClick={service.addTodo}
                    className="bg-blue-500 text-white p-2 rounded-r"
                >
                    Add
                </button>
            </div>

            {/* Todo list */}
            <ul className="border rounded divide-y">
                {service.todos.length === 0 ? (
                    <li className="p-3 text-gray-500">No todos yet. Add one above!</li>
                ) : (
                    service.todos.map((todo: Todo) => (
                        <li key={todo.id} className="p-3 flex items-center">
                            <input
                                type="checkbox"
                                checked={todo.completed}
                                onChange={() => service.toggleTodo(todo.id)}
                                className="mr-3"
                            />
                            <span className={`flex-grow ${todo.completed ? 'line-through text-gray-500' : ''}`}>
                                {todo.text}
                            </span>
                            <button
                                onClick={() => service.deleteTodo(todo.id)}
                                className="text-red-500 hover:text-red-700"
                            >
                                Delete
                            </button>
                        </li>
                    ))
                )}
            </ul>

            {/* Actions */}
            {service.todos.length > 0 && (
                <div className="mt-4 flex justify-between">
                    <div>
                        {service.todos.filter(t => !t.completed).length} items left
                    </div>
                    <button
                        onClick={service.clearCompletedTodos}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        Clear completed
                    </button>
                </div>
            )}
        </div>
    </div>
};
