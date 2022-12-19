const readline = require('readline');
const {
  createNewAccount,
  withdrawMoney,
  depositMoney,
  transferMoney,
  accountBalance,
} = require('./db')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log("😃Welcome To Banking Application😃");
console.log("\n 1. Create new account")
console.log("\n 2. Deposit Money")
console.log("\n 3. Withdraw Money")
console.log("\n 4. Check Balance")
console.log("\n 5. Transfer Money")
console.log("\n 6. Exit")

const input = (message) => new Promise((resolve, reject) => {
  rl.question(`\n 👉 ${message}: `, (choice) => {
    resolve(choice)
  })
})

const start = async () => {
  while (true) {
    const choice = await input("Enter Your Choice")

    if (choice == 1) {
      console.log(`\n ✔️ Please Create a new Account`)

      const accountId = parseInt(await input(`\n ✔️ Please select your Account ID`))
      const accountName = await input("\n ✔️ Please select your Account Name")
      const accountBalance = parseInt(await input("\n ✔️ Please Add Balance in Your Account"))

      createNewAccount({ id: accountId, acc_name: accountName, acc_balance: accountBalance })

    } else if (choice == 2) {
      console.log(`\n ✔️ Please Deposit Money`)

      const accountId = parseInt(await input("\n ✔️ Please select your Account ID"))
      const balanceToAdd = parseInt(await input("\n ✔️ Please Add Balance in Your Account"))

      withdrawMoney({ id: accountId, amount: balanceToAdd })

      
    } else if (choice == 3) {
      console.log(`\n ✔️ Please Withdraw Money`)

      const accountId = parseInt(await input("\n ✔️ Please select your Account ID"))
      const amountToWithdraw = parseInt(await input("\n ✔️ Please Add Balance in Your Account"))

      depositMoney({ id: accountId, amount: amountToWithdraw })

    } else if (choice == 4) {
      console.log(`\n ✔️ Please Check Balance`)

      const accountId = parseInt(await input("\n ✔️ Please select your Account ID"))

      accountBalance({ id: accountId })

    } else if (choice == 5) {
      console.log(`\n ✔️ Please Transfer Money`)

      const myAccountId = parseInt(await input("\n ✔️ Please select your Account ID"))
      const recieverId = parseInt(await input("\n ✔️ Please select Account ID of Reciever's Account"))
      const amountToTransfer = parseInt(await input("\n ✔️ Please tell the Amount to transfer"))

      transferMoney({id: myAccountId, recieverId: recieverId, amount: amountToTransfer})

    } else {
      console.log(`Bye Bye`)
      process.exit()
    }
  }
}

start()
