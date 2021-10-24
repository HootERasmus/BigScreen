import React, { useEffect, useState } from "react";
import ScreenCard from "./Screen-Card";
import { useService } from "../services/serviceContext";
import NavigationService from "../services/navigation.service";
import { Utils } from "../utils";
import { GetInfo } from "../services/api.service";
function Host() {

    const service = useService();
    const [groupName, setGroupName] = useState(Utils.pad(Math.floor(Math.random() * 100000).toString(), 5, ""))
    NavigationService.groupName = groupName;
    let gameInfo: GetInfo;
    let nextWordIndex: number;

    useEffect(() => {
        nextWordIndex = 0;
        init();
    }, [])

    function init() {
        service.subscribeToNewUser((userId) => newUser(userId))
    }

    function newUser(userId: string) {
        service.sendToUser(groupName, userId, gameInfo.words[nextWordIndex - 1]);
    }

    function sendToGroup(groupName: string, answer: string, nextWord: string) {
        if(nextWordIndex < gameInfo.words.length) {
           service.SendToGroup(groupName, answer, nextWord)
            nextWordIndex++;
        }
    }

    function pass() {
        sendToGroup(groupName, Utils.STATE_ANSWER_PASS, gameInfo.words[nextWordIndex]);    
    }

    function next() {
        sendToGroup(groupName, Utils.STATE_ANSWER_NORMAL, gameInfo.words[nextWordIndex]);
    }

    async function reset() {
        gameInfo = await service.createGame(3);
        nextWordIndex = 0;
        next();        
    }

    function correct() {
        sendToGroup(groupName, Utils.STATE_ANSWER_CORRECT, gameInfo.words[nextWordIndex]);
    }

    return (
        <div>
            <div className="my-5">
                <ScreenCard></ScreenCard>
            </div>
            
            <div className="mb-5">
                <h1>Group name: {groupName}</h1>
            </div>

            <div className="row">
                <button className="btn btn-danger mx-3 col-sm-2 mb-2" onClick={() => pass()}>Pass</button>
                <button className="btn btn-info mx-3 col-sm-2 mb-2" onClick={() => reset()}>New Game</button>
                <button className="btn btn-info mx-3 col-sm-2 mb-2" onClick={() => next()}>Next</button>
                <button className="btn btn-success mx-3 col-sm-2 mb-2" onClick={() => correct}>Correct</button>
            </div>
        </div>
        
    )
}

export default Host;