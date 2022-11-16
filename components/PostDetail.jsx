import React from 'react';
import moment from 'moment';

const PostDetail = ({ post }) => {
  const getContentFragment = (index, text, obj, type) => {
    let modifiedText = text;

    if (obj) {
      if (obj.bold) {
        modifiedText = (<b key={index}>{text}</b>);
      }

      if (obj.italic) {
        modifiedText = (<em key={index}>{text}</em>);
      }

      if (obj.underline) {
        modifiedText = (<u key={index}>{text}</u>);
      }
    }
    
    switch (type) {
      case 'heading-one':
        return <h1 key={index} className="text-2xl font-bold mb-4">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</h1>;
      case 'heading-three':
        return <h3 key={index} className="text-xl font-semibold mb-4">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</h3>;
      case 'paragraph':
        return <div key={index} className="mb-8">{modifiedText.map((item, i) => <p key={i} className="inline">{item}</p>)}</div>;
      case 'heading-four':
        return <h4 key={index} className="text-md font-semibold mb-4">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</h4>;
      case 'code-block':
        return (
          <div key={`code-${index}`} className="items-center border-b rounded-lg bg-gray-100 text-black pl-5 py-2 my-7 italic">
            {modifiedText.map((item, i) => (
              <React.Fragment key={`${i}-item`}>
                <div>
                  {item.split("\n").map((line, idx) => <div key={`item${idx}`} className="py-2">{line}<br/></div>)}
                </div>
              </React.Fragment>)
            )}
          </div>
        )
      case 'image':
        return (
          <img
            key={index}
            alt={obj.title}
            height={obj.height}
            width={obj.width}
            src={obj.src}
            className="text-center m-auto"
          />
        );
      case 'iframe':
        return <iframe src={obj.url} width={obj.width} height={obj.height}></iframe>
      case 'class':
        switch (obj.className) {
          case 'gist':
            return <div dangerouslySetInnerHTML={{__html: obj.children[0].children[0].text}} />
          case 'seperator':
            return <div className='text-center m-12 font-bold text-3xl'>. . .</div>
          default:
            return modifiedText
        }
      case 'link':
        return <div className='inline' key={`links-${index}`}>
          {obj.children.map((item, i) => {
            return <a key={`link-${index}-${i}`} href={obj.href} target="_blank">
              <u style={{color: 'blue'}}>{item.text}</u>
            </a>
          })}
        </div>
      default:
        return modifiedText
    }
  };

  return (
    <>
      <div className="bg-white shadow-lg rounded-lg lg:p-8 pb-12 mb-8">
        <div className="relative overflow-hidden shadow-md mb-6">
          <img src={post.coverImage.url} alt="" className="object-top h-full w-full object-cover shadow-lg rounded-t-lg lg:rounded-lg" />
        </div>
        <div className="px-4 lg:px-0 text-lg font-medium text-justify">
          <div className="flex mb-8 w-full justify-between">
            <div className="hidden md:flex items-center justify-center lg:mb-0 lg:w-auto mr-8 items-center">
            {post.authors.map(author => {
              return <div key={author}>
                <img
                  alt={author.name}
                  height="30px"
                  width="30px"
                  className="align-bottom rounded-full bg-gray-300 inline"
                  src={author.picture.url}
                />
                <div className="inline align-top text-gray-700 ml-2 font-medium text-lg">{author.name}</div>
              </div>
            })}
            </div>
            <div className="font-medium text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline mr-2 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="align-middle">{moment(post.date).format('MMM DD, YYYY')}</span>
            </div>
          </div>
          <h1 className="mb-8 text-3xl font-semibold">{post.title}</h1>
          {post.content.raw.children.map((typeObj, index) => {
            if (typeObj.type === 'class') {
              return getContentFragment(index, "", typeObj, typeObj.type);
            }
            else {
              const children = typeObj.children.map((item, itemindex) => getContentFragment(itemindex, item.text, item, item.type));
              return getContentFragment(index, children, typeObj, typeObj.type);
            }
          })}
        </div>
      </div>

    </>
  );
};

export default PostDetail;
