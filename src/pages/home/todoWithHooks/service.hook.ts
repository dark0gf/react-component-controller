import {TProfile} from "../types.tsx";
import {useCallback, useEffect, useState} from "react";

export type Todo = {
    id: number;
    text: string;
    completed: boolean;
};

export const useService = (props: TProfile) => {
    const [todos, setTodos] = useState<Todo[]>([
        { id: 1, text: 'Learn React', completed: true },
        { id: 2, text: 'Build a todo app', completed: false }
    ]);
    const [newTodoText, setNewTodoText] = useState<string>("");


    useEffect(() => {
        console.log('ProfileWithHooks username changed', props.username);
    }, [props.username]);

    const addTodo = useCallback(() => {
        if (newTodoText.trim() !== "") {
            const newTodo: Todo = {
                id: Date.now(),
                text: newTodoText,
                completed: false
            };
            setTodos(prevTodos => [...prevTodos, newTodo]);
            setNewTodoText("");
        }
    }, [newTodoText]);

    const toggleTodo = useCallback((id: number) => {
        setTodos(prevTodos =>
            prevTodos.map(todo =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    }, []);

    const deleteTodo = useCallback((id: number) => {
        setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
    }, []);

    const clearCompletedTodos = useCallback(() => {
        setTodos(prevTodos => prevTodos.filter(todo => !todo.completed));
    }, []);

    return {
        todos,
        newTodoText,
        setNewTodoText,
        addTodo,
        toggleTodo,
        deleteTodo,
        clearCompletedTodos
    }
}
