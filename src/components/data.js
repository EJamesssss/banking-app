const sampleUser = 'danica'

const expenseData = JSON.parse(localStorage.getItem('trxhistory'))

const withdraws = []
const deposits = []
const transfers = []
const epenses = []

for (let trtype = 0; trtype < expenseData.length; trtype++) {
    if(sampleUser == expenseData[trtype].sourceaccount){
        if(expenseData[trtype].type == 'withdraw'){
            const amnt = parseFloat(expenseData[trtype].trxamount)
            withdraws.push(amnt)
        }else if(expenseData[trtype].type == 'deposit'){
            const amnt = parseFloat(expenseData[trtype].trxamount)
        }else if(expenseData[trtype].type == 'transfer'){
            const amnt = parseFloat(expenseData[trtype].trxamount)
        }else if(expenseData[trtype].type == 'expense'){
            const amnt = parseFloat(expenseData[trtype].trxamount)
        }
    }
    
}