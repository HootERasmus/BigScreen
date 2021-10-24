import React, {useEffect, useState} from 'react'
import { Utils } from '../utils';
import './card.css';
interface ICard {
    cardMessage: string;
    answerState: string;
}

function Card(props: ICard) {
    const [color, setColor] = useState("background-normal");

    useEffect(() => {
        switch(props.answerState) {
            case Utils.STATE_ANSWER_NORMAL:
                setColor("background-normal");
                break;

            case Utils.STATE_ANSWER_PASS:
                setColor("background-pass");
                break;

            case Utils.STATE_ANSWER_CORRECT:
                setColor("background-correct");
                break;
        }
    })

    return (
        <div className="row text-center h-100 px-5">
            <div className={color + " card col-sm-12 shadow"}> 
                <div className="card-body text-center center-my-text">
                    <h1>{props.cardMessage}</h1>
                </div>
            </div>
        </div> 
    )    

};

export default Card;