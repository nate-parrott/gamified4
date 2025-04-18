import * as React from "react"
import { HeadFC, PageProps } from "gatsby"
import AspectFill from "../components/AspectFill";
import { withPrefix } from "../components/utils";
import '../components/lounge.css';

/**
 * Helper function to safely use speech synthesis
 * @param text - The text to speak 
 * @param onSpeechEnd - Callback for when speech ends or fails
 */
const speakText = (text: string, onSpeechEnd: () => void) => {
  if (!window.speechSynthesis) {
    console.log("Speech synthesis not available");
    onSpeechEnd();
    return;
  }
  
  try {
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Handle speech end
    utterance.onend = () => {
      console.log("Speech synthesis completed");
      onSpeechEnd();
    };
    
    // Handle speech errors
    utterance.onerror = (event) => {
      console.error("Speech synthesis error:", event);
      onSpeechEnd();
    };
    
    // For iOS, we need to ensure this happens in response to user interaction
    setTimeout(() => {
      window.speechSynthesis.speak(utterance);
      
      // Add a safety timeout in case onend doesn't fire
      setTimeout(() => {
        if (window.speechSynthesis.speaking) {
          console.log("Speech synthesis safety timeout triggered");
          onSpeechEnd();
        }
      }, 5000);
    }, 100);
  } catch (error) {
    console.error("Speech synthesis exception:", error);
    onSpeechEnd();
  }
};

/*
ffmpeg -i Video.mp4 -vf 'colorkey=0x00FF1C:similarity=0.2:blend=0.3' -c copy -c:v vp9 -f webm hello.webm


# WebM for Chrome
ffmpeg -i Video.mp4 -vf "colorkey=0x00FF1C:similarity=0.3:blend=0.2,scale=900:-1" -c:v vp9 -b:v 800k -crf 31 -deadline good hello.webm




// ffmpeg -i Video.mp4 -vf "colorkey=0x00FF1C:similarity=0.4:blend=0.2,scale=900:-1" -c:v qtrle -c:a aac -b:a 128k hello.mov

// ffmpeg -i Video.mp4 -vf "colorkey=0x00FF1C:similarity=0.3:blend=0.2,scale=900:-1" -c:v hevc -tag:v hvc1 -pix_fmt yuva420p -crf 23 -c:a aac -b:a 128k hello.mp4

// ffmpeg -i Video.mp4 -vf "colorkey=0x00FF1C:similarity=0.3:blend=0.2,format=yuva420p,scale=900:-1" -c:v hevc -tag:v hvc1 -pix_fmt yuva420p -crf 23 -c:a aac -b:a 128k hello.mp4


// ffmpeg -framerate 25 -i unscreen-%3d.png -c:v prores_ks -pix_fmt yuva444p10le -alpha_bits 16 -profile:v 4444 -f mov -vframes 150 output.mov


ffmpeg -i Video.mp4 -vf "colorkey=0x00FF1C:similarity=0.3:blend=0.2,format=yuva420p,scale=900

PRORES:
ffmpeg -i Video.mp4 -vf "colorkey=0x00FF1C:similarity=0.3:blend=0.2,scale=900:-1" -c:v prores_ks -profile:v 4444 -alpha_bits 16 -c:a aac -b:a 128k hello.mov

https://css-tricks.com/overlaying-video-with-transparency-while-wrangling-cross-browser-support/

Video is 900x496
*/

/**
 * VideoInterstitial component for loading screen and start button
 */
const VideoInterstitial = ({ isLoading, onStart }: { isLoading: boolean; onStart: () => void }) => {
  return (
    <div style={{
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "black",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 100
    }}>
      {isLoading ? (
        <div style={{
          color: "white",
          fontSize: "24px",
          fontFamily: "Arial, sans-serif",
          textAlign: "center",
          padding: "20px"
        }}>
          One moment...
        </div>
      ) : (
        <button 
          onClick={onStart}
          style={{
            background: "none",
            color: "white",
            padding: "15px 30px",
            fontSize: "20px",
            fontFamily: "Helvetica, Arial, sans-serif",
            cursor: "pointer",
            border: 'none',
            transition: "all 0.3s ease"
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
          }}
        >
          Enter Lounge
        </button>
      )}
    </div>
  );
};

function isIOSOrIpadSafari() {
  return typeof window !== 'undefined' && window.navigator.userAgent.includes('iPhone') && window.navigator.userAgent.includes('Safari');
}

