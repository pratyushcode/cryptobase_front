// VideoBackground.js

import React from 'react';
import ReactPlayer from 'react-player';
import vedio from "../../assets/bg-3.mp4"
import Carousel from './Carousel';

const VideoBackground = () => {
  return (
    // <div className="relative h-screen w-[200]"> {/* Set the width to 1440 pixels */}
    
    <div className='relative'><video className="   w-screen h-auto max-w-full overflow-hidden z-[-10] my-1" autoPlay loop muted>
  <source src={vedio} type="video/mp4"  />
  Your browser does not support the video tag.
</video>
<div className="absolute top-1 left-0 w-full h-80 flex-row py-28 text-center">
        <h1 className="text-5xl font-bold text-amber-700 font-require hover:text-amber-500 ">CRYPTOBASE</h1>
        <p className=' font-require text-amber-200 text-2xl'> Get all the Info regarding your favorite Crypto Currency</p>

        <Carousel/>
      </div>
</div>
    

  );
};

export default VideoBackground;
