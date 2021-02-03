import React, { useRef, useState, useEffect } from 'react'
import VideoFooter from './VideoFooter';
import VideoSidebar from './VideoSidebar';
import PlayIcon from '@material-ui/icons/PlayCircleFilled';

import './Video.css';

function Video({ channel, description, song, likes, shares, messages, url}) {

    const [playing, setPlaying] = useState(false);
    const videoRef = useRef(null);

    const handleVideoPress = () => {
        if(playing!==true){
            videoRef.current.pause();
            setPlaying(true);
            console.log('pause');
        }else{
            videoRef.current.play();
            setPlaying(false);
            console.log('play');
        }
    };

    useEffect(() => {
      let options = {
        rootMargin: "0px",
        threshold: [0.25, 0.75]
      };
  
      let handlePlay = (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if(playing){
              videoRef.current.play();
              setPlaying(false);
              console.log('false');
            }else{
              setPlaying(true);
              console.log('true');
            }
            // console.log('intersect');
          } else {
            videoRef.current.pause();
            setPlaying(true);
            // console.log('non intersect');
          }
        });
      };

      let observer = new IntersectionObserver(handlePlay, options);
  
      observer.observe(videoRef.current);
    }, []);

    return (
        <div className="video">
            {
              playing ? (
                <div className="video__block" onClick={handleVideoPress} style={{backgroundColor:'rgba(0,0,0,0.4)'}}>
                  <PlayIcon className="video__icon" style={{fontSize:'100px'}}/>
                </div>
              ) : (
                <div className="video__block" onClick={handleVideoPress}>
                </div>
              )
            }
            
            <video className="video__player" ref={videoRef} loop src={url}>
            </video>

            {/* Video Footer */}
            <VideoFooter channel={channel} description={description} song={song}/>

            {/* Video Sidebar */}
            <VideoSidebar likes={likes} shares={shares} messages={messages} overlay={playing}/>

        </div>
    )
}

export default Video
