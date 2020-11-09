import React,{ useReducer } from 'react';
import { emailContactForm } from '../../actions/form';

const reducer = (state, action) => {
  switch (action.type) {
    case 'message':
      return {
        ...state,
        error: false,
        message: action.payload,
        success: false,
        buttonText: 'Send Message',
      };
    case 'name':
      return {
        ...state,
        error: false,
        name: action.payload,
        success: false,
        buttonText: 'Send Message',
      };
    case 'email':
      return {
        ...state,
        error: false,
        email: action.payload,
        success: false,
        buttonText: 'Send Message',
      };
    case 'submitStart':
      return { ...state, buttonText: 'Sending...' };
    case 'error':
      return { ...state, buttonText: 'Error', error: action.payload };
    case 'success':
      return {
        ...state,
        sent: true,
        name: '',
        message: '',
        email: '',
        buttonText: 'Sent',
        success: true,
      };
    default:
      return state;
  }
};

const ContactForm = props => {
  const [formState, dispatch] = useReducer(reducer, {
    message: '',
    name: '',
    email: '',
    sent: false,
    buttonText: 'Send Message',
    success: false,
    error: false,
  });

  const { authorEmail } = props;

  const { message, name, email, buttonText, success, error } = formState;

  const clickSubmit = e => {
    e.preventDefault();
    dispatch({ type: 'submitStart' });
    emailContactForm({ authorEmail, name, email, message }).then(data => {
      if (data.error) {
        dispatch({ type: 'error', payload: data.error });
      } else {
        dispatch({ type: 'success' });
      }
    });
  };

  const handleChange = (e, name) => {
    dispatch({ type: name, payload: e.target.value });
  };

  const showSuccess = () => {
    return (
      success && (
        <div className="alert alert-info">Thank you for contacting.</div>
      )
    );
  };

  const showError = () => {
    return error && <div className="alert alert-danger">{error}</div>;
  };

  const contactForm = () => {
    return (
      <form className="pb-5" onSubmit={clickSubmit}>
        <div className="form-group">
          <label className="lead">Message</label>
          <textarea
            className="form-control"
            value={message}
            required
            onChange={e => handleChange(e, 'message')}
            rows="10"
          />
        </div>
        <div className="form-group">
          <label className="lead">Name</label>
          <input
            type="text"
            value={name}
            onChange={e => handleChange(e, 'name')}
            className="form-control"
            required
          />
        </div>

        <div className="form-group">
          <label className="lead">Email</label>
          <input
            type="text"
            value={email}
            onChange={e => handleChange(e, 'email')}
            className="form-control"
            required
          />
        </div>

        <div>
          <button className="btn btn-primary">{buttonText}</button>
        </div>
      </form>
    );
  };

  return (
    <React.Fragment>
      {showSuccess()}
      {showError()}
      {contactForm()}
    </React.Fragment>
  );
};

export default ContactForm;