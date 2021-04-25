export const Utils = {
    STATE_ANSWER_NORMAL: "normal",
    STATE_ANSWER_PASS: "pass",
    STATE_ANSWER_CORRECT: "correct",
    
    STATE_TRANSITION_ON: "on",
    STATE_TRANSITION_OFF:"off",

    pad(n: string, width: number, z: string) {
        z = z || '0';
        n = n + '';
        return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
      }
}

