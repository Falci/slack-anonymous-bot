"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const routing_controllers_1 = require("routing-controllers");
const request = require("request");
const incoming_model_1 = require("../models/incoming.model");
const outcoming_model_1 = require("../models/outcoming.model");
let SlackController = class SlackController {
    post(message) {
        if (message.channel_name === 'directmessage') {
            return 'I can\'t be anonymous here!';
        }
        const options = {
            url: 'https://hooks.slack.com/services/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',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            form: outcoming_model_1.OutcomingMessage.inChannel(message.text).json()
        };
        request.post(message.response_url, options);
        return '';
    }
    get(m) {
        return m;
    }
};
__decorate([
    routing_controllers_1.Post(''),
    __param(0, routing_controllers_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [incoming_model_1.IncomingMessage]),
    __metadata("design:returntype", Object)
], SlackController.prototype, "post", null);
__decorate([
    routing_controllers_1.Get(''),
    __param(0, routing_controllers_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], SlackController.prototype, "get", null);
SlackController = __decorate([
    routing_controllers_1.Controller('/')
], SlackController);
exports.SlackController = SlackController;
