import React, { useContext } from "react";
import { CalcContext } from "../context/CalcContext";

const getStyleName = btn => {
    const className = {
        '=': 'equals',
        'x': 'opt',
        '-': 'opt',
        '+': 'opt',
        '/': 'opt',
    }

    return className[btn];
}

// in button we will grab the value because we send the value.
const Button = ({ value }) => {

    const { calc, setCalc } = useContext(CalcContext);

    // User click comma
    const commaClick = () => {
        setCalc({
            ...calc,
            num: 18
            // num: !calc.num.toString().includes('.') ? calc.num + value : calc.num
        })
    }

    //User click c
    const resetClick = () => {
        setCalc({
            sign: '',
            num: 0,
            res: 0

        })
    }

    // User click number 
    const handleClickButton = () => {
        const numberString = value.toString()

        let numberValue;

        if (numberString === '0' && calc.num === 0) {
            numberValue = "0"
        } else {
            numberValue = Number(calc.num + numberString)
        }

        setCalc({
            ...calc,
            num: numberValue
        })
    }

    // User Click Operation
    const signClick = () => {
        setCalc({
            sign: value,
            res: !calc.res && calc.num ? calc.num : calc.res,
            num: 0
        })
    }

    // User Click equals
    const equalsClick = () => {
        //adding a condition here
        if (calc.res && calc.num) {
            const math = (a, b, sign) => {
                //using object literals
                const result = {
                    '+': (a, b) => a + b,
                    '-': (a, b) => a - b,
                    'x': (a, b) => a * b,
                    '/': (a, b) => a / b,
                }
                return result[sign](a, b);
            }
            setCalc({
                res: math(calc.res, calc.num, calc.sign),
                sign: '',
                num: 0
            })
        }
    }

    // User click percent
    const percentClick = () => {
        setCalc({
            num: (calc.num / 100),
            res: (calc.res / 100),
            sign: ''
        })
    }

    // User Click invert 
    const invertClick = () => {
        setCalc({
            num:calc.num ? calc.num * - 1 : 0, 
            res:calc.res ? calc.res * - 1 : 0, 
            sign:''
        })
    }

    const handleBtnClick = () => {
        const results = {
            ".": commaClick,
            'C': resetClick,
            '/': signClick,
            'x': signClick,
            '+': signClick,
            '-': signClick,
            '=': equalsClick,
            '%': percentClick,
            '+-': invertClick
        };

        if (results[value]) {
            return results[value]();
        } else {
            return handleClickButton()
        }
    };


    return (
        //  putting the button value
        <button className={`${getStyleName(value)} button`} onClick={handleBtnClick}>{value}</button>
    )
}

export default Button;