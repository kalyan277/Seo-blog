import { useReducer, useEffect } from 'react';
import jwt from 'jsonwebtoken';
import Layout from '../../../components/Layout'
import { signup } from '../../../actions/auth'
import { withRouter } from 'next/router';

const reducer = (state, action) => {
  switch (action.type) {
    case 'token':
      return {
        ...state,
        name: action.payload.name,
        token: action.payload.token,
      };
    case 'submit':
      return { ...state, loading: true, error: false };
    case 'error':
      return {
        ...state,
        error: action.payload,
        loading: false,
        showButton: false,
      };
    case 'success':
      return {
        ...state,
        loading: false,
        success: true,
        error: false,
        showButton: false,
      };
    default:
      return state;
  }
};

const ActivateAccount = props => {
  const { router } = props;
  const [valueState, dispatch] = useReducer(reducer, {
    name: '',
    token: '',
    error: '',
    loading: false,
    success: false,
    showButton: true,
  });

  const { name, token, error, loading, success, showButton } = valueState;

  useEffect(() => {
     const id = router.asPath.split('/');
     const token=id[4];
     
    if (token) {
     // console.log(token);
       //console.log(jwt.decode(token));
      const { name } = jwt.decode(token);
      dispatch({ type: 'token', payload: { token, name } });
    }
  }, [router]);

  const handleSubmit = () => {
    dispatch({ type: 'submit' });
    signup({ token }).then(data => {
      if (data.error) {
        dispatch({ type: 'error', payload: data.error });
      } else {
        dispatch({ type: 'success' });
      }
    });
  };

  const showLoading = () => {
    return loading && <h2>Loading...</h2>;
  };

  return (
    <Layout>
      <div className="container">
        <h3 className="pb-4">Hey {name}, Ready to activate your account?</h3>
        {showLoading()}
        {error && error}
        {success &&
          'You have successfully activated your account. Please signin.'}
        {showButton && (
          <button className="btn btn-outline-primary" onClick={handleSubmit}>
            Activate account
          </button>
        )}
      </div>
    </Layout>
  );
};

export default withRouter(ActivateAccount);