import React, { Fragment, useEffect, useState } from "react";
// useEffect is used to send fetch, everytime this is rendered
// useState is for variables storing ala... rerenders on change
import EditTodo from "./EditTodo";


const ListTodos = () => {

    const [todos, setTodos] = useState([]);


    // Delete Function

    const deleteTodo = async id => {
        try {
            const deleteTodo = await fetch(
                // temlpate string... to substitute values
                `http://localhost:5000/todos/${id}`, {
                method: "DELETE"
            });

            setTodos(todos.filter(todo => todo.todo_id !== id))
            // console.log(deleteTodo)

        } catch (error) {
            console.error(error.message);
        }
    }

    const getTodos = async () => {
        try {
            const response = await fetch("http://localhost:5000/todos")
            // Here, fetch defualt is GET. So, no further input
            const jsonData = await response.json()

            setTodos(jsonData);

        } catch (error) {

            console.error(error.message);
        };
    }

    // fetch, everytime rendered
    // Telling to do this effects, everytime the ListTodos is rendered...
    useEffect(() => {
        getTodos();
    }, []);

    // console.log(todos);


    return (
        <Fragment>
            <h1 className="text-center mt-5">
                List of TODOs
            </h1>
            <table className="table table-striped m-5 text-center">
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>

                    {/* <tr>
                        <td>John</td>
                        <td>Doe</td>
                        <td>john@example.com</td>
                    </tr> */}
                    {todos.map(todo => (
                        <tr key={todo.todo_id}>
                            <td>{todo.description}</td>
                            <td><EditTodo todo={todo} /></td>
                            <td><button className="btn btn-danger "
                                onClick={() => deleteTodo(todo.todo_id)}
                            >Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>


        </Fragment>
    );
};

export default ListTodos;