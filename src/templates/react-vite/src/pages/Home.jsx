import { useState } from 'react'
import Header from '../components/Header'

function Home() {
    const [count, setCount] = useState(0)
    return (
        <>
            <Header />
            <h1>This is Home page🏠</h1>
            <h4>Count: {count}</h4>
            <button onClick={() => setCount(count + 1)}>Increment</button>
        </>
    )
}

export default Home
