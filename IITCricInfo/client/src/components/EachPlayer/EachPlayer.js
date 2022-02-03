import React, { Fragment } from "react";
import { useParams } from "react-router-dom";


const EachPlayer = () => {

    const { player_id } = useParams();
    return (
        <Fragment>
            <h1 className="text-center"> Player Stats</h1>
            player id : {player_id}
        </Fragment>
    );
}

export default EachPlayer;