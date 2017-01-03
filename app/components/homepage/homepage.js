import React from 'react';
import _ from 'lodash';

export default ({ user }) => {
    console.log(user);
    return (
        <h1> Welcome, { _.get(user, 'email') || 'Stranger'} </h1>
    )
}