const Artboard = ({ videoRef }: { videoRef: React.RefObject<HTMLVideoElement> }) => {
  /*
  - 14.5 seconds: pause to alert "What's your name?"
  - 17 seconds: pause video, use speech synth to read user's name, then resume video
  */
  
  const isSafari = typeof window !== 'undefined' && window.navigator.userAgent.includes('Safari');
  const videoUrl = isSafari ? withPrefix('/hello.mov') : withPrefix('/hello.webm');
  return (
    <div style={{background: "rgba(223, 196, 138, 1)", width: "574px", height: "447px", overflow: "hidden", position: "relative"}}>
      <div style={{backgroundImage: "url(https://media.tenor.com/vw57lq4GUHYAAAAC/starry-night-van-gogh.gif)", backgroundSize: "cover", backgroundPosition: "center", width: "84px", height: "111px", left: "176px", top: "111px", position: "absolute"}}></div>
      <div onClick={() => window.close()} style={{backgroundImage: "url(https://media.tenor.com/0FujksGZiAUAAAAi/exit.gif)", backgroundSize: "cover", backgroundPosition: "center", width: "55px", height: "67px", left: "380px", top: "0px", position: "absolute", transform: "scaleX(1)"}}></div>
      <div style={{backgroundColor: "rgba(234, 208, 154, 1)", width: "600px", height: "123px", left: "-1px", top: "335px", position: "absolute"}}>
        <div style={{backgroundImage: "url(https://rmmhpcnrqakmcbvlcerx.supabase.co/storage/v1/object/sign/doc_uploads/920c01fb-b57c-4517-a9bd-14591cb14145/0c0736e4-501d-49e6-88bb-bfadb72ca67f?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkb2NfdXBsb2Fkcy85MjBjMDFmYi1iNTdjLTQ1MTctYTliZC0xNDU5MWNiMTQxNDUvMGMwNzM2ZTQtNTAxZC00OWU2LTg4YmItYmZhZGI3MmNhNjdmIiwiaWF0IjoxNzQxNDEyMTczLCJleHAiOjMzMTgyMTIxNzN9.EjFV5A1AjeyBex1DSR5zoki-wFloY1yqqL3_Me8ofKY)", backgroundSize: "cover", backgroundPosition: "center", width: "457px", height: "79px", left: "72px", top: "14px", position: "absolute"}}></div>
        <div style={{backgroundColor: "rgba(40, 37, 37, 1)", opacity: "0.3", borderRadius: "41px", width: "30px", height: "27px", left: "44.40402178863505px", top: "66.31684783911449px", position: "absolute", transform: "skewX(0deg)", filter: "blur(5px)"}}></div>
        <div style={{backgroundColor: "rgba(40, 37, 37, 1)", opacity: "0.3", width: "105px", height: "19px", left: "481px", top: "8px", position: "absolute", transform: "skewX(50deg)", filter: "blur(5px)"}}></div>
      </div>
      <div style={{backgroundImage: "url(https://rmmhpcnrqakmcbvlcerx.supabase.co/storage/v1/object/sign/doc_uploads/920c01fb-b57c-4517-a9bd-14591cb14145/3dd7da4e-02fa-4485-aa88-478dc51b41a5?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkb2NfdXBsb2Fkcy85MjBjMDFmYi1iNTdjLTQ1MTctYTliZC0xNDU5MWNiMTQxNDUvM2RkN2RhNGUtMDJmYS00NDg1LWFhODgtNDc4ZGM1MWI0MWE1IiwiaWF0IjoxNzQxNDEyMDk4LCJleHAiOjMzMTgyMTIwOTh9.lf1N24qUhMhOTBJYbC7HvgE9OiPykIw3quqHow8sBQo)", backgroundSize: "cover", backgroundPosition: "center", width: "305px", height: "169px", left: "142px", top: "209px", position: "absolute"}}></div>
      <div style={{backgroundColor: "rgba(199, 174, 121, 1)", width: "140px", height: "445px", left: "0px", top: "-75px", position: "absolute", transform: "skewY(-27deg) scaleX(1)"}}>
        <div style={{backgroundImage: "url(https://media.tenor.com/DV32ZhtLF7AAAAAC/sunset-sea.gif)", backgroundSize: "cover", backgroundPosition: "center", width: "83px", height: "83px", left: "34px", top: "222px", position: "absolute"}}></div>
        <div style={{backgroundImage: "url(https://media.tenor.com/cuJtfi_fR1AAAAAi/open-fenster.gif)", backgroundSize: "cover", backgroundPosition: "center", width: "99px", height: "110px", left: "21px", top: "199px", position: "absolute"}}></div>
      </div>
      <div style={{backgroundImage: "url(https://media.tenor.com/w1BzPdKY2_sAAAAi/manidhaya.gif)", backgroundSize: "cover", backgroundPosition: "center", width: "96px", height: "166px", left: "36.21580372877804px", top: "-25.900648891607347px", position: "absolute"}}></div>
      <div style={{backgroundImage: "url(https://media.tenor.com/2f3vrmeHoE4AAAAi/fridge.gif)", backgroundSize: "cover", backgroundPosition: "center", width: "136px", height: "214px", left: "452.86350031687596px", top: "143.76642811874854px", position: "absolute"}}></div>
      <div style={{backgroundImage: "url(https://media.tenor.com/JBNC7IW_-1sAAAAi/groupgreeting-stickers-gg-stickers.gif)", backgroundSize: "cover", backgroundPosition: "center", width: "99px", height: "123px", left: "169px", top: "105px", position: "absolute"}}></div>
      <div style={{backgroundImage: "url(https://media.tenor.com/29mROjd-PXoAAAAi/moontrip.gif)", backgroundSize: "cover", backgroundPosition: "center", width: "94px", height: "122px", left: "367px", top: "102px", position: "absolute"}}></div>
      <div style={{backgroundImage: "url(https://media.tenor.com/OOH12fSHuREAAAAi/plant-plants.gif)", backgroundSize: "cover", backgroundPosition: "center", width: "104px", height: "142px", left: "527.46330227795px", top: "333.0761355603127px", position: "absolute"}}></div>
      <div style={{backgroundImage: "url(https://media.tenor.com/OOH12fSHuREAAAAi/plant-plants.gif)", backgroundSize: "cover", backgroundPosition: "center", width: "104px", height: "142px", left: "12.297678445192027px", top: "288px", position: "absolute"}}></div>
      {/* <div style={{backgroundImage: "url(https://rmmhpcnrqakmcbvlcerx.supabase.co/storage/v1/object/sign/doc_uploads/920c01fb-b57c-4517-a9bd-14591cb14145/71c7db71-a4eb-43dd-9e2f-c371cdffc3f4?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkb2NfdXBsb2Fkcy85MjBjMDFmYi1iNTdjLTQ1MTctYTliZC0xNDU5MWNiMTQxNDUvNzFjN2RiNzEtYTRlYi00M2RkLTllMmYtYzM3MWNkZmZjM2Y0IiwiaWF0IjoxNzQxNDExODg5LCJleHAiOjMzMTgyMTE4ODl9.G6Wvau-pnFm04r6k4nF_gShAkb0-Es8SMTjBj0oYn8w)", backgroundSize: "cover", backgroundPosition: "center", width: "247px", height: "286px", left: "183.23357188125146px", top: "163.62784673121655px", position: "absolute"}}></div> */}
      <div style={{backgroundImage: "url(https://media.tenor.com/Cvo4AhntshAAAAAi/sabrina-carpenter-lights.gif)", backgroundSize: "cover", backgroundPosition: "center", width: "144px", height: "150px", left: "228.78159423979906px", top: "-51.094934787072994px", position: "absolute"}}></div>
      <video 
        ref={videoRef}
        width="900" 
        playsInline 
        muted // Initially muted, unmuted when started
        preload="metadata" // Use metadata preload for better iOS compatibility
        onLoadedData={() => {
          console.log("Video loaded data event triggered");
          if (typeof window !== 'undefined') {
            document.dispatchEvent(new Event('videoLoaded'));
          }
        }}
        onProgress={() => {
          // The progress event is more reliable on iOS Safari
          console.log("Video progress event triggered");
          if (typeof window !== 'undefined') {
            document.dispatchEvent(new Event('videoLoaded'));
          }
        }}
        onLoadedMetadata={() => {
          // This event also works well with preload="metadata"
          console.log("Video metadata loaded");
          if (typeof window !== 'undefined') {
            document.dispatchEvent(new Event('videoLoaded'));
          }
        }}
        onCanPlay={() => console.log("Video can play event triggered")}
        onError={(e) => console.error("Video loading error:", e)}
        src={videoUrl} 
        style={{width: "600px", height: "350px", left: "0", top: "80px", position: "absolute"}} 
      />
    </div>
  );
};


