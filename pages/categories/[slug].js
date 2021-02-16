import Head from 'next/head';
import Layout from '../../components/Layout';
import { singleCategory } from '../../actions/category';
import Card from '../../components/blog/Card';
import React from 'react'
const Category = props => {
  const { category, blogs, query } = props;

  const head = () => {
    return (
      <Head>
        <title>
          {category.name} | {process.env.APP_NAME}
        </title>
        <meta
          name="description"
          content={`Best Blogs on ${category.name}`}
        />
        <link rel="canonical" href={`${process.env.DOMAIN}/categories/${query.slug}`} />
        {/* below is for facebook link share data show */}
        <meta property="og:title" content={`${category.name} | ${process.env.APP_NAME}`} />
        <meta
          property="og:description"
          content={`Best Blogs on ${category.name}`}
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`${process.env.DOMAIN}/categories/${query.slug}`}
        />
         <link rel="icon" type="image/ico" href="/static/images/favicon.ico" />
        <meta property="og:site_name" content={`${process.env.APP_NAME}`} />
        <meta
          property="og:image"
          content={`${process.env.DOMAIN}static/images/favicon.ico`}
        />
        <meta
          property="og:image:secure_url"
          content={`${process.env.DOMAIN}static/images/favicon.ico`}
        />
        <meta property="og:image:type" content="image/ico" />
        <meta property="fb:app_id" content={`${process.env.FB_APP_ID}`} />
      </Head>
    );
  };

  return (
    <React.Fragment>
      {head()}
      <Layout isAuth ={props.isAuth}>
        <main>
          <div className="container-fluid text-center">
            <header>
              <div className="col-md-12 pt-3">
                <h1 className="display-4 font-weight-bold">{category.name}</h1>
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

Category.getInitialProps = ({ query }) => {
  return singleCategory(query.slug).then(data => {
    if (data.error) {
      console.log(data.error);
    } else {
      return { query, category: data.category, blogs: data.blogs };
    }
  });
};

export default Category;