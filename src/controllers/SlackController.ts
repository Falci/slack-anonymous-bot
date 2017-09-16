import {Controller, Body, Post} from 'routing-controllers';
import * as request from 'request';
import {IncomingMessage} from '../models/incoming.model';
import {OutcomingMessage} from '../models/outcoming.model';

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
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            form: OutcomingMessage.inChannel(message.text).json()
        };

        return new Promise<string>((resolve) => {
            request.post('https://requestb.in/1l6e2yx1' /*message.response_url*/, options, (a, b, c) => console.log(c) || resolve(''));
        });
    }

}
