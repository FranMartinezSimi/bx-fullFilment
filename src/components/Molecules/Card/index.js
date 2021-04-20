import React from 'react'

const Card = ({ title, subtitle, children }) => {
  return (
    <div className="card py-4 px-3" style={{borderRadius: '15px', border: 'none'}}>
      {title 
        ? (
          <ul className="d-flex w-100 justify-content-between">
            <li>
              <h4>{title}</h4>
              {subtitle && (
                <p>{subtitle}</p>
              )}
            </li>
            <li>X</li>
          </ul>
        )
      : (
        <div className="d-flex justify-content-end">
          <span aria-hidden="true" className="p-0 pe-3" style={{fontSize: '22px'}}>&times;</span>
        </div>
      )}
      <div className="card-body">
        {children}
      </div>
    </div>
  );
}
 
export default Card;