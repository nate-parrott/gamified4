import React, { useCallback } from 'react'
import "./tv.css";
import { withPrefix } from 'gatsby';
import ArrowUp from '../images/tv/TriangleUp.svg';

interface Channel {
    folder: string;
    videos: Video[]
}

interface Video {
    src: string;
}

const channels: Channel[] = [
    {
        folder: 'airhead',
        videos: [
            { src: 'airhead.mp4' },
        ]
    },
    {
        folder: '3d',
        videos: [
            { src: 'ack3.mp4' },
            { src: 'burger.mp4' },
            { src: 'skeleton.mp4' },
            { src: 'sunflower.mp4' },
        ]
    },
    {
        folder: 'arc',
        videos: [
            { src: 'boosts.mp4' },
            { src: 'max.mp4' },
            { src: 'website.mp4' },
        ]
    },
    {
        folder: 'ar',
        videos: [
            { src: 'DANCING.mp4' },
            { src: 'IMAC.mp4' },
            { src: 'LACROIX.mp4' },
            { src: 'TREADMILL.mp4' },
        ]
    },
]

function vidSrc(video: Video, channel: Channel) {
    return withPrefix('nptv/' + channel.folder + '/' + video.src);
}

function TV() {
    // TODO: play all
    const src = withPrefix('nptv/airhead.mp4');

    const [showStatic, setShowStatic] = React.useState(false);
    const [channelIdx, setChannelIdx] = React.useState(0);
    const [videoIdx, setVideoIdx] = React.useState(0);
    const channel = channels[channelIdx];
    const logoSrc = withPrefix('nptv/' + channel.folder + '/logo.png');
    
    const curVid = channel.videos[videoIdx % channel.videos.length];    
    const nextVid = channel.videos.length > 1 ? channel.videos[(videoIdx + 1) % channel.videos.length] : undefined;

    const [muted, setMuted] = React.useState(true);

    const advanceChannel = (delta: number) => {
        setShowStatic(true);
        setMuted(false);

        setTimeout(() => {
            setShowStatic(false);
            setChannelIdx((channelIdx + delta + channels.length) % channels.length);
            setVideoIdx(videoIdx + 1);
        }, 200);
    }

    const showNextVid = () => {
        setVideoIdx(videoIdx + 1);
        if (preloadedVideoRef.current) {
            preloadedVideoRef.current.play();
        }
    }

    const preloadedVideoRef = React.useRef<HTMLVideoElement>(null);

    return (
        <div className="nptv">
            <div className='tv-container'>
                <div className='tv-antenna' />
                <div className='tv-body'>
                    <div className='tv-content'>
                        <div className='tv-screen'>
                            <video src={withPrefix('nptv/static.mp4')} muted autoPlay loop disablePictureInPicture playsInline />

                            <video key={videoIdx} src={vidSrc(curVid, channel)} muted={muted} autoPlay onEnded={showNextVid} disablePictureInPicture style={{ opacity: showStatic ? 0 : 1 }} playsInline />

                            {/* Preload next*/}
                            {
                                nextVid &&
                                <video ref={preloadedVideoRef} key={videoIdx + 1} src={vidSrc(nextVid, channel)} muted={true} preload="auto" style={{opacity: '0'}} disablePictureInPicture playsInline />
                            }

                            <img className='tv-logo' src={logoSrc} alt={`Current channel: ${channel.folder}`} style={{opacity: showStatic ? 0 : 1}} />
                        </div>
                        <div className='tv-controls'>
                            <div className='tv-channel up' onClick={() => advanceChannel(-1)} role='button' aria-label='Previous Channel'>
                                <img src={ArrowUp} alt='Previous Channel' />
                            </div>
                            <div className='tv-channel down' onClick={() => advanceChannel(1)} role='button' aria-label='Next Channel'>
                                <img src={ArrowUp} alt='Next Channel' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TV;
