export default class Project {
    constructor(title, description) {
        this.title = title;
        this.description = description;
        this.list = [];
    }

    addTodo(todo) {
        this.list.push(todo);
    }

    removeTodo(index) {
        this.list.splice(index, 1);
    }
}