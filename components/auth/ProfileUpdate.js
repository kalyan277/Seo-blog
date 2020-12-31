import React,{ useReducer, useEffect } from 'react';
import { getCookie } from '../../actions/auth';
import { getProfile, update } from '../../actions/user';
import { updateUser } from '../../actions/auth';
const API =process.env.API
const initialState = {
  username: '',
  name: '',
  email: '',
  password: '',
  about: '',
  error: false,
  success: false,
  loading: false,
  photo: '',
  userData: '',
  imgSrc: '',
  containsImg: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'error':
      return {
        ...state,
        error: action.payload,
        loading: false,
        success: false,
      };
    case 'imgSrc':
      return { ...state, imgSrc: action.payload };

    case 'mount':
      return {
        ...state,
        username: action.payload.username,
        name: action.payload.name,
        email: action.payload.email,
        about: action.payload.about,
        userData: new FormData(),
        success: false,
        error: false,
        containsImg: false,
      };
    case 'success':
      return {
        ...state,
        username: action.payload.username,
        name: action.payload.name,
        email: action.payload.email,
        about: action.payload.about,
        userData: new FormData(),
        loading: false,
        success: true,
      };

    case 'username':
      return {
        ...state,
        username: action.payload,
        error: '',
        loading: false,
        success: false,
      };
    case 'name':
      return {
        ...state,
        name: action.payload,
        error: '',
        loading: false,
        success: false,
      };
    case 'email':
      return {
        ...state,
        email: action.payload,
        error: '',
        loading: false,
        success: false,
      };

    case 'password':
      return {
        ...state,
        password: action.payload,
        error: '',
        loading: false,
        success: false,
      };
    case 'about':
      return {
        ...state,
        about: action.payload,
        error: '',
        loading: false,
        success: false,
      };
    case 'loading':
      return { ...state, loading: true };
    case 'restart':
      return { ...state, success: false };
    case 'containsImg':
      return { ...state, containsImg: true };
    default:
      return state;
  }
};

const ProfileUpdate = () => {
  const [updateState, dispatch] = useReducer(reducer, initialState);

  const token = getCookie('token');
  const {
    username,
    name,
    email,
    imgSrc,
    password,
    error,
    success,
    loading,
    userData,
    about,
    containsImg,
  } = updateState;

  useEffect(() => {
    getProfile().then(data => {
      if (data.error) {
        dispatch({ type: 'error', payload: data.error });
      } else {
        dispatch({ type: 'imgSrc', payload: data.username });
        dispatch({ type: 'mount', payload: data });
      }
    });
  }, [token]);

  const handleChange = (e, name) => {
    dispatch({ type: 'restart' });
    //check the incoming event type
    const value = name === 'photo' ? e.target.files[0] : e.target.value;
    if (name === 'photo') {
      dispatch({ type: 'containsImg' });
    }
    //set the form data
    userData.set(name, value);
    if (name !== 'photo') {
      dispatch({ type: name, payload: value });
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    dispatch({ type: 'loading' });
    update(userData).then(data => {
      if (data.error) {
        dispatch({ type: 'error', payload: data.error });
      } else {
        updateUser(data, () => {
          dispatch({ type: 'imgSrc', payload: data.username });
          dispatch({ type: 'success', payload: data });
          if (containsImg) {
            window.location.reload();
          }
        });
      }
    });
  };

  const profileUpdateForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="btn btn-outline-info">
          Profile photo
          <input
            type="file"
            accept="image/*"
            onChange={e => handleChange(e, 'photo')}
            hidden
          />
        </label>
      </div>

      <div className="form-group">
        <label className="text-muted">Username</label>
        <input
          type="text"
          className="form-control"
          value={username}
          required
          onChange={e => handleChange(e, 'username')}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">name</label>
        <input
          type="text"
          className="form-control"
          value={name}
          required
          onChange={e => handleChange(e, 'name')}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">email</label>
        <input
          type="text"
          className="form-control"
          value={email}
          required
          onChange={e => handleChange(e, 'email')}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">About</label>
        <textarea
          type="text"
          className="form-control"
          value={about}
          onChange={e => handleChange(e, 'about')}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">password</label>
        <input
          type="password"
          className="form-control"
          value={password}
          onChange={e => handleChange(e, 'password')}
        />
      </div>
      <div>
        <button className="btn btn-primary">Submit</button>
      </div>
    </form>
  );

  const showError = () => {
    return error && <div className="alert alert-danger">{error}</div>;
  };

  const showSuccess = () => {
    return (
      success && <div className="alert alert-success">Profile updated</div>
    );
  };

  const showLoading = () =>
    loading ? (
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    ) : (
      ''
    );

  return (
    <React.Fragment>
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            {imgSrc && (
              <img
                src={`${API}api/user/photo/${imgSrc}`}
                alt="user profile"
                className="img img-thumbnail img-fluid mb-3"
                style={{ maxHeight: 'auto', maxWidth: '100%' }}
              />
            )}
          </div>
          <div className="col-md-8 mb-5">
            {showError()}
            {showLoading()}
            {showSuccess()}
            {profileUpdateForm()}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProfileUpdate;
