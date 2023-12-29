import React from 'react'
import "./tv.css";
import { withPrefix } from 'gatsby';

function TV() {
    // TODO: play all
    const src = withPrefix('nptv/airhead.mp4');
    return (
        <div className="nptv">
            <div className="nptv-player">
                <video src={src} controls></video>
                <div>NPTV</div>
            </div>
            <div className="nptv-toolbar">
                <div className="nptv-metadata">
                    <div>Now Playing</div>
                    <div><strong>Airhead:</strong> a little movie I made in Blender in 2021.</div>
                </div>

                <div className='nptv-channel-buttons'>
                    <div>
                    ⬆
                    </div>
                    <div>
                    ⬇
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TV;
