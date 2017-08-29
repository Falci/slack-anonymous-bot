"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class OutcomingMessage {
    constructor() {
        this.username = 'Anonymous Bot';
        this.icon_emoji = ':bust_in_silhouette:';
    }
    static direct(text) {
        let response = new OutcomingMessage();
        response.text = text;
        response.response_type = ResponseType.EPHEMERAL;
        return response;
    }
    static inChannel(text) {
        let response = new OutcomingMessage();
        response.text = text;
        response.response_type = ResponseType.IN_CHANNEL;
        return response;
    }
    json() {
        return JSON.stringify(this);
    }
}
exports.OutcomingMessage = OutcomingMessage;
var ResponseType;
(function (ResponseType) {
    ResponseType["EPHEMERAL"] = "ephemeral";
    ResponseType["IN_CHANNEL"] = "in_channel";
})(ResponseType = exports.ResponseType || (exports.ResponseType = {}));
