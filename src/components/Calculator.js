import React, {useState, useRef} from 'react'


function NumButton(props) {
    return (
        <button onClick={props.onClick} type="button" className="btn btn-light waves-effect">{props.val}</button>
    )
}

function OpButton(props) {
    let sign = props.val

    if (sign == '*')
        sign = '\u00D7'
    else if (sign == '/')
        sign = '\u00F7'

    return (
        <button onClick={props.onClick} type="button" className="operator btn btn-info">{sign}</button>
    )
}


export default function Calculator(){

    function allClear(){
        setFirstNum(false)
        setLastNum(false)
        setOp('+')
        setOpSet(false)

        reset = false
        dotSet.current = false
    }

    function setNumber(number, val) {
        if (!number && val == '.') {
            number = '0.'
            dotSet.current = true
        }
        else if (val == '.') {
            if (dotSet.current)
                return number
            number += val
            dotSet.current = true
        }
        else if (!number && val > 0) 
            number = val.toString()
        else if(!number && val == 0)
            return number
        else
            number += val.toString()

        return number
    }

    function numButtonClick(val){
        if (val != '.' && typeof(val) != 'number')
            return
        if (reset) {
            setFirstNum(false)
            reset = false
        }
        if (!opSet)
            setFirstNum(setNumber(firstNum, val))
        else
            setLastNum(setNumber(lastNum, val))
    }

    function opButtonClick(val) {
        if (!firstNum) {
            if (val == '-')
                setFirstNum('-')
            return
        }
        if (!lastNum) {
            setOp(val)
            setOpSet(true)
            dotSet.current = false
            reset = false
        }
        else {
            switch(op) {
                case ('+'):
                    setFirstNum((Number(firstNum) + Number(lastNum)).toString())
                    break
                case ('-'):
                    setFirstNum((Number(firstNum) - Number(lastNum)).toString())
                    break
                case ('*'):
                    setFirstNum((Number(firstNum) * Number(lastNum)).toString())
                    break
                case ('/'):
                    setFirstNum((Number(firstNum) / Number(lastNum)).toString())
                    break
                default:
                    break
            }
            setOp(val)
            setLastNum(false)
            dotSet.current = false
        }
    }

    function equalButtonClick() {
        if(firstNum && lastNum) {
            opButtonClick(op)
            setOpSet(false)
            reset = true
            if (firstNum.toString().includes('.'))
                dotSet.current = true
        }
    }


    const [firstNum, setFirstNum] = useState(false)
    const [lastNum, setLastNum] = useState(false)
    const [op, setOp] = useState('+')
    const [opSet, setOpSet] = useState(false)

    let reset = false
    const dotSet = useRef(false)

    let numButtons = []
    let numButtonsMap = [
        [7, 8, 9],
        [4, 5, 6],
        [1, 2, 3],
        [0]
    ]
    numButtonsMap.forEach(row => {
        row.forEach(element => {
            numButtons.push(<NumButton onClick={() => numButtonClick(element)} val={element} key={element} />)
        })
    })

    let opButtons = []
    let opButtonsMap = ["+", "-", "*", "/"]
    opButtonsMap.forEach(element => {
        opButtons.push(<OpButton onClick={() => opButtonClick(element)} val={element} key={element} />)
    })

    return (
        <div className='d-flex justify-content-center mt-3'>

            <div className="calculator card">

            <input type="text" className="calculator-screen z-depth-1" 
                value={(firstNum ? firstNum : '')+(opSet ? ' '+op+' ' : '')+(lastNum ? lastNum : '')}
                disabled />

            <div className="calculator-keys">

            {opButtons}
            {numButtons}

            <button onClick={() => numButtonClick('.')} type="button" className="decimal function btn btn-secondary">.</button>
            <button onClick={allClear} type="button" className="all-clear function btn btn-danger btn-sm" value="all-clear">AC</button>

            <button onClick={equalButtonClick} type="button" className="equal-sign operator btn btn-light">=</button>

            </div>
            </div>
        </div>
    )
}