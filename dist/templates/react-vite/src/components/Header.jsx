import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
    return (
        <>
            <h1>Welcome to Ramit ts-ex react vite example!🤪</h1>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/users/@me">Profile</Link>
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default Header
