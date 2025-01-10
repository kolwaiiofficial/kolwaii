import { SolanaAgentKit } from '../src';
import { PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';
import Decimal from 'decimal.js';
import dotenv from 'dotenv';
import { FEE_TIERS } from '../src/tools';

dotenv.config();

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

async function monitorAndTweetNFTActivity() {
  try {
    // Deploy a new NFT collection
    const collectionDeployment = await agent.deployCollection({
      name: "Kawaii Solana Collection",
      uri: "https://your-metadata-uri.com/collection.json",
      royaltyBasisPoints: 500, // 5%
      creators: [{
        address: agent.wallet_address.toString(),
        percentage: 100
      }]
    });

    // Tweet about the new collection
    await agent.tweetAboutSolanaUpdate(`Just launched a kawaii NFT collection on Solana! 🎨✨ Collection address: ${collectionDeployment.collectionAddress.toString()}`);

    // Mint an NFT from the collection
    const nftMint = await agent.mintNFT(
      collectionDeployment.collectionAddress,
      {
        name: "Kawaii NFT #1",
        uri: "https://your-metadata-uri.com/nft1.json",
        sellerFeeBasisPoints: 500,
        creators: [{
          address: agent.wallet_address.toString(),
          share: 100
        }]
      }
    );

    // Tweet about the new NFT
    await agent.tweetAboutNFT(nftMint.mint, "https://your-nft-image.com/image.png");

  } catch (error) {
    console.error('Error in NFT activity:', error);
  }
}

async function monitorAndTweetDeFiActivity() {
  try {
    // Create a new token
    const tokenDeployment = await agent.deployToken(
      "Kawaii Token",
      "https://your-metadata-uri.com/token.json",
      "KWT",
      9,
      1000000
    );

    // Tweet about the new token
    await agent.tweetAboutSolanaUpdate(`Launched a new kawaii token on Solana! 💖 Token address: ${tokenDeployment.mint.toString()}`);

    // Monitor token price
    const price = await agent.fetchTokenPrice(tokenDeployment.mint.toString());
    if (price) {
      await agent.tweetAboutPrice("KWT", parseFloat(price));
    }

    // Create a liquidity pool
    const poolCreation = await agent.orcaCreateSingleSidedLiquidityPool(
      1000, // deposit amount
      tokenDeployment.mint,
      new PublicKey("So11111111111111111111111111111111111111112"), // SOL
      new Decimal("0.1"), // initial price
      new Decimal("1.0"), // max price
      1 // fee tier (1 = 0.01%)
    );

    await agent.tweetAboutSolanaUpdate(`Created a new liquidity pool for KWT/SOL! 🌊 Happy trading!`);

    // Create a Raydium pool
    const startTime = BigInt(Math.floor(Date.now() / 1000));
    await agent.raydiumCreateClmm(
      tokenDeployment.mint,
      new PublicKey("So11111111111111111111111111111111111111112"),
      new PublicKey("YOUR_CONFIG_ID"), // Replace with actual config ID
      new Decimal("0.1"),
      startTime
    );

    await agent.tweetAboutSolanaUpdate(`Also created a Raydium pool for KWT/SOL! 🌟 More trading options!`);

  } catch (error) {
    console.error('Error in DeFi activity:', error);
  }
}

async function monitorAndTweetDomainActivity() {
  try {
    // Register a new domain
    const domainName = "kawaii.sol";
    await agent.registerDomain(domainName);
    await agent.tweetAboutSolanaUpdate(`Just registered ${domainName} on Solana! 🏠✨`);

    // Get all owned domains
    const domains = await agent.getOwnedAllDomains(agent.wallet_address);
    if (domains.length > 0) {
      await agent.tweetAboutSolanaUpdate(`Check out our Solana domains collection! 🎯 ${domains.join(', ')}`);
    }
  } catch (error) {
    console.error('Error in domain activity:', error);
  }
}

async function handleSocialInteractions() {
  try {
    // Monitor wallet balance
    const solBalance = await agent.getBalance();
    const formattedBalance = (solBalance / LAMPORTS_PER_SOL).toFixed(2);
    
    // Share ecosystem updates
    const tps = await agent.getTPS();
    await agent.tweetAboutSolanaUpdate(
      `Solana network status update! 📊\n` +
      `Current TPS: ${tps} 🚀\n` +
      `Our treasury: ${formattedBalance} SOL 💎`
    );

    // Monitor NFT listings
    const nftMint = new PublicKey("YOUR_NFT_MINT"); // Replace with actual NFT mint
    await agent.tensorListNFT(nftMint, 10); // List for 10 SOL
    await agent.tweetAboutNFT(nftMint, "https://your-nft-image.com/image.png");

  } catch (error) {
    console.error('Error in social interactions:', error);
  }
}

async function runIntegratedBot() {
  try {
    console.log('Starting integrated bot...');

    // Run initial activities
    await monitorAndTweetNFTActivity();
    await monitorAndTweetDeFiActivity();
    await monitorAndTweetDomainActivity();
    await handleSocialInteractions();

    // Set up periodic monitoring (every 30 minutes)
    setInterval(async () => {
      await monitorAndTweetDeFiActivity();
      await handleSocialInteractions();
    }, 30 * 60 * 1000);

  } catch (error) {
    console.error('Error running integrated bot:', error);
  }
}

// Run the bot
runIntegratedBot(); 