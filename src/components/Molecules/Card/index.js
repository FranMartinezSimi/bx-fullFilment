import React from 'react'

const Card = ({ title, subtitle, children }) => {
  return (
    <div className="card py-4" style={{borderRadius: '15px'}}>
      {title 
        ? (
          <ul className="d-flex w-100 justify-content-between px-5">
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
        <div className="d-flex justify-content-end px-5">
          <div>X</div>
        </div>
      )}
      <div className="card-body px-5">
        {children}
      </div>
    </div>
  );
}
 
export default Card;