import Head from 'next/head';
import React from 'react';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { userPublicProfile } from '../../actions/user';
import moment from 'moment';
import ContactForm from '../../components/form/ContactForm';

const UserProfile = ({ user, blogs, query,isAuth }) => {
    const head = () => (
        <Head>
            <title>
                {user.username} | {process.env.APP_NAME}
            </title>
            <meta name="description" content={`Blogs by ${user.username}`} />
            <link rel="canonical" href={`${process.env.DOMAIN}/profile/${query.username}`} />
            <meta property="og:title" content={`${user.username}| ${process.env.APP_NAME}`} />
            <meta property="og:description" content={`Blogs by ${user.username}`} />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={`${process.env.DOMAIN}/profile/${query.username}`} />
            <meta property="og:site_name" content={`${process.env.APP_NAME}`} />
                 <link rel="icon" type="image/ico" href="/static/images/favicon.ico" />
            <meta property="og:image" content={`${process.env.DOMAIN}static/images/favicon.ico`} />
            <meta property="og:image:secure_url" content={`${process.env.DOMAIN}static/images/favicon.ico`} />
            <meta property="og:image:type" content="image/ico" />
            <meta property="fb:app_id" content={`${process.env.FB_APP_ID}`} />
        </Head>
    );

    const showUserBlogs = () => {
        return blogs.map((blog, i) => {
            return (
                <div className="mt-4 mb-4" key={i}>
                    <Link href={`/blogs/${blog.slug}`}>
                        <a className="lead">{blog.title}</a>
                    </Link>
                </div>
            );
        });
    };

    return (
        <React.Fragment>
            {head()}
            <Layout isAuth ={isAuth}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-8">
                                            <h5>{user.name}</h5>

                                            <p className="text-muted">Joined {moment(user.createdAt).fromNow()}</p>
                                        </div>
                                        <div className="col-md-4">
                                            <img
                                                src={`${process.env.API}api/user/photo/${user.username}`}
                                                className="img img-fluid img-thumbnail mb-3"
                                                style={{ maxHeight: '100px', maxWidth: '100%' }}
                                                alt="user profile"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <br />

                <div className="container pb-5">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title bg-primary pt-4 pb-4 pl-4 pr-4 text-white">
                                        Recent blogs by {user.name}
                                    </h5>

                                    {showUserBlogs()}
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title bg-primary pt-4 pb-4 pl-4 pr-4 text-light">
                                        Message {user.name}
                                    </h5>
                                    <br />
                                     <ContactForm authorEmail={user.email} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </React.Fragment>
    );
};

UserProfile.getInitialProps = ({query}) => {
   
    return userPublicProfile(query.username).then(data => {
        if (data.error) {
           // console.log(data.error);
        } else {
            // console.log(data);
            return { user: data.user, blogs: data.blogs, query };
        }
    });
};

export default UserProfile;
