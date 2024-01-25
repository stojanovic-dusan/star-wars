import React from 'react'
import './Loader.css'

export default function Loader() {
    return (
        <div className='loading-wrapper'>
            <div id="div-loading">

                <div id="loading-background"></div>

                <div id="loading-text">Loading</div>

            </div>
        </div>
    )
}
