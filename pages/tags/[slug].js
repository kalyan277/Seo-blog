import Head from 'next/head';
import Layout from '../../components/Layout';
import { singleTag } from '../../actions/tag';
import Card from '../../components/blog/Card';
import React from "react";

const Tag = props => {
  const { query, tag, blogs } = props;

  const head = () => {
    return (
      <Head>
        <title>
          {tag.name} | {process.env.APP_NAME}
        </title>
        <meta
          name="description"
          content={`Best Blogs on ${tag.name}`}
        />
        <link rel="canonical" href={`${process.env.DOMAIN}/tags/${query.slug}`} />
        {/* below is for facebook link share data show */}
        <meta property="og:title" content={`${tag.name} | ${process.env.APP_NAME}`} />
        <meta
          property="og:description"
          content={`Best Blogs on ${tag.name}`}
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${process.env.DOMAIN}/tags/${query.slug}`} />
        <meta property="og:site_name" content={`${process.env.APP_NAME}`} />
        <meta
          property="og:image"
          content={`${process.env.DOMAIN}static/images/favicon.ico`}
        />
        <meta
          property="og:image:secure_url"
          content={`${process.env.DOMAIN}static/images/favicon.ico`}
        />
         <link rel="icon" type="image/ico" href="/static/images/favicon.ico" />
        <meta property="og:image:type" content="image/ico" />
        <meta property="fb:app_id" content={`${process.env.FB_APP_ID}`} />
      </Head>
    );
  };

  return (
    <React.Fragment>
      {head()}
      <Layout>
        <main>
          <div className="container-fluid text-center">
            <header>
              <div className="col-md-12 pt-3">
                <h1 className="display-4 font-weight-bold">{tag.name}</h1>
                {blogs.map((b, i) => (
                  <div key={i}>
                    <Card blog={b} />
                    <hr />
                  </div>
                ))}
              </div>
            </header>
          </div>
        </main>
      </Layout>
    </React.Fragment>
  );
};

Tag.getInitialProps = ({ query }) => {
  return singleTag(query.slug).then(data => {
    if (data.error) {
      console.log(data.error);
    } else {
      return { query, tag: data.tag, blogs: data.blogs };
    }
  });
};

export default Tag;