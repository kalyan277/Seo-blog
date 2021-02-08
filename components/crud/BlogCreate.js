import { useReducer, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { withRouter } from 'next/router';
import { getCategory } from '../../actions/category';
import { getTag } from '../../actions/tag';
import { createBlog } from '../../actions/blog';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import '../../node_modules/react-quill/dist/quill.snow.css';
import { Quillformats, Quillmodules } from '../../components/helper/quill';

const initialState = {
  body: {},
  error: '',
  sizeError: '',
  success: false,
  loading: false,
  formData: '',
  title: '',
  hidePublishButton: false,
  categories: [],
  tags: [],
  checkedCat: [],
  checkedTag: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'title':
      return { ...state, title: action.payload, error: '' };
    case 'formData':
      return { ...state, formData: new FormData() };
    case 'error':
      return { ...state, error: action.payload, loading: false };
    case 'body':
      return { ...state, body: action.payload };
    case 'checkedCat':
      return { ...state, error: '', checkedCat: action.payload };
    case 'checkedTag':
      return { ...state, error: '', checkedTag: action.payload };
    case 'loading':
      return { ...state, loading: true };
    case 'init':
      //check if there is data in localStorage and save it in state
      return {
        ...state,
        body: action.payload.storedBlogData
          ? action.payload.storedBlogData
          : {},
        categories: action.payload.cat,
        tags: action.payload.tag,
        loading: false,
      };
    case 'success':
      return {
        ...state,
        error: '',
        title: '',
        body: {},
        success: `A new blog titled ${action.payload.title} is created`,
        loading: false,
        checkedCat: [],
        checkedTag: [],
      };
    default:
      return state;
  }
};

const BlogCreate = props => {
  const { router } = props;

  const [blogState, dispatch] = useReducer(reducer, initialState);

  //deConstruct from state
  const {
    body,
    error,
    success,
    formData,
    title,
    tags,
    loading,
    categories,
    checkedCat,
    checkedTag,
  } = blogState;


  //re-run the effect when the page reload
  useEffect(() => {
    //check loaclstorage if there's data
    const blogFromLS = () => {
      if (typeof window === 'undefined') {
        return false;
      }
      if (localStorage.getItem('blog')) {
        return JSON.parse(localStorage.getItem('blog'));
      } else {
        return false;
      }
    };

    const initData = storedBlogData => {
      dispatch({ type: 'loading' });
      getCategory().then(cat => {
        if (cat.error) {
          dispatch({ type: 'error', payload: cat.error });
        } else {
          getTag().then(tag => {
            if (tag.error) {
              dispatch({ type: 'error', payload: tag.error });
            } else {
              dispatch({ type: 'init', payload: { storedBlogData, cat, tag } });
            }
          });
        }
      });
    };
    dispatch({ type: 'formData' });
    const storedBlogData = blogFromLS();
    initData(storedBlogData);
  }, [router]);

  //handle form submission
  const publishBlog = e => {
    e.preventDefault();
     
    dispatch({ type: 'loading' });
    createBlog(formData).then(res => {
      if (res.title != undefined) {
        dispatch({ type: 'success', payload: res });  
        document.querySelectorAll('input[type=checkbox]').forEach( el => el.checked = false );  
      }
      else if (res.data.error != undefined) {
         dispatch({ type: 'error', payload: res.data.error  });
      
      }

    });
  };

  const handleChange = (e, name) => {
    //check the incoming event type
    const value = name === 'photo' ? e.target.files[0] : e.target.value;
    //set the form data
    formData.set(name, value);
    if (name !== 'photo') {
      dispatch({ type: name, payload: value });
    }
  };
  //console.log(checkedCat)
  const handleBody = e => {
    // console.log(event);
    formData.set('body', e);
    dispatch({ type: 'body', payload: e });
    //save the body detail in localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('blog', JSON.stringify(e));
    }
  };

  const handleCatToggle = cId => {
    const clickedCategory = checkedCat.indexOf(cId);
    const all = [...checkedCat];
    if (clickedCategory === -1) {
      all.push(cId);
    } else {
      all.splice(clickedCategory, 1);
    }
    dispatch({ type: 'checkedCat', payload: all });
    formData.set('categories', all);
    // dispatch();
  };

  const handleTagToggle = tId => {
    
    const clickedTag = checkedTag.indexOf(tId);
    const all = [...checkedTag];
    if (clickedTag === -1) {
      all.push(tId);
    } else {
      all.splice(clickedTag, 1);
    }
    // console.log(all);
    dispatch({ type: 'checkedTag', payload: all });
    formData.set('tags', all);
    // dispatch();
  };

  const showCategories = () => {
    return (
      categories &&
      categories.map((c, i) => (
        <li key={i} className="list-unstyled">
          <input
            onChange={() => handleCatToggle(c._id)}
            type="checkbox"
            className="mr-2"
          />
          <label className="form-check-label">{c.name}</label>
        </li>
      ))
    );
  };
  

  const showTags = () => {
    return (
      tags &&
      tags.map((t, i) => (
        <li key={i} className="list-unstyled">
          <input
            onChange={() => handleTagToggle(t._id)}
            type="checkbox"
            className="mr-2"
          />
          <label className="form-check-label">{t.name}</label>
        </li>
      ))
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

  const showError = () => {
    return error && <div className="alert alert-danger">{error}</div>;
  };

  const showSuccess = () => {
    return success && <div className="alert alert-success">{success}</div>;
  };

  const createBlogForm = () => {
    return (
      <form onSubmit={publishBlog}>
        <div className="form-group">
          <label className="text-muted">Title</label>
          <input
            className="form-control"
            value={title}
            onChange={e => handleChange(e, 'title')}
          />
        </div>

        <div className="form-group">
          <ReactQuill
            modules={Quillmodules}
            formats={Quillformats}
            value={body}
            placeholder="Write something amazing..."
            onChange={handleBody}
          />
        </div>

        <div>
          <button className="btn btn-primary" type="submit">
            Publish
          </button>
        </div>
      </form>
    );
  };

  return (
    <div className="container-fluid pb-5">
      <div className="row">
        <div className="col-md-8">
          {showLoading()}
          {createBlogForm()}
          <div className="pt-3">
            {showError()}
            {showSuccess()}
          </div>
        </div>
        <div className="col-md-4">
          <div>
            <div className="form-group pb-2">
              <h5>Featured image</h5>
              <hr />

              <small className="text-muted">Max size: 1mb</small>
              <label className="btn btn-outline-info">
                Upload featured image
                <input
                  type="file"
                  accept="image/*"
                  onChange={e => handleChange(e, 'photo')}
                  hidden
                />
              </label>
            </div>
          </div>

          <div>
            <h5>Categories</h5>
            <hr />
            <ul style={{ maxHeight: '200px', overflowY: 'scroll' }}>
              {showCategories()}
            </ul>
          </div>
          <div>
            <h5>Tags</h5>
            <hr />
            <ul style={{ maxHeight: '200px', overflowY: 'scroll' }}>
              {showTags()}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(BlogCreate);