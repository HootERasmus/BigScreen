import React, {useEffect, useRef, useState} from 'react'
import Card from './Card';
import { IService, useService } from '../services/serviceContext';
import { Utils } from '../utils';
import NavigationService from '../services/navigation.service';

function ScreenCard() {
    const service = useService();
    let groupName: string;
  
    const [card1Message, setCard1Message] = useState("Welcome!");
    const [card2Message, setCard2Message] = useState("2");
    const [card1State, setCard1State] = useState(Utils.STATE_TRANSITION_ON);
    const [card2State, setCard2State] = useState(Utils.STATE_TRANSITION_OFF);
    const [card1AnswerState, setCard1AnswerState] = useState(Utils.STATE_ANSWER_NORMAL);
    const [card2AnswerState, setCard2AnswerState] = useState(Utils.STATE_ANSWER_NORMAL);

    useEffect(() => {
        service.subscribeToAnswer((answer, message) => toggle(answer, message));
        service.subscribeToReceiveMessage((message) => setHost(message))
        groupName = NavigationService.groupName;
        service.addToGroup(groupName);
    }, [])
    
    function setHost(message: string) {
        toggle(Utils.STATE_ANSWER_NORMAL, message);
    }
    
    function toggle(answer: string, message: string) {
        setAnswerState(answer);
        resetOldAnswerState();

        // switch (card1State) {
        //     case Utils.STATE_TRANSITION_ON: 
        //         setCard1State(Utils.STATE_TRANSITION_OFF);
        //         setCard2State(Utils.STATE_TRANSITION_ON);
        //         setCard2Message(message)
        //         break;

        //     case Utils.STATE_TRANSITION_OFF:
        //         setCard1State(Utils.STATE_TRANSITION_ON);
        //         setCard1Message(message)
        //         setCard2State(Utils.STATE_TRANSITION_OFF);
        //         break;

        //     default:
        //         break;
        // }

        setCard1Message(message);
    }
    
    function resetOldAnswerState() {
        if(card1State === Utils.STATE_TRANSITION_ON) {
            setCard2AnswerState(Utils.STATE_ANSWER_NORMAL);
        } else {
            setCard1AnswerState(Utils.STATE_ANSWER_NORMAL);
        }
    }
     
    function setAnswerState(anwserState: string) {
        if(card1State === Utils.STATE_TRANSITION_ON) {
            setCard1AnswerState(Utils.STATE_ANSWER_NORMAL);
        } else {
            setCard2AnswerState(Utils.STATE_ANSWER_NORMAL);
        }
    }

    return (
        <div className='grid-container'>
            <div className='grid'>
                <div className='card1'>
                    <Card cardMessage={card1Message} answerState={card1State}></Card>
                </div>
                {/* <div className='card2'>
                    <Card cardMessage={card2Message} answerState={card2State}></Card>
                </div> */}
            </div>
        </div>
    )
}

export default ScreenCard;
