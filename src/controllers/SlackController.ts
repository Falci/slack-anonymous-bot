import {Controller, Body, Post} from 'routing-controllers';
import * as https from 'https';
import * as url from 'url';
import {IncomingMessage} from '../models/incoming.model';
import {OutcomingMessage} from '../models/outcoming.model';
import {AdvertisingService} from '../services/advertising.service';

@Controller('/')
export class SlackController {
    private adService: AdvertisingService;

    constructor() {
        this.adService = new AdvertisingService()
    }

    @Post('')
    post(@Body() message: IncomingMessage): string {
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

        const request = https.request(options);
        request.write(OutcomingMessage.inChannel(message.text).json());
        request.end();

        return this.adService.ad(message.user_id);
    }
}
