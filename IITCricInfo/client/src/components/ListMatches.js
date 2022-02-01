import React, { Fragment, useEffect, useState } from "react";
import $ from "jquery";

const ListMatches = () => {

    const [matches, setMatches] = useState([]);
    const serverIp = "http://localhost:5000"

    const getMatches = async () => {
        try {
            const response = await fetch(
                serverIp + "/matches"
            );
            const jsonData = await response.json();

            setMatches(jsonData);

        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        getMatches();
    }, []);


    return (
        <Fragment>
            <h1 className="text-center mt-5">
                List of All matches </h1>
            <table id="allMatchesTable" class="table table-dark table-striped">
                <thead>
                    <tr>
                        <th>MatchId</th>
                        <th>Team1</th>
                        <th>Team2</th>
                    </tr>
                </thead>
                <tbody>
                    {/* <tr>
                        <td>John</td>
                        <td>Doe</td>
                        <td>john@example.com</td>
                    </tr> */}
                    {matches.map(match => (
                        <tr key={match.match_id}>
                            <td>{match.match_id}</td>
                            <td>{match.team1}</td>
                            <td>{match.team2}</td>
                            {/* <td><button className="btn btn-danger "
                                onClick={() => deleteTodo(todo.todo_id)}
                            >Delete</button></td> */}
                        </tr>
                    ))}

                </tbody>
            </table>

        </Fragment>
    );
}

export default ListMatches;