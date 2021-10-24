import { trigger, state, style, transition, animate } from '@angular/animations';
import { Utils } from "../utils"

export const Animations = {
    slideInOut:  trigger('slideInOut', [
        state(Utils.STATE_TRANSITION_ON, style({ transform: 'translate(0%)' })),
        state(Utils.STATE_TRANSITION_OFF, style({ transform: 'translate(-150%)' })),
        
        transition('on => off', [
          animate("500ms 250ms ease-in", style({transform: 'translateX(150%)'})),
          animate("1ms", style({transform: 'translateX(-150%)'})),
  
        ]),
        transition('off => on', [
          animate("500ms 250ms ease-in", style({transform: 'translateX(0%)'})),
        ])
      ]),
    answer:  trigger("answer", [
        state(Utils.STATE_ANSWER_NORMAL, style({backgroundColor : "white" })),
        state(Utils.STATE_ANSWER_PASS, style({backgroundColor: "#dc3545", color: "white"})),
        state(Utils.STATE_ANSWER_CORRECT, style({backgroundColor : "#28a745", color: "white"})),
    ])
}