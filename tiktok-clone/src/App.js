import React, {useEffect, useState} from 'react';
import Video from './Video.js';
import axios from './axios.js';
import './App.css';

function App() {

  const [tiktokVides, setTiktokVides] = useState([]);

  useEffect(() => {
    async function fetchData() {
        const req = await axios.get('/v2/posts');

        setTiktokVides(req.data);
    }

    fetchData();
  }, []);

  return (
    <div className="app">
      
      {/* Videos */}
      <div className="app__videos">
        {
          tiktokVides.map((videos) => (
            <Video key={videos._id} channel={videos.channel} description={videos.description} song={videos.song} likes={videos.likes} shares={videos.shares} messages={videos.messages} url={videos.url}/>
          ))
        }
        
        {/* <Video channel="xtryuga" description="Proud to be pinoy" song="Panalo" likes={150} shares={200} messages={23} url="videos/videos_2.mp4"/> */}
      </div>
      
    </div>
  );
}

export default App;
