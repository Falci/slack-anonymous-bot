/// <reference path='../typings/index' />

import 'reflect-metadata';
import * as express from 'express';
import { urlencoded } from 'body-parser';
import * as dexter from 'morgan';
import { Application } from 'express';
import { useExpressServer } from 'routing-controllers';

class Server {

  public app: Application;

  public static bootstrap(): Server {
    return new Server();
  }

  constructor() {
    this.app = express();
    this.config();
  }

  private config() {
    this.app
      .use(dexter('dev'));

    this.app.
      use(express.static(`${__dirname}/public`));

    this.app
      .use('/', (req, res) => res.sendfile(`${__dirname}/public/index.html`))

    this.app
      .use(urlencoded({ extended: false }));

    useExpressServer(this.app, {
      controllers: [__dirname + '/controllers/*.js']
    });
  }
}

export = Server.bootstrap().app;
