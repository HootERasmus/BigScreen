import React from "react";
import { useHistory } from 'react-router-dom'
import JoinGroup from "./JoinGroup";
import { useService } from "../services/serviceContext";

function Home() {
    const history = useHistory();
    useService().startConnection(() => {});

    function handleClick(path: string) {
        history.push(path);
    }

    return(
        <div>
            <JoinGroup></JoinGroup>
            <div className="row">
              <button className="btn btn-secondary btn-sm mx-3 col-sm-2 mt-5" onClick={() => handleClick('/host')}>Host</button>
            </div>
        </div>
    )
}

export default Home;