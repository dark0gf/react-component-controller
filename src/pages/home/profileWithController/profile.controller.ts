import {ControllerAbstract} from "../../../poc/controller-abstract.ts";
import {TProfile} from "../types.tsx";
import {fetchProfile} from "../../../services/data.service.ts";

export interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

export class ProfileController extends ControllerAbstract<TProfile> {
    state = this.createReactive<{
        value1?: string;
        value2?: string;
        todos: Todo[];
        newTodoText: string;
    }>({
        todos: [],
        newTodoText: ''
    });

    componentCreated = async () => {
        this.state.value1 = await fetchProfile(this.props.username);
        this.state.todos = [
            { id: 1, text: 'Learn React', completed: true },
            { id: 2, text: 'Build a todo app', completed: false }
        ];
    }

    componentPropsChanged = (prevProps: TProfile) => {
        if (prevProps.username !== this.props.username) {
            console.log('ProfileWithController username changed', this.props.username);
        }
    }

    loadData = async () => {
        this.state.value2 = await fetchProfile(Math.random().toString());
    }

    addTodo = () => {
        if (this.state.newTodoText.trim() === '') return;

        const newTodo: Todo = {
            id: Date.now(),
            text: this.state.newTodoText,
            completed: false
        };

        this.state.todos.push(newTodo);
    }

    toggleTodo = (id: number) => {
        const todo = this.state.todos.find((todo) => todo.id === id);
        if (!todo) {
            return;
        }
        todo.completed = !todo.completed;
    }

    deleteTodo = (id: number) => {
        this.state.todos = this.state.todos.filter(todo => todo.id !== id);
    }

    updateNewTodoText = (text: string) => {
        this.state.newTodoText = text;
    }

    clearCompletedTodos = () => {
        this.state.todos = this.state.todos.filter(todo => !todo.completed);
    }
}
