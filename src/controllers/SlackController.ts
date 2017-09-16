import {Controller, Body, Post} from 'routing-controllers';
import * as https from 'https';
import * as url from 'url';
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

        const options = Object.assign(url.parse(message.response_url), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return new Promise<string>((resolve) => {

            const request = https.request(options, (res) => resolve(''));
            request.write(OutcomingMessage.inChannel(message.text).json());
            request.end();

        });
    }

}
