import http from "./http-common";
export class GetInfo {
    words = [''];
}

class ApiService {
    createGame(maxNumberOfWords: number): Promise<GetInfo> {
        return http.get<GetInfo>("/game?numberOfWords=" + maxNumberOfWords).then(res => res.data);
    }
}

export default ApiService;