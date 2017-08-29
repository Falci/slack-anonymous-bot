export class OutcomingMessage {

  static direct(text: string): OutcomingMessage {
    let response = new OutcomingMessage();
    response.text = text;
    response.response_type = ResponseType.EPHEMERAL;

    return response;
  }

  static inChannel(text: string): OutcomingMessage {
    let response = new OutcomingMessage();
    response.text = text;
    response.response_type = ResponseType.IN_CHANNEL;

    return response;
  }

  public response_type: ResponseType;
  public text: string;
  public channel: string;
  public username: string = 'Anonymous Bot';
  public icon_emoji: string = ':bust_in_silhouette:';

  json(): string {
    return JSON.stringify(this);
  }
}

export enum ResponseType {
  EPHEMERAL = "ephemeral",
  IN_CHANNEL = "in_channel"
}