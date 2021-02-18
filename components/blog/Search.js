import Link from 'next/link';
import { useReducer } from 'react';
import { listSearch } from '../../actions/blog';

const initialState = {
  search: '',
  results: [],
  searched: false,
  message: '',
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'inputSearch':
      return { ...state, search: action.payload, searched: false, results: [] };
    case 'results':
      return {
        ...state,
        search: '',
        results: action.payload,
        searched: true,
        message: `${action.payload.length} blogs are found`,
      };
    default:
      return state;
  }
};

const Search = () => {
  const [searchState, dispatch] = useReducer(reducer, initialState);
  const { search, results, searched, message } = searchState;

  const searchSubmit = e => {
    e.preventDefault();
    listSearch({ search }).then(data => {
      dispatch({ type: 'results', payload: data });
    });
  };

  const handleChange = e => {
    dispatch({ type: 'inputSearch', payload: e.target.value });
  };

  const searchedBlogs = results => {
    return (
      <div className="jumbotron bg-white">
        {message && <p className="pt-4 text-muted font-italic">{message}</p>}
        {results.map((blog, i) => (
          <div key={i}>
            <Link href={`/blogs/${blog.slug}`}>
              <a className="text-primary">{blog.title}</a>
            </Link>
          </div>
        ))}
      </div>
    );
  };

  const searchForm = () => (
    <form onSubmit={searchSubmit}>
      <div className="row">
        <div className="col-md-8">
          <input
            type="search"
            className="form-control"
            placeholder="Search blogs"
            onChange={handleChange}
            value={search}
          />
        </div>
        <div className="col-md-4">
          <button className="btn btn-block btn-outline-primary" type="submit">
            Search
          </button>
        </div>
      </div>
    </form>
  );

  return (
    <div className="container-fluid">
      <div className="pt-3 pb-5">{searchForm()}</div>
      {searched && (
        <div style={{ marginTop: '-100px', marginBottom: '-24px' }}>
          {searchedBlogs(results)}
        </div>
      )}
    </div>
  );
};

export default Search;
