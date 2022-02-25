import React from 'react';
import { Link } from 'react-router-dom'

const Nav: React.FunctionComponent = () => {
    return (
        <div className='navBar'>
            <h1>Application</h1>
            <ul>
                <li className='active'>
                    <Link to='/'>Home
                    </Link>
                </li>
                <li className='not-active'>
                    <Link to='/add'>Add user
                    </Link>
                </li>
                <li className='not-active'>
                    <Link to='/edit'>Edit user
                    </Link>
                </li>

            </ul>
        </div>
    )
}
export default Nav;