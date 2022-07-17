- [Important security notes](#important-security-notes)
- [Getting Started](#getting-started)
- [Environment Variables Configuration](#environment-variables-configuration)
- [Conversion rates](#conversion-rates)
- [Caviats](#caviats)

This project is a simple solution for payment in ETH tokens for premium points in any Tibia Private server. As most Tibia servers and their corresponding websites for buying premium points and managing user account and premium point balance are common templates, or even already prebuild sites, the goal here was to make ETH payment as simple as possible without using custom written smart contracts. (For more secure version with custom smart contaract for validation and payment navigate here :[WIP](#))

# Important security notes

This project doest not include Premium Points / EUR conversion rate validation and as most Tibia website templates use url query for passing data end user can manually interfare with value they should pay for specific number of premium points. Version with custom smart contract resolve this issue, but it require more in depth blockchain knowlendge (more on that here [WIP(#)]). For implementing conversion rates validation in this project navigate here: [Convertion Rates](#conversion-rates)

# Getting Started

1. Clone Project:

```bash
git clone https://github.com/jakub-jarzabek/tibia-web3
```

2. Enter project directory and run pnp install

```bash
cd tibia-web3 && pnpm install
```

3. Run project

```bash
pnp dev
```

# Environment Variables Configuration

Project needs to have some specific env configuration both for frontend and backend part:

| ENV                         | DESCRIPTION                                                               | USED IN          |
| --------------------------- | ------------------------------------------------------------------------- | ---------------- |
| NEXT_PUBLIC_NETWORK         | Chain id for moralis (e.g. 'eth' for ehtereum mainnet)                    | Frontent/Backend |
| NEXT_PUBLIC_SERVER_URL      | Moralis server url                                                        | Frontend/Backend |
| NEXT_PUBLIC_APP_ID          | Moralis application id                                                    | Frontend/Backend |
| PAYMENT_CONFIRMEND_ENDPOINT | Main Website Endpoint where payment confiramation data should be returned | Backend          |
| URL                         | Server core URL                                                           | Backend          |
| MAIL_USER                   | Username for gmail smtp for mailing after transaction                     | Backend          |
| MAIL_PASSWORD               | Password for gmail smtp for mailing after transaction                     | Backend          |

# Conversion rates

For Conversion rates validation you have three options, which none if perfect without using custom smart contract.

1. Implementing validation on frontend just before sending transaction (Can be tempered with)
2. Implementing validation on `/crypto-payment` endoint. (Cannot be tempered with, but in oreder to return already transfered tokens, additional transfer is required, that use additional gas as we cant use revert method outside of smartcontract)
3. Implementing validation on final main website endpoint (for which one path is stored in `PAYMENT_CONFIRMED_ENDPOINT` env). As above in order to return already transfered tokens new transaction must be created.

# Caviats

- Due to frontend getting information about transaction confirmation, only when backend intervals succesfully gets transaction receipt from initiated transaction, this request can time out even if tranasaction passes, when getting receipt is taking longer that usual. In that case frontend can display false information about transaction failure even if transaction passed and user gets both email with information about successful transaction and Premoum Points on his account.
