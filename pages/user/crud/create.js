import Layout from '../../../components/Layout';
import Private from '../../../components/auth/Private';
import BlogCreate from '../../../components/crud/BlogCreate';

const CreateBlog = (props) => {
  return (
    <Layout isAuth ={props.isAuth} pages={'create'}>
      <Private>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 pt-5 pb-5">
              <h2>Create a new blog</h2>
            </div>
            <div className="col-md-12">
              <BlogCreate />
            </div>
          </div>
        </div>
      </Private>
    </Layout>
  );
};

export default CreateBlog;
