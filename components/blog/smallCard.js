import moment from 'moment';
import renderHTML from 'react-render-html';
import Link from 'next/link';
const API =process.env.API;

const SmallCard = props => {
  const { blog } = props;

  return (
    <div className="card">
      <section>
        <Link href={`/blogs/${blog.slug}`}>
          <a>
            <img
              className="img img-fluid"
              style={{ height: '200px', width: '100%' }}
              src={`${API}api/blog/photo/${blog.slug}`}
              alt={blog.title}
            />
          </a>
        </Link>
      </section>

      <div className="card-body">
        <section>
          <Link href={`/blogs/${blog.slug}`}>
            <a>
              <h5 className="card-title">{blog.title}</h5>
            </a>
          </Link>
          <div
            className="card-text"
            style={{
              overflowY: 'scroll',
              maxHeight: '250px',
            }}
          >
            {renderHTML(blog.excerpt)}
          </div>
        </section>
      </div>

      <div className="card-body">
        <div>
          Posted {moment(blog.updatedAt).fromNow()} by{' '}
          <Link href={`/profile/${blog.postedBy.username}`}>
            <a className="float-right">{blog.postedBy.username}</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SmallCard;