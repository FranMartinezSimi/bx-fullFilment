
import React from 'react';
import arrowLeft from '../../../assets/brand/arrow-left.svg';

const MainLayout = ({ children }) => {
  return (
    <main className="container content-wrapper">
      <aside className="row">
        <div className="col-6">
          <ul className="d-flex">
            <li className="mr-2">
              <p>Home</p>
            </li>
            <li className="mr-2">
              <img src={arrowLeft} alt="" />
            </li>
            <li className="mr-2">
              <p>Ordenes</p>
            </li>
          </ul>
        </div>
      </aside>
      <article>
        <h1>Tus órdenes</h1>
      </article>
      <section>
        {children}
      </section>
    </main>
  );
}
 
export default MainLayout;