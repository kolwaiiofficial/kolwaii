import { TwitterApi } from 'twitter-api-v2';
import { PublicKey } from '@solana/web3.js';
import { Configuration, OpenAIApi } from 'openai';

interface KawaiiPersonality {
  emojis: string[];
  phrases: string[];
  interests: string[];
}

const KAWAII_PERSONALITY: KawaiiPersonality = {
  emojis: ['✨', '💖', '🌸', '🎀', '💫', '🌟', '🍡', '🌈'],
  phrases: [
    'Nya~',
    'Kawaii desu!',
    'So exciting!',
    'Let\'s explore Web3 together!',
    'Blockchain magic~',
    'Solana power!',
  ],
  interests: [
    'NFTs',
    'DeFi',
    'Solana ecosystem',
    'Web3 gaming',
    'DAOs',
    'Crypto art',
  ],
};

export class Web3KawaiiTwitterBot {
  private twitter: TwitterApi;
  private openai: OpenAIApi;
  private personality: KawaiiPersonality;

  constructor(
    twitterApiKey: string,
    twitterApiSecret: string,
    twitterAccessToken: string,
    twitterAccessSecret: string,
    openaiApiKey: string
  ) {
    this.twitter = new TwitterApi({
      appKey: twitterApiKey,
      appSecret: twitterApiSecret,
      accessToken: twitterAccessToken,
      accessSecret: twitterAccessSecret,
    });

    const configuration = new Configuration({
      apiKey: openaiApiKey,
    });
    this.openai = new OpenAIApi(configuration);
    this.personality = KAWAII_PERSONALITY;
  }

  private getRandomElement<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
  }

  private async generateKawaiiResponse(topic: string): Promise<string> {
    const prompt = `As a kawaii crypto enthusiast, write a short, cute tweet about ${topic}. Include emojis and keep it under 280 characters.`;
    
    try {
      const response = await this.openai.createCompletion({
        model: "text-davinci-003",
        prompt,
        max_tokens: 60,
        temperature: 0.7,
      });

      return response.data.choices[0].text?.trim() || this.getRandomElement(this.personality.phrases);
    } catch (error) {
      console.error('Error generating response:', error);
      return this.getRandomElement(this.personality.phrases);
    }
  }

  async tweetAboutNFT(nftAddress: PublicKey, imageUrl?: string): Promise<string> {
    const message = await this.generateKawaiiResponse('NFT');
    const tweet = `${message} ${this.getRandomElement(this.personality.emojis)} Check out this NFT: ${nftAddress.toString()}`;
    
    try {
      if (imageUrl) {
        const mediaId = await this.twitter.v1.uploadMedia(imageUrl);
        await this.twitter.v2.tweet({ text: tweet, media: { media_ids: [mediaId] } });
      } else {
        await this.twitter.v2.tweet(tweet);
      }
      return 'Tweet sent successfully!';
    } catch (error) {
      console.error('Error sending tweet:', error);
      throw new Error('Failed to send tweet');
    }
  }

  async tweetAboutPrice(tokenSymbol: string, price: number): Promise<string> {
    const message = await this.generateKawaiiResponse(`${tokenSymbol} price`);
    const tweet = `${message} ${this.getRandomElement(this.personality.emojis)} ${tokenSymbol}: $${price.toFixed(2)}`;
    
    try {
      await this.twitter.v2.tweet(tweet);
      return 'Price tweet sent successfully!';
    } catch (error) {
      console.error('Error sending tweet:', error);
      throw new Error('Failed to send tweet');
    }
  }

  async tweetAboutSolanaUpdate(update: string): Promise<string> {
    const message = await this.generateKawaiiResponse('Solana ecosystem');
    const tweet = `${message} ${this.getRandomElement(this.personality.emojis)} ${update}`;
    
    try {
      await this.twitter.v2.tweet(tweet);
      return 'Solana update tweet sent successfully!';
    } catch (error) {
      console.error('Error sending tweet:', error);
      throw new Error('Failed to send tweet');
    }
  }

  async respondToMention(mentionId: string, content: string): Promise<string> {
    const response = await this.generateKawaiiResponse(content);
    const tweet = `${response} ${this.getRandomElement(this.personality.emojis)}`;
    
    try {
      await this.twitter.v2.reply(tweet, mentionId);
      return 'Reply sent successfully!';
    } catch (error) {
      console.error('Error sending reply:', error);
      throw new Error('Failed to send reply');
    }
  }
} 