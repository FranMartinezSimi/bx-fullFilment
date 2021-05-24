import React from 'react'
import Back from '../../../assets/brand/back.svg'

const Card = ({ className, title, subtitle, children, close, handleClose, back, handleBack, footer }) => {
  return (
    <div className={`card py-4 px-3 ${className}`} style={{borderRadius: '15px', border: 'none'}}>
      {title 
        ? (
          <ul className="d-flex w-100 justify-content-between">
            {back && (
              <li>
                <a href="#!" onClick={handleBack}>
                  <img src={Back} alt="volver"/>
                </a>
              </li>
            )}
            <li>
              {title && (
                <h4>{title}</h4>
              )}
              {subtitle && (
                <p>{subtitle}</p>
              )}
            </li>
            {close && (
              <li>
                <a href="#!" onClick={handleClose}>
                <span aria-hidden="true" className="p-0 pe-3" style={{fontSize: '22px'}}>&times;</span>
                </a>
              </li>
            )}
          </ul>
        )
      : null}
      <div className="card-body">
        {children}
      </div>
      {footer && footer}
    </div>
  );
}
 
export default Card;