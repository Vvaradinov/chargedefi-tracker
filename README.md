# ChargeDefi Tracker
#### [tracker.chargedefi.fi/](http://tracker.chargedefi.fi/)

This project was created so I can easily track all of my investments across the different ChargeDefi vaults, farms and boardroom in one tab.

## Features
- Boardroom tracking
- Farms tracking
- Beefy Vaults tracking
- Basic protocol stats
- Expansion and Debt stats
- Estimated Daily Increases from Boardroom, Beefy Vault and Farms
- Protocol stats tracking for Expansion, Rebase and General TVL
- Earnings history stats at every epoch
- ROI calculator

## Development
If you want to fork and extend the functionality of this app all you have to do is install the dependencies.

It was build with [chakra-ui](https://github.com/chakra-ui/chakra-ui) and [web3-js](https://github.com/ChainSafe/web3.js)


Feel free to pick up anything from the roadmap or build any custom features, then submit a PR.
```sh
yarn install
```

And deploy with webpack...

```sh
yarn build
```

# Roadmap
### Investment Strategy Automations - (REPLACED by MoneyLegos):
- Farm 60/40 reinvest
- Boardroom 60/40 reinvest
- Custom % strategy
### Automated yield calculator
- Daily ✔️
- Weekly
- Total 
### Yield calendar tracking spreadsheet
- tracks the amount of LP increase each day ✔️
- tracks the dollar value change each day ✔️
- tracks protocol statistics each day ✔️

Essentially a nice table that will read and write to an Airtable or Google Sheet.

Ex. [example-manual-sheet](https://docs.google.com/spreadsheets/d/1zY-Jl4OWFvvKTSKNBZrfzOFRvNyIlThyaMMafctOkSg/edit#gid=0)

## License
MIT
