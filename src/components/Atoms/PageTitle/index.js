import React from 'react'

const PageTitle = ({title, subtitle, className}) => {
  return (
    <div className={className}>
      <h1 className="display-font" style={{fontWeight: 900}}>{title}</h1>
      {subtitle && 
        <h4 className="display-font" style={{fontWeight: 900, fontSize: "18px"}}>{subtitle}</h4>
      }
    </div>
  );
}
 
export default PageTitle;