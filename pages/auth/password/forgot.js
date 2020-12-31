import { useState } from 'react';
import Layout from '../../../components/Layout';
import { forgotPassword } from '../../../actions/auth';

const ForgotPassword = () => {
  const [values, setValues] = useState({
    email: '',
    message: '',
    error: '',
    showForm: true,
  });

  const { email, message, error, showForm } = values;

  const handleChange = (e, name) => {
    setValues({ ...values, message: '', error: '', [name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setValues({ ...values, message: '', error: '' });
    forgotPassword({ email }).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error, message: '' });
      } else {
        setValues({
          ...values,
          message: data.message,
          email: '',
          error: '',
          showForm: false,
        });
      }
    });
  };

  const showError = () => {
    return error && <div className="alert alert-danger">{error}</div>;
  };

  const showMessage = () => {
    return message && <div className="alert alert-success">{message}</div>;
  };

  const passwordForgotForm = () => {
    return (
      showForm && (
        <div>
          <form onSubmit={handleSubmit}>
            <div className="form-group pt-5">
              <input
                type="email"
                onChange={e => handleChange(e, 'email')}
                className="form-control"
                value={email}
                placeholder="abc@example.com"
                required
              />
            </div>
            <div>
              <button className="btn btn-primary">
                Send password reset link
              </button>
            </div>
          </form>
        </div>
      )
    );
  };

  return (
    <Layout>
      <div className="container text-center">
        <h2>Forgot password</h2>
        <hr />
        {showError()}
        {showMessage()}
        {passwordForgotForm()}
      </div>
    </Layout>
  );
};

export default ForgotPassword;