import React, {useEffect} from 'react';
import { useRouter } from 'next/router';

import { PostDetail, Categories, PostWidget, Author, Comments, CommentsForm, Loader } from '../../components';
import { getPosts, getPostDetails } from '../../services';
import { AdjacentPosts } from '../../sections';

const PostDetails = ({ post }) => {
  const router = useRouter();

  useEffect(() => {              //gists are not displaying on first load so reload 1 more time
    const reloadCount = sessionStorage.getItem('reloadCount');
    if(!reloadCount || reloadCount < 1) {
      sessionStorage.setItem('reloadCount', String(1));
      window.location.reload();
    } else {
      sessionStorage.removeItem('reloadCount');
    }
  }, [])
  

  if (router.isFallback) {
    return <Loader />;
  }

  return (
    <>
      <div className="mx-14 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="col-span-1 lg:col-span-9">
            <PostDetail post={post} />
            {post.authors.map(author => <Author author={author} key={author} />)}
            <AdjacentPosts slug={post.slug} date={post.date} />
            <CommentsForm slug={post.slug} />
            <Comments slug={post.slug} />
          </div>
          <div className="col-span-1 lg:col-span-3">
            <div className="relative lg:sticky top-8">
              <PostWidget slug={post.slug} categories={post.categories.map((category) => category.slug)} />
              <Categories />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default PostDetails;

// Fetch data at build time
export async function getStaticProps({ params }) {
  const data = await getPostDetails(params.slug);
  return {
    props: {
      post: data,
    },
  };
}

// Specify dynamic routes to pre-render pages based on data.
// The HTML is generated at build time and will be reused on each request.
export async function getStaticPaths() {
  const posts = await getPosts();
  return {
    paths: posts.map(({ node: { slug } }) => ({ params: { slug } })),
    fallback: true,
  };
}
