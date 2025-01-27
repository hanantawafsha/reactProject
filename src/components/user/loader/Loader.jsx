import React from 'react';

export default function Loader() {
  return (
    <div className='row d-flex flex-wrap justify-content-center text-center loader'>
      <div className="card" aria-hidden="true">
        <div className="card-body">
          <h5 className="card-title placeholder-glow">
            <span className="placeholder col-6"></span>
          </h5>
          <p className="card-text placeholder-glow">
            <span className="placeholder col-7"></span>
            <span className="placeholder col-4"></span>
            <span className="placeholder col-4"></span>
            <span className="placeholder col-6"></span>
            <span className="placeholder col-8"></span>
          </p>
          <a className="btn btn-secondary disabled placeholder col-6" aria-disabled="true"></a>
        </div>
      </div>
    </div>
  );
}
