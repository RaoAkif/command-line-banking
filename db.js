const { Client } = require('pg');

const client = new Client({
  host: 'localhost',
  user: 'postgres',
  password: '12345',
  database: 'cli-bank',
  port: 5432,
})

const connect = async () => await client.connect()

try {
  connect()
  console.log(`✔️   Connected Successfully`)
} catch (error) {
  console.log(`❌  Error in Connectivity`)
  console.log(error)
}

/* FUNCTIONALITY OF BANK APP
    1. Creating New Account
    2. Withdraw Money from Account
    3. Deposit Money in the Account
    4. Transfer Money in another Account
*/

/* Creating New Account */
const createNewAccount = ({ id, acc_name, acc_balance }) => {
  client.query(`INSERT INTO account VALUES ($1, $2, $3)`, [id, acc_name, acc_balance], (error, res) => {
    if (error) {
      console.log(`❌ Problem in Creating an Account`)
      console.log(error)
    } else {
      console.log(`Your Account has been Created Successfully. \n
      Your Account Details are following: \n
      - Account ID: ${id}, \n
      - Account Name: ${acc_name}, \n
      - Account Balance: ${acc_balance}`)
    }
  })
}

const withdrawMoney = ({ id, amount }) => {
  client.query(`SELECT acc_balance FROM account WHERE id = $1`, [id], (error, res) => {
    const balance = parseFloat(res.rows[0].acc_balance)
    console.log(`Your Existing Balance is ${balance}`)
    console.log(`typeof balance is  ${typeof balance}`)

    const newBalance = balance - amount

    client.query(`UPDATE account SET acc_balance = $1 WHERE id = $2`, [newBalance, id], (error, res) => {
      if (error) console.log(`❌  Problem withDrawing Money`)
      else console.log(`✔️  Amount ${amount} withdrawn Successfully. Your New Balance is ${newBalance}`)
      console.log(res)
    })
  })
}

const depositMoney = ({ id, amount }) => {
  client.query(`SELECT acc_balance FROM account WHERE id = $1`, [id], (error, res) => {
    const balance = parseFloat(res.rows[0].acc_balance)
    console.log(`Your Existing Balance is ${balance}`)

    const newBalance = balance + amount

    client.query(`UPDATE account SET acc_balance = $1 WHERE id = $2`, [newBalance, id], (error, res) => {
      if (error) console.log(`❌  Problem depositing Money`)
      else console.log(`✔️  Amount ${amount} deposited Successfully. Your New Balance is ${newBalance}`)
      console.log(res)
    })
  })
}

const transferMoney = ({ id, recieverId, amount }) => {
  withdrawMoney({ id: id, amount })
  depositMoney({ id: recieverId, amount })
}

const accountBalance = ({ id }) => {
  client.query(`SELECT acc_balance FROM account WHERE id = $1`, [id], (error, res) => {
    if (error) console.log(`❌  Problem withDrawing Money`)
    else {
      const balance = parseFloat(res.rows[0].acc_balance)
      console.log(`Your Account Balance is ${balance}`)
    }
  })
}

// createNewAccount({id: 8, acc_name: 'raoakif8', acc_balance: 500})
// withdrawMoney({ id: 2, amount: 10 })
// depositMoney({ id: 3, amount: 10 })
// transferMoney({id: 3, recieverId: 4, amount: 10})
// accountBalance({ id: 3 })

module.exports = {
  createNewAccount,
  withdrawMoney,
  depositMoney,
  transferMoney,
  accountBalance,
}