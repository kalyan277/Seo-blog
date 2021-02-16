import Head from 'next/head';
import Link from 'next/link';
import { withRouter } from 'next/router';
import Layout from '../../components/Layout';
import React,{ useState } from 'react';
import { listBlogsWithCategoriesAndTags } from '../../actions/blog';
import Card from '../../components/blog/Card';

const Blogs = props => {
  //seo search optimisation (meta tags)
  const head = () => (
    <Head>
      <title>Kalyan blogs | {process.env.APP_NAME}</title>
      <meta
        name="description"
        content="Latest Blog of Every Type Which Covers Almost Every Sphere"
      />
      <link rel="canonical" href={`${process.env.DOMAIN}${router.pathname}`} />

      {/* below is for facebook link share data show */}
      <meta
        property="og:title"
        content={`Latest Blog of Every Type Which Covers Almost Every Sphere | ${process.env.APP_NAME}`}
      />
      <meta
        property="og:description"
        content="Blogs Which Covers Ever Type Which Covers Almost Every Sphere"
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${process.env.DOMAIN}${router.pathname}`} />
      <meta property="og:site_name" content={`${process.env.APP_NAME}`} />
      <meta
        property="og:image"
        content={`${process.env.DOMAIN}static/images/favicon.ico`}
      />
        <link rel="icon" type="image/ico" href="/static/images/favicon.ico" />
      <meta
        property="og:image:secure_url"
        content={`${process.env.DOMAIN}static/images/favicon.ico`}
      />
      <meta property="og:image:type" content="image/ico" />
      <meta property="fb:app_id" content={`${process.env.FB_APP_ID}`} />
    </Head>
  );

  const { blogs, categories, tags, totalBlogs, router, blogsLimit } = props;

  //keep track of the blog limit per load (default 2)
  const [limit, setLimit] = useState(blogsLimit);
  //keep track of the blog skipped
  const [skip, setSkip] = useState(0);
  //keep track of the size of the data
  const [size, setSize] = useState(totalBlogs);
  //new loadedBlogs from load more
  const [loadedBlogs, setLoadedBlogs] = useState([]);

  const loadMore = () => {
    //number of entry to skip
    let toSkip = skip + limit;
    listBlogsWithCategoriesAndTags(toSkip, limit).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setLoadedBlogs([...loadedBlogs, ...data.blogs]);
        //for check if we stll need the load more button
        setSize(data.size);
        //update the skip
        setSkip(toSkip);
      }
    });
  };

  //only display the load more button when the new data loaded is greater than 0
  // and  is greater than or equal to the limit we set
  const loadMoreButton = () => {
    return (
      size > 0 &&
      size >= limit && (
        <button onClick={loadMore} className="btn btn-outline-primary btn-lg">
          Load more
        </button>
      )
    );
  };

  //initial display of all the blogs (from first load)
  const showAllBlogs = () => {
    return blogs.map((blog, index) => (
      <article key={index}>
        <Card blog={blog} />
        <hr />
      </article>
    ));
  };

  const showAllCateogires = () => {
    return categories.map((c, i) => (
      <Link href={`/categories/${c.slug}`} key={i}>
        <a className="btn btn-primary mr-1 ml-1 mt-3">{c.name}</a>
      </Link>
    ));
  };

  const showAllTags = () => {
    return tags.map((t, i) => (
      <Link href={`/tags/${t.slug}`} key={i}>
        <a className="btn btn-outline-primary mr-1 ml-1 mt-3">{t.name}</a>
      </Link>
    ));
  };

  //display the newly loaded blogs from load more
  const showLoadedBlogs = () => {
    return loadedBlogs.map((blog, i) => (
      <article key={i}>
        <Card blog={blog} />
      </article>
    ));
  };

  return (
    <React.Fragment>
      {head()}
      <Layout isAuth ={props.isAuth} pages={'blogs'}>
        <main>
          <div className="container-fluid">
            <header>
              <div className="col-md-12 pt-3">
                <h1 className="display-4 font-weight-bold text-center">
                  Express Yourself With Your Blog..
                </h1>
              </div>
              <section>
                <div className="pb-5 text-center">
                  {showAllCateogires()}
                  <br />
                  {showAllTags()}
                </div>
              </section>
            </header>
          </div>
          <div className="container-fluid">{showAllBlogs()}</div>
          <div className="container-fluid">{showLoadedBlogs()}</div>
          <div className="text-center pt-5 pb-5">{loadMoreButton()}</div>
        </main>
      </Layout>
    </React.Fragment>
  );
};

//serverside render
Blogs.getInitialProps = () => {
  let skip = 0;
  let limit = 4;

  return listBlogsWithCategoriesAndTags(skip, limit).then(res => {
    if (res.error) {
      console.log(res.error);
    } else {
      return {
        blogs: res.blogs,
        categories: res.categories,
        tags: res.tags,
        totalBlogs: res.size,
        blogsLimit: limit,
        blogSkip: skip,
      };
    }
  });
};

export default withRouter(Blogs); //getInitialProps