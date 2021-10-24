import React, {useEffect, useState, forwardRef, useImperativeHandle} from 'react'
import { Utils } from '../utils';

interface ICard {
    cardMessage: string;
    answerState: string;
    // movementState: string;
}

interface ICardUseState {
    setCardMessate: React.Dispatch<React.SetStateAction<string>>
    setAnswerState: React.Dispatch<React.SetStateAction<string>>
}

const Card = forwardRef((props: ICard, ref) => {
    
    // useEffect(() => {
    //     props.cardMessage = "Tester"
    //     props.answerState = Utils.STATE_ANSWER_NORMAL
    // }, [])

    return (
        <div className="row text-center h-100 px-5">
            <div className="card col-sm-12 shadow"> 
            {/* [@slideInOut]="movementState" [@answer]="answerState" */}
                <div className="card-body text-center center-my-text">
                    <h1>{props.cardMessage}</h1>
                </div>
            </div>
        </div> 
    )    

});

export default Card;