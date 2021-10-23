import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

export class PostInfo {
  gameId = -1;
  maxNumberOfWords = -1;
}

export class GetInfo {
  words: string[];
}

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  private urlBase: string;
  
  constructor(private http: HttpClient) {
    this.urlBase = "http://localhost:5000/api"
   }
  

  public async createGame(maxNumberOfWords: number ): Promise<GetInfo> {
    return await this.http.get<GetInfo>(this.urlBase + "/game?numberOfWords=" + maxNumberOfWords).toPromise()
  }
}
