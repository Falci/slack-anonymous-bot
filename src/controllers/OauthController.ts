import {Controller, Res, QueryParam, Get} from 'routing-controllers';
import * as request from 'request';
import {IncomingMessage} from 'http';

const CLIENT_ID = process.env.CLIENT_ID,
  CLIENT_SECRET = process.env.CLIENT_SECRET,
  ACCESS_URL = 'https://slack.com/api/oauth.access';

@Controller('/oauth')
export class OauthController {

  @Get('/callback')
  async get(@QueryParam('code') code:string, @Res() res: any) {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      form: {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code
      }
    };

    request.post(ACCESS_URL, options, (error: any, httpResponse: IncomingMessage, body: any) =>{
      if (error || httpResponse.statusCode >= 300) {
        return res.redirect('/?error');
      }

      res.redirect('/?success');
    });
  }
}
