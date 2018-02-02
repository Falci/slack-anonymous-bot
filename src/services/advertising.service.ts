
export class AdvertisingService {
  private messageCount: number;
  private cache: string[];
  private resetCount = parseInt(process.env.AD_RESET, 10) || 100;

  constructor() {
    this.clearCache();
  }

  ad(senderId: string): string {
    this.messageCount++;

    if(this.messageCount % this.resetCount === 0) {
      this.clearCache();
    }

    if(this.cache.indexOf(senderId) === -1) {
      this.cache.push(senderId);
      return this.sendAdMessage();
    }

    return ''; // no ad this time
  }

  private clearCache() {
    this.messageCount = 0;
    this.cache = [];
  }

  private sendAdMessage(): string {
    return 'To show your support for Anonymous Bot, please consider <https://slackanonymous.herokuapp.com/donation.html|making a donation>';
  }
}