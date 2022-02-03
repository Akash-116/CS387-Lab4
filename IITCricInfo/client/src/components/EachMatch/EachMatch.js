import React, { Fragment, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Scorecard from "./Scorecard";

const EachMatch = () => {

    const { match_id } = useParams();
    const serverIp = "http://localhost:5000"

    const [matchDetail, setMatchDetail] = useState({});

    const getMatch = async () => {
        try {
            const response = await fetch(
                serverIp + "/matches/" + match_id
            );
            const jsonData = await response.json();
            setMatchDetail(jsonData)

        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        getMatch();
    }, []);


    return (
        <Fragment>
            Team {matchDetail.team1} vs Team {matchDetail.team2}
            <br></br>
            Win Margin = {matchDetail.win_margin}

            <Scorecard />

        </Fragment>
    );
}

export default EachMatch;

