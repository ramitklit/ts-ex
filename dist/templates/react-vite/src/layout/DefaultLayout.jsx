import { Outlet } from 'react-router-dom'

function DefaultLayout() {
    return (
        <div>
            <Outlet />
        </div>
    )
}

export default DefaultLayout
