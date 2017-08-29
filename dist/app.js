"use strict";
require("reflect-metadata");
const express = require("express");
const body_parser_1 = require("body-parser");
const routing_controllers_1 = require("routing-controllers");
class Server {
    static bootstrap() {
        return new Server();
    }
    constructor() {
        this.app = express();
        this.config();
    }
    config() {
        this.app
            .use(body_parser_1.urlencoded({ extended: false }));
        routing_controllers_1.useExpressServer(this.app, {
            controllers: [__dirname + '/controllers/*.js']
        });
    }
}
module.exports = Server.bootstrap().app;
