import Todo from './todoClass.js';
import Project from './projectClass.js';

export default function display() {
    const todo1 = new Todo('title', 'description', 'dueDate', 'priority', true);
    const todo2 = new Todo('title', 'description', 'dueDate', 'priority');

    const project1 = new Project('title', 'description');
    project1.addTodo(todo1);
    project1.addTodo(todo2);

    console.log(project1);
}