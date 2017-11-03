import React from 'react';
import { Link } from 'react-router';

const noop = () => {};

export default ({ className, to, onClick, text }) => {
    return (
        <Link 
            className={className}
            to={to}
            onClick={onClick || noop}
        > 
            {text}
        </Link>
    );
};
