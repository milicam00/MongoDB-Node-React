import React from "react";
import videoGive from './assets/give-flagship-video.mp4'
import './Home.css'
import useStyles from "./style";

function Home() {

    const classes = useStyles();
    return (
        <div className='contact'>
            <div className="main">
                <div className="overlay"></div>
            <video src={videoGive} autoPlay loop muted/>
            <div className="content">
                <h1>Be Human</h1>

            </div>
           </div>
        </div>
    );
}

export default Home;