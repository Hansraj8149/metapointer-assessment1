class GooglePayClone {
    constructor() {
        this.users = {};
        this.transactions = [];
    }

    login(phoneNum) {
        if (!this.users[phoneNum]) {
            const initialAmount = parseFloat(prompt("Welcome! Add initial amount to your wallet: "));
            this.users[phoneNum] = { phoneNum, availableAmount: initialAmount };
        }
        return this.users[phoneNum];
    }

    transferAmount(sender, recipient, amount) {
        if (sender.availableAmount < amount) {
            console.log("Insufficient balance. Transaction failed.");
            return;
        }

        sender.availableAmount -= amount;
        recipient.availableAmount += amount;

        let cashbackPercentage = 0;
        if (amount % 500 === 0) {
            console.log("Better luck next time! No cashback for multiples of 500.");
        } else {
            cashbackPercentage = amount < 1000 ? 5 : 2;
            const cashbackAmount = (cashbackPercentage / 100) * amount;
            sender.availableAmount += cashbackAmount;
            console.log(`You got ${cashbackPercentage}% cashback: ${cashbackAmount} added to your wallet.`);
        }

        const transaction = { from: sender.phoneNum, to: recipient.phoneNum, amount, cashback: cashbackPercentage };
        this.transactions.push(transaction);
        console.log("Transaction successful!");
    }

    displayTransactionList(phoneNum) {
        const userTransactions = this.transactions.filter(t => t.from === phoneNum || t.to === phoneNum);
        console.log("\nTransaction List:");
        userTransactions.forEach(transaction => {
            console.log(transaction);
        });
    }

    displayWalletBalance(phoneNum) {
        console.log(`Available Amount: ${this.users[phoneNum].availableAmount}`);
    }
}

