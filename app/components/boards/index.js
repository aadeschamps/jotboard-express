import React from 'react';
import { browserHistory } from 'react-router';

export default ({ user }) => {
    return (
        <div className='col s10 offset-s1'>
            <h2> Welcome, { user.email } </h2>
            <h3> Here are your boards </h3>
        </div>
    )
}