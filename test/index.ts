import { SolanaAgentKit } from '../src';
import { PublicKey } from '@solana/web3.js';
import dotenv from 'dotenv';
import { describe, it, before } from 'mocha';
import assert from 'assert';

dotenv.config();

describe('Kawaii Solana Twitter Bot Tests', () => {
  let agent: SolanaAgentKit;

  before(() => {
    // Initialize the agent
    agent = new SolanaAgentKit(
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
  });

  describe('Wallet Operations', () => {
    it('should get wallet balance', async () => {
      const balance = await agent.getBalance();
      assert(balance >= 0, 'Balance should be non-negative');
    });
  });

  describe('Twitter Integration', () => {
    it('should tweet about network status', async () => {
      const tps = await agent.getTPS();
      const result = await agent.tweetAboutSolanaUpdate(`Testing Solana network status! Current TPS: ${tps} 🚀`);
      assert(result.includes('successfully'), 'Tweet should be sent successfully');
    });
  });

  describe('NFT Operations', () => {
    it('should deploy NFT collection', async () => {
      const collection = await agent.deployCollection({
        name: "Test Kawaii Collection",
        uri: "https://test-metadata-uri.com/collection.json",
        royaltyBasisPoints: 500,
        creators: [{
          address: agent.wallet_address.toString(),
          percentage: 100
        }]
      });
      assert(collection.collectionAddress instanceof PublicKey, 'Should return a valid collection address');
    });
  });

  describe('Token Operations', () => {
    it('should deploy token', async () => {
      const token = await agent.deployToken(
        "Test Token",
        "https://test-metadata-uri.com/token.json",
        "TEST",
        9,
        1000000
      );
      assert(token.mint instanceof PublicKey, 'Should return a valid mint address');
    });
  });

  describe('Domain Operations', () => {
    it('should get owned domains', async () => {
      const domains = await agent.getOwnedAllDomains(agent.wallet_address);
      assert(Array.isArray(domains), 'Should return an array of domains');
    });
  });
});

// Run tests
if (require.main === module) {
  describe('Running Kawaii Solana Twitter Bot Tests', () => {
    it('should complete all tests', async function() {
      this.timeout(60000); // Set timeout to 60 seconds
      // Tests will run automatically
    });
  });
}
