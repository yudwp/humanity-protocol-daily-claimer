# Humanity Protocol Daily Claimer

<div align="center">
  <h3>Automate your daily reward claims on the Humanity Protocol Testnet!</h3>
</div>

## 🚀 Introduction

**Humanity Protocol Daily Claimer** is a Node.js bot that automatically checks and claims daily rewards from the Humanity Protocol Testnet. It uses [Web3.js](https://github.com/ChainSafe/web3.js) to interact with smart contracts and is optimized for simplicity, automation, and security.

---

## ✨ Features

- 🔁 **Automated Claiming** – No more manual claiming! The bot checks and claims rewards for each account.
- 📦 **Multi-Account Support** – Handles multiple private keys via a file.
- 🧠 **Smart Logging** – Colored logs for success, errors, and timestamps using `chalk`.
- 🔐 **Local Signing** – All transactions are signed locally to keep your keys safe.
- ⏲️ **Looping Interval** – Repeats every 6 hours by default.

---

## ⚙️ Requirements

- Node.js v14 or higher
- `npm` or `yarn`
- Humanity Protocol-compatible RPC endpoint
- List of private keys

---

## 🧪 Installation

```bash
git clone https://github.com/yudwp/humanity-protocol-daily-claimer.git
cd humanity-protocol-daily-claimer
npm install
```

---

## 🛠️ Configuration

Create a file `private_keys.txt` with each private key on a new line:

```
PRIVATE_KEY_1
PRIVATE_KEY_2
...
```

> 🔒 **Warning**: Keep your private keys secure and never share them.

---

## 🧰 Usage

Run the bot using:

```bash
node index.js
```

---

## 🤝 Contributing

Contributions, issues and feature requests are welcome!  
Feel free to check the [issues page](https://github.com/yudwp/humanity-protocol-daily-claimer/issues) or submit a PR.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 📬 Contact

- Telegram: [@Kijita64](https://t.me/Kijita64)
- GitHub: [@yudwp](https://github.com/yudwp)

---

<div align="center">
  <strong>Happy claiming and stay decentralized! 🌍</strong>
</div>
