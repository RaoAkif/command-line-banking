const readline = require('readline');

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

const input = () => new Promise((resolve, reject) => {
  rl.question('\n 👉Enter Your Choice: ', (choice) => {
    resolve(choice)
  })
})

const start = async () => {
  while (true) {
    const choice = await input()

    if (choice == 1) {
      console.log(`\n ✔️ Please Create a new Account`)
    } else if (choice == 2) {
      console.log(`\n ✔️ Please Deposit Money`)
    } else if (choice == 3) {
      console.log(`\n ✔️ Please Withdraw Money`)
    } else if (choice == 4) {
      console.log(`\n ✔️ Please Check Balance`)
    } else if (choice == 5) {
      console.log(`\n ✔️ Please Transfer Money`)
    } else {
      console.log(`Bye Bye`)
      process.exit()
    }
  }
}

start()
