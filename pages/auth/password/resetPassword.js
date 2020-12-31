import { useReducer } from 'react';
import Layout from '../../../components/Layout';
import { resetPassword } from '../../../actions/auth';
import { withRouter } from 'next/router';

const reducer = (state, action) => {
  switch (action.type) {
    case 'error':
      return { ...state, newPassword: '', error: action.payload, message: '' };
    case 'success':
      return {
        ...state,
        message: action.payload,
        showForm: false,
        error: '',
        newPassword: '',
      };
    case 'password':
      return { ...state, newPassword: action.payload, message: '', error: '' };
    default:
      return state;
  }
};

const ResetPassword = props => {
  const { router } = props;

  const [valueState, dispatch] = useReducer(reducer, {
    newPassword: '',
    error: '',
    message: '',
    showForm: true,
  });

  const { newPassword, error, message, showForm } = valueState;

  const handleSubmit = e => {
    e.preventDefault();
    const id = router.asPath.split('/');
    resetPassword({
      newPassword,
      resetPasswordLink: id[4],
    }).then(data => {
      if (data.error) {
        dispatch({ type: 'error', payload: data.error });
      } else {
        dispatch({ type: 'success', payload: data.message });
      }
    });
  };

  const handleChange = (e, name) => {
    dispatch({ type: name, payload: e.target.value });
  };

  const resetPasswordForm = () => {
    return (
      showForm && (
        <div>
          <form onSubmit={handleSubmit}>
            <div className="form-group pt-5">
              <input
                type="password"
                onChange={e => handleChange(e, 'password')}
                className="form-control"
                value={newPassword}
                placeholder="Type new password"
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

  const showError = () => {
    return error && <div className="alert alert-danger">{error}</div>;
  };

  const showMessage = () => {
    return message && <div className="alert alert-success">{message}</div>;
  };

  return (
    <Layout>
      <div className="container text-center">
        <h2>Reset password</h2>
        <hr />
        {showError()}
        {showMessage()}
        {resetPasswordForm()}
      </div>
    </Layout>
  );
};

export default withRouter(ResetPassword);