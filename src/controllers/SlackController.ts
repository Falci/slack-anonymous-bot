import {Controller, Body, Post} from 'routing-controllers';
import * as request from 'request';
import {IncomingMessage} from '../models/incoming.model';
import {OutcomingMessage, ResponseType} from '../models/outcoming.model';
import {escape, unescape} from "querystring";

@Controller('/')
export class SlackController {

    @Post('')
    post(@Body() message: IncomingMessage): any {

        if(message.channel_name === 'directmessage') {
            return 'I can\'t be anonymous here!';
        }

        if(message.text === 'help') {
            return 'Hi, I\'m the Anonymous Bot.\n\n' +
              'Whenever you want to send an anonymous message, go to the channel and type `/anon <message>`\n\n' +
              'Example:\n' +
              '/anon Hello!';
        }

        const options: request.Options = {
            url: message.response_url,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            form: OutcomingMessage.inChannel(escape(message.text)).json()
        };

        request.post(message.response_url, options);

        return '';
    }

}
