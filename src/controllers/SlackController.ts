import {Controller, Body, Post} from 'routing-controllers';
import * as request from 'request';
import {IncomingMessage} from '../models/incoming.model';
import {OutcomingMessage} from '../models/outcoming.model';
import {unescape} from "querystring";

@Controller('/')
export class SlackController {

    @Post('')
    async post(@Body() message: IncomingMessage): Promise<string> {
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
            form: OutcomingMessage.inChannel(message.text).json()
        };

        if(message.text.startsWith('debug url')) {
            options.url = message.text.split('debug url').pop()
        }

        return new Promise<string>((resolve) => {
            request.post(message.response_url, options, () => resolve(''));
        });
    }

}
