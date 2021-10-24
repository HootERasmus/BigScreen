import React from "react";
import ApiService, {GetInfo} from "./api.service";
import SignalRService from "./signal-r.service";

const { createContext, useContext } = React;

export interface IService {
    createGame: (maxNumberOfWords: number) => Promise<GetInfo>;
    startConnection: (func: () => void) => void;
    subscribeToReceiveMessage: (func: (message:string) => void) => void
    subscribeToAnswer: (func: (anwser: string, message: string) => void) => void
    subscribeToNewUser: (func: (userId: string) => void) => void
    getConnectionId: () => void
    addToGroup: (groupName: string) => void
    sendToUser: (groupName: string, user: string, message: string) => void
    SendToGroup: (groupName: string, anwser: string, message: string) => void
}

const service = new SignalRService
const api = new ApiService

const defaultState = {
    createGame: api.createGame,
    startConnection: service.startConnection,
    subscribeToReceiveMessage: service.subscribeToReceiveMessage,
    subscribeToAnswer: service.subscribeToAnswer,
    subscribeToNewUser: service.subscribeToNewUser,
    getConnectionId: service.getConnectionId,
    addToGroup: service.addToGroup,
    sendToUser: service.sendToUser,
    SendToGroup: service.SendToGroup
}

export const ServiceContext = createContext<IService>(defaultState)

export const useService = () => useContext(ServiceContext)
