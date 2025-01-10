![image](https://github.com/user-attachments/assets/6939d719-1b00-48cf-beaa-9b10f0843506)
# Kawaii Solana Twitter Bot 🌸

A cute and powerful Twitter bot that integrates with the Solana blockchain, bringing Web3 updates with a kawaii personality! ✨

## Features 💫

- **NFT Operations** 🎨
  - Deploy NFT collections
  - Mint NFTs
  - List NFTs on Tensor
  - Automatic tweets about NFT activities

- **DeFi Integration** 💰
  - Token deployment
  - Liquidity pool creation (Orca & Raydium)
  - Price monitoring
  - Automated DeFi updates

- **Domain Management** 🏠
  - .sol domain registration
  - Domain tracking
  - Social sharing

- **Social Features** 💝
  - Kawaii personality
  - Network status updates
  - Ecosystem news
  - Automatic responses to mentions

## Prerequisites 📋

- Node.js >= 22.0.0
- pnpm >= 8.0.0
- Solana CLI tools
- Twitter Developer Account
- OpenAI API Key

## Installation 🚀

1. Clone the repository:
```bash
git clone https://github.com/yourusername/kawaii-solana-bot.git
cd kawaii-solana-bot
```

2. Install dependencies:
```bash
pnpm install
```

3. Create a `.env` file:
```env
PRIVATE_KEY=your_solana_wallet_private_key
RPC_URL=your_solana_rpc_url
TWITTER_API_KEY=your_twitter_api_key
TWITTER_API_SECRET=your_twitter_api_secret
TWITTER_ACCESS_TOKEN=your_twitter_access_token
TWITTER_ACCESS_SECRET=your_twitter_access_secret
OPENAI_API_KEY=your_openai_api_key
```

## Usage 🌟

1. Start the bot:
```bash
pnpm start
```

2. Run in development mode:
```bash
pnpm dev
```

3. Run tests:
```bash
pnpm test
```

## Configuration ⚙️

### Personality Customization

The bot's kawaii personality can be customized in `src/tools/twitter.ts`:

```typescript
const KAWAII_PERSONALITY: KawaiiPersonality = {
  emojis: ['✨', '💖', '🌸', '🎀', '💫', '🌟', '🍡', '🌈'],
  phrases: [
    'Nya~',
    'Kawaii desu!',
    'So exciting!',
    // Add your custom phrases
  ],
  interests: [
    'NFTs',
    'DeFi',
    'Solana ecosystem',
    // Add your interests
  ]
};
```

### Bot Activities

You can customize the bot's activities in `examples/integrated-bot.ts`:
- NFT collection deployment
- Token creation
- Liquidity pool management
- Social interactions
- Update frequencies

## Security 🔒

- Never commit your `.env` file
- Keep your private keys secure
- Follow Twitter's API usage guidelines
- Monitor your bot's activities

## Contributing 🤝

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License 📄

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

## Acknowledgments 🙏

- Solana Agent Kit
- Twitter API v2
- OpenAI
- Solana Foundation

## Support 💕

If you like this project, please give it a star ⭐️ and share it with your friends!
