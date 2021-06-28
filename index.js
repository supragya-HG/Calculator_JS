const calculator = document.querySelector(".calculator")
const keys = calculator.querySelector(".calc_keys")
const display = document.querySelector('.display')

keys.addEventListener("click", e => {
 if (e.target.matches("button")) {
    const key = e.target
    const action = key.dataset.action
    const keyContent = key.textContent
    const displayedNum = display.textContent
    const previousKey = calculator.dataset.previousKey

    console.log(key,action)
    console.log(keyContent,displayedNum)
    if (!action) {
        console.log('number key!')
        calculator.dataset.previousKey = 'num'
        if(displayedNum ==='0' || previousKey === 'op' || previousKey === 'clc'){
            display.textContent = keyContent
        }
        else{
            display.textContent = displayedNum + keyContent
        }
    }
    if (
        action === 'add' ||
        action === 'subtract' ||
        action === 'multiply' ||
        action === 'divide'
      ) {
        console.log('operator key!')

        const firstValue = calculator.dataset.firstValue
        const operator = calculator.dataset.operator
        const secondValue = displayedNum
        console.log(firstValue, operator, secondValue, previousKey)

        if( firstValue && operator && previousKey !== 'op' && previousKey !== 'clc'){
            const calc = solve(firstValue, operator, secondValue)
            display.textContent = calc
            calculator.dataset.firstValue = display.textContent
            console.log('second value stored')
        }
        else{
            calculator.dataset.firstValue = displayedNum
        }
        calculator.dataset.previousKey = 'op'
        calculator.dataset.operator = action
      }

      if (action === 'decimal') {
        console.log('decimal key!')
        calculator.dataset.previousKey = 'dec'
        if(! displayedNum.includes('.')){
            display.textContent = displayedNum + '.'
        }
        else if( calculator.dataset.previousKey === 'op'){
            display.textContent ='0.'
        }
      }
      
      if (action === 'clear') {
        calculator.dataset.previousKey = 'clr'
        console.log('clear key!')
        calculator.dataset.firstValue = ''
        calculator.dataset.secondValue = ''
        calculator.dataset.operator = ''
        calculator.dataset.storedValue = ''
        display.textContent = '0'
      }
      
      if (action === 'calculate') {
        console.log('equal key!')
        let firstValue = calculator.dataset.firstValue
        const operator = calculator.dataset.operator
        let secondValue = displayedNum
        
        if(firstValue){
            if( previousKey === 'clc'){
                firstValue = displayedNum
                secondValue = calculator.dataset.storedValue
            }
            display.textContent = solve(firstValue, operator, secondValue)
        }
        calculator.dataset.storedValue = secondValue
        calculator.dataset.previousKey = 'clc'
        
        }

 }
})


const solve = (n1, op, n2) => {
    let result = ''
    let a = parseFloat(n1)
    let b = parseFloat(n2)

    if (op === 'add'){
        result = a + b
    }
    else if (op === 'subtract'){
        result = a - b
    }
    else if (op === 'multiply'){
        result = a * b
    }
    else if (op === 'divide'){
        result = a / b
    }

    return result
}