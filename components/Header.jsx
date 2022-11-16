import React, { useState, useEffect } from 'react';

import Link from 'next/link';
import { getCategories } from '../services';

const Header = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then((newCategories) => {
      setCategories(newCategories);
    });
  }, []);

  return (
    <div className="px-10 mb-8 text-white" style={{backgroundColor: "#383131"}}>
      <div className="w-full inline-block py-8">
        <div className="md:float-left block">
          <Link href="/">
            <span className="cursor-pointer font-bold text-3xl">Akshay's Blog</span>
          </Link>
        </div>
        <div className="hidden md:float-left md:contents">
          {categories.map((category, index) => (
            <Link key={index} href={`/category/${category.slug}`}><span className="md:float-right mt-2 align-middle ml-4 font-semibold cursor-pointer text-sm">{category.name}</span></Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Header;
