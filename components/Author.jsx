import React from 'react';
import Image from 'next/image';

import { grpahCMSImageLoader } from '../util';

const Author = ({ author }) => {
  return <div className="text-center mt-20 mb-8 p-12 relative rounded-lg bg-opacity-20" style={{backgroundColor: "#4a4141"}}>
    <div className="absolute left-0 right-0 -top-14">
      <Image
        unoptimized
        loader={grpahCMSImageLoader}
        alt={author.name}
        height="100px"
        width="100px"
        className="align-middle rounded-full bg-gray-300"
        src={author.picture.url}
      />
    </div>
    <h3 className="text-white mt-4 mb-4 text-xl font-bold">{author.name}</h3>
    <p className="text-white text-ls">{author.biography}</p>
  </div>
};

export default Author;
