
import React from 'react';
import './ServerError.css'
import NavBar from '../../components/Nav/NavBar';

function ServerError() {
    return(
        <NavBar content = {
            <div className='centernavitem'>
                <h1>An internal server error.</h1>
            </div>
        }/>
    );
}


export default ServerError;