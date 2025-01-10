import { SolanaAgentKit } from '../src';
import { PublicKey } from '@solana/web3.js';
import dotenv from 'dotenv';

dotenv.config();

// Initialize the Solana Agent Kit with Twitter integration
const agent = new SolanaAgentKit(
  process.env.PRIVATE_KEY!,
  process.env.RPC_URL!,
  null,
  {
    apiKey: process.env.TWITTER_API_KEY!,
    apiSecret: process.env.TWITTER_API_SECRET!,
    accessToken: process.env.TWITTER_ACCESS_TOKEN!,
    accessSecret: process.env.TWITTER_ACCESS_SECRET!,
    openaiApiKey: process.env.OPENAI_API_KEY!,
  }
);

async function runExample() {
  try {
    // Example 1: Tweet about an NFT
    const nftAddress = new PublicKey('YOUR_NFT_ADDRESS');
    await agent.tweetAboutNFT(nftAddress);

    // Example 2: Tweet about a token price
    await agent.tweetAboutPrice('SOL', 123.45);

    // Example 3: Tweet about a Solana ecosystem update
    await agent.tweetAboutSolanaUpdate('New DeFi protocol launched on Solana! 🚀');

    // Example 4: Respond to a mention
    await agent.respondToMention('TWEET_ID', 'What do you think about the latest NFT trends?');

  } catch (error) {
    console.error('Error running example:', error);
  }
}

// Add required environment variables to .env file:
// PRIVATE_KEY=your_solana_wallet_private_key
// RPC_URL=your_solana_rpc_url
// TWITTER_API_KEY=your_twitter_api_key
// TWITTER_API_SECRET=your_twitter_api_secret
// TWITTER_ACCESS_TOKEN=your_twitter_access_token
// TWITTER_ACCESS_SECRET=your_twitter_access_secret
// OPENAI_API_KEY=your_openai_api_key

runExample(); 