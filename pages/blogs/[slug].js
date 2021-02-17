import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/Layout';
import React,{ useState, useEffect } from 'react';
import { singleBlog, listRelated } from '../../actions/blog';
import moment from 'moment';
import renderHTML from 'react-render-html';
import SmallCard from "../../components/blog/smallCard";
import DisqusThread from '../../DisqusThread';

const SingleBlog = props => {
  const [related, setRelated] = useState([]);
  const { blog } = props;

  useEffect(() => {
    const loadRelated = () => {
      listRelated({ blog }).then(data => {
        if (data.error) {
          console.log(data.error);
        } else {
       //   console.log(data)
          setRelated(data);
        }
      });
    };
    loadRelated();
  }, [blog]);
  console.log(related)
  //seo search optimisation (meta tags)
  const head = () => (
    <Head>
      <title>
        {blog.title} | {process.env.APP_NAME}
      </title>
      <meta name="description" content={blog.mdesc} />
      <link rel="canonical" href={`${process.env.DOMAIN}/blogs/${blog.slug}`} />

      {/* below is for facebook link share data show */}
      <meta property="og:title" content={`${blog.title} | ${process.env.APP_NAME}`} />
      <meta property="og:description" content={blog.mdesc} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${process.env.DOMAIN}/blogs/${blog.slug}`} />
      <meta property="og:site_name" content={`${process.env.APP_NAME}`} />
      <meta property="og:image" content={`${process.env.API}/blog/photo/${blog.slug}`} />
      <meta
        property="og:image:secure_url"
        content={`${process.env.API}/blog/photo/${blog.slug}`}
      />
      <link rel="icon" type="image/ico" href="/static/images/favicon.ico" />
      <meta property="og:image:type" content="image/ico" />
      <meta property="fb:app_id" content={`${process.env.FB_APP_ID}`} />
    </Head>
  );

  const showBlogCategories = () => {
    return blog.categories.map((c, i) => (
      <Link key={i} href={`/categories/${c.slug}`}>
        <a className="btn btn-primary mr-1 ml-1 mt-3">{c.name}</a>
      </Link>
    ));
  };

  const showBlogTags = () => {
    return blog.tags.map((t, i) => (
      <Link key={i} href={`/tags/${t.slug}`}>
        <a className="btn btn-outline-primary mr-1 ml-1 mt-3">{t.name}</a>
      </Link>
    ));
  };

  const showRelatedBlogs = () => {
     if(related.length !== 0){
    //  console.log(related)
      return related.blogs.map((b, i) => (
        <div key={i} className="col-md-4">
          <article>
            <SmallCard blog={b} />
          </article>
        </div>
    ));
     }

  };

  const showComments = () => {
    return (
      <div>
        <DisqusThread
          id={blog._id}
          title={blog.title}
          path={`/blog/${blog.slug}`}
        />
      </div>
    );
  };

  return (
    <React.Fragment>
      {head()}
      <Layout isAuth ={props.isAuth}>
        <main>
          <article>
            <div className="container-fluid">
              <section>
                <div className="row" style={{ marginTop: '-30px' }}>
                  <img
                    src={`${process.env.API}api/blog/photo/${blog.slug}`}
                    alt={blog.title}
                    className="img img-fluid featured-image"
                  />
                </div>
              </section>

              <section>
                <div className="container">
                  <h1 className="display-4 pb-3 pt-3 text-center font-weight-bold">
                    {blog.title}
                  </h1>
                  <p className="lead mt-3 mark">
                    Written by{' '}
                    <Link href={`/profile/${blog.postedBy.username}`}>
                      <a>{blog.postedBy.name}</a>
                    </Link>{' '}
                    | Published {moment(blog.updatedAt).fromNow()}
                  </p>
                  <div className="pb-3">
                    {showBlogCategories()}
                    {showBlogTags()}
                    <br />
                    <br />
                  </div>
                </div>

                <div className="container" style={{ overflowX: 'hidden' }}>
                  <section>
                    <div className="col-md-12 lead">
                      {renderHTML(blog.body)}
                    </div>
                  </section>
                </div>

                <div className="container pb-5">
                  <h4 className="text-center pt-5 pb-5 h2">Related blogs</h4>
                  <hr />
                  <div className="row">{showRelatedBlogs()}</div>
                </div>

                <div className="container pt-5 pb-5">{showComments()}</div>
              </section>
            </div>
          </article>
        </main>
      </Layout>
    </React.Fragment>
  );
};

SingleBlog.getInitialProps = ({ query }) => {
  return singleBlog(query.slug).then(data => {
    if (data.error) {
      console.log(data.error);
    } else {
      return { blog: data };
    }
  });
};

export default SingleBlog;
