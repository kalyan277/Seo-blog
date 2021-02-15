import Layout from '../../../components/Layout';
import Private from '../../../components/auth/Private';
import BlogRead from '../../../components/blog/BlogRead';
import { isAuth } from '../../../actions/auth';

const Blogs = (props) => {
  const username = isAuth() && isAuth().username;

  return (
    <Layout isAuth ={props.isAuth} pages={'blog'}>
      <Private>
        <div className="container">
          <div className="row">
            <div className="col-md-12 pt-5 pb-5">
              <h2>Manage blogs</h2>
            </div>
            <div className="col-md-12">
              <BlogRead username={username} />
            </div>
          </div>
        </div>
      </Private>
    </Layout>
  );
};

export default Blogs;