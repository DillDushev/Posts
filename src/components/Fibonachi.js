import * as React from 'react'
import pic from './Damian.JPG'
const {useState, useMemo, useCallback, memo} = React

function FibDisplay ({length}) {
    const numbers = useMemo(() => {
        const a = [1, 1]
        console.log('Calculating and display Fibonacci')
        for(let i = 2; i < length; i++) {
            a[i] = a[i - 1] + a[i - 2]
        }
        return a
    }, [length])

    return (
        <p>{length} numbers of the fibonacci sequence: <br /> {numbers.join(' ,')}</p>

    );
}

const NameDisplay = memo( function ({ name }) {
        console.log('Displayiong name')
        return <p>Your Nmae is: {name}</p>
    })

function Fibonacci () {
    const [length, setLength] = useState(3)
    const [name, setName] = useState('Nikola')

    const onLengthChange = useCallback((e) => setLength(Number(e.target.value) || 0, []))
    const onNameChange = useCallback((e) => setName(e.target.value), [])
    return (
        <>
            <input value={name} onChange={onNameChange} />
            <h2>Damian</h2>
            <img src={pic} width={120} height={150} alt={'*'}></img>
            <NameDisplay name={name} /> 
            <input value={length} onChange={onLengthChange}/>
            <FibDisplay length={length} />
            <hr />
        </>
    );
}

export default Fibonacci;