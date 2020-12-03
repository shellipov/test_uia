import React from 'react';
import { Link } from 'react-router-dom';

const Weather: React.FC = () => {
    return <>
        <Link to='history'>История</Link>
        <h1>Погода</h1>
    </>
}

export default Weather