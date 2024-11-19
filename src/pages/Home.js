import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    return <>
        <h1>Notion Widget</h1>
        <Link to="/counter">Counter</Link>
    </>;
}

export default Home;
