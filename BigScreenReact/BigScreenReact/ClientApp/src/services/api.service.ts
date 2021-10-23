import http from "./http-common";
export class GetInfo {
    words: string[];
}

const ApiService = {
    createGame(maxNumberOfWords: number): Promise<GetInfo> {
        return http.get("/game?numberOfWords=" + maxNumberOfWords);
        
    }
}

export default ApiService;