import React from 'react';
import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';

const FeaturedPostCard = ({ post }) => (
  <div title={post.title} className="relative my-2 h-72 hover:shadow-2xl shadow-black transition duration-500 ease transform hover:scale-105">
    <div className="absolute rounded-lg bg-center bg-no-repeat bg-cover shadow-md inline-block w-full h-72" style={{ backgroundImage: `url('${post.coverImage.url}')` }} />
    <div className="absolute rounded-lg bg-center bg-gradient-to-b opacity-50 from-gray-400 via-gray-700 to-black w-full h-72" />
    <div className="flex flex-col rounded-lg p-4 items-center justify-center absolute w-full h-full">
      <p className="text-white mb-4 text-shadow font-semibold text-xs">{moment(post.date).format('MMM DD, YYYY')}</p>
      <p className="text-white mb-4 text-shadow font-semibold text-2xl text-center text-ellipsis overflow-hidden">{post.title.split(" ").slice(0,8).join(" ")}</p>
      <div className="flex items-center absolute bottom-3 justify-center bg-black rounded-lg px-4 pt-1">
        {post.authors.map(author => (
          <div>
            <Image
              unoptimized
              alt={author.name}
              height="30px"
              width="30px"
              className="align-bottom drop-shadow-lg rounded-full"
              src={author.picture.url}
            />
            <p className="inline align-top text-white text-shadow ml-2 font-medium">{author.name}</p>
          </div>
        ))}
        
      </div>
    </div>
    <Link href={`/post/${post.slug}`}><span className="cursor-pointer absolute w-full h-full" /></Link>
  </div>
);

export default FeaturedPostCard;
