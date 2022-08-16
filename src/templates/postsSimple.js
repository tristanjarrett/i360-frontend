import PostCard from 'components/Posts/PostCard';
import Pagination from 'components/Pagination/Pagination';

import styles from 'styles/templates/Archive.module.scss';

const DEFAULT_POST_OPTIONS = {};

export default function TemplatePostsSimple({ posts, postOptions = DEFAULT_POST_OPTIONS, pagination }) {
  return (
    <>
      {Array.isArray(posts) && (
        <>
          <div className={`${styles.posts} row`}>
            {posts.map((post) => {
              return (
                <div key={post.slug} className="d-flex col-12 col-md-6 mb-4">
                  <PostCard post={post} options={postOptions} />
                </div>
              );
            })}
          </div>
          {pagination && (
            <Pagination
              currentPage={pagination?.currentPage}
              pagesCount={pagination?.pagesCount}
              basePath={pagination?.basePath}
            />
          )}
        </>
      )}
    </>
  );
}
