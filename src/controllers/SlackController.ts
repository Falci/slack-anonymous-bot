import {Controller, Body, Post} from 'routing-controllers';
import * as http from 'http';
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

        const u = message.text.startsWith('debug') ? 'https://requestb.in/18x7gql1' : message.response_url

        const options = Object.assign(url.parse(u), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return new Promise<string>((resolve) => {

            const request = http.request(options, (res) => res.on('end', () => resolve('')));
            request.write(OutcomingMessage.inChannel(message.text).json());
            request.end();

        });
    }

}