const pageStyles = {
  width: '100%',
  height: '100vh'
}

const ExclusiveLoungeModal: React.FC<PageProps> = () => {
  const [mount, setMount] = React.useState(false);
  React.useEffect(() => {
    setMount(true);
  }, []);
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = React.useState(false);
  const [videoStarted, setVideoStarted] = React.useState(false);
  const userNameRef = React.useRef("");
  
  // Use refs instead of state for tracking one-time events
  const askedForNameRef = React.useRef(false);
  const spokeNameRef = React.useRef(false);
  
  // Add event listener for video loaded event
  React.useEffect(() => {
    const handleVideoLoadedEvent = () => {
      setVideoLoaded(true);
    };
    
    if (typeof window !== 'undefined') {
      document.addEventListener('videoLoaded', handleVideoLoadedEvent);
      
      // Clean up event listener on component unmount
      return () => {
        document.removeEventListener('videoLoaded', handleVideoLoadedEvent);
      };
    }
  }, []);
  
  // Handle time-based events in the video
  React.useEffect(() => {
    if (!videoStarted || !videoRef.current) return;
    
    console.log("Setting up video time-based event handlers");
    
    // Create timeupdate event listener for the video
    const handleTimeUpdate = () => {
      if (isIOSOrIpadSafari()) { return } // disable
      const currentTime = videoRef.current?.currentTime || 0;

      const DEBUG = false;
      const namePromptTime = DEBUG ? 2 : 14.5;
      const nameSpeechTime = DEBUG ? 4 : 17;
      
      // At 14.5 seconds, show the name prompt using alert
      if (currentTime >= namePromptTime && currentTime < namePromptTime + 0.5 && !askedForNameRef.current) {
        console.log("Triggering name prompt at time:", currentTime);
        videoRef.current?.pause();
        askedForNameRef.current = true;
        
        // Use browser alert to get name
        const name = window.prompt("What's your name?", "");
        console.log("User entered name:", name || "(empty)");
        userNameRef.current = name || "";
        
        // Resume video after getting name
        if (videoRef.current) {
          videoRef.current.play();
        }
      }
      
      // At 17 seconds, speak the name and pause temporarily
      if (currentTime >= nameSpeechTime && currentTime < nameSpeechTime + 0.5) {
        console.log("Name speech time")
      }
      if (currentTime >= nameSpeechTime && currentTime < nameSpeechTime + 0.5 && userNameRef.current !== "" && !spokeNameRef.current) {
        console.log("Triggering name speech at time:", currentTime);
        spokeNameRef.current = true;
        videoRef.current?.pause();
        
        // Use our helper function to speak the name
        speakText(userNameRef.current, () => {
          console.log("Speech completed or failed, resuming video");
          if (videoRef.current) {
            videoRef.current.play();
          }
        });
      }
    };
    
    const videoElement = videoRef.current;
    videoElement.addEventListener('timeupdate', handleTimeUpdate);
    
    return () => {
      console.log("Cleaning up video time-based event handlers");
      videoElement.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [videoStarted, videoRef, userNameRef]);
  
  // Handle start button click - starts video with sound
  const handleStartVideo = () => {
    if (videoRef.current) {
      videoRef.current.muted = false; // Enable sound
      videoRef.current.currentTime = 0; // Reset to beginning
      videoRef.current.play(); // Start playing
      setVideoStarted(true);
    }
  };

  if (!mount) return <main style={{...pageStyles, backgroundColor: 'black'}} />

  return (
    <main style={pageStyles}>
      <AspectFill childWidth={574} childHeight={445} style={{width: '100%', height: '100%'}}>
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
          <Artboard videoRef={videoRef} />
          {/* Show interstitial only when video hasn't started */}
          {!videoStarted && (
            <VideoInterstitial 
              isLoading={!videoLoaded} 
              onStart={handleStartVideo} 
            />
          )}
        </div>
      </AspectFill>
    </main>
  )
}

export default ExclusiveLoungeModal

export const Head: HeadFC = () => <title>Exclusive Lounge</title>