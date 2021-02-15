import Layout from '../components/Layout';
import ContactForm from '../components/form/ContactForm';

const Contact = ({isAuth}) => {
  return (
    <Layout isAuth ={isAuth} pages={'contact'}>
      <div className="container">
        <div className="row">
          <div className="col-md-8 offset-md-2">
            <h2>Contact form</h2>
            <hr />
            <ContactForm />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;