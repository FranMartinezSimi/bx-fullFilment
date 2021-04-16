import React from 'react'
import styles from './styles.module.scss'

const Sidebar = ({ activeNavbar }) => {
  return ( 
    <nav className={`${styles.navigation} ${activeNavbar ? styles.navigationOpen : styles.navigationClose} shadow bg-white p-4`}>
      <div className="text-center">
        <img src="./png/logo.png" alt="Blue express"/>
      </div>
      <ul className={`${styles.navigationContent} d-flex flex-column justify-content-between my-4`}>
        <li>
          <ul>
            <li className="py-2 my-2">
              <div className="d-flex justify-content-between w-100">
                <div className={`${activeNavbar ? 'pe-4' : ' w-100 text-center'}`}>
                  <img src="./png/home.png" alt="Home"/>
                </div>
                  {activeNavbar && (
                    <div>
                        <p><b>Dashboard</b></p>
                    </div>
                  )}
              </div>
            </li>
            <li className="py-2 my-2">
              <div className="d-flex justify-content-between w-100">
                <div className={`${activeNavbar ? 'pe-4' : ' w-100 text-center'}`}>
                  <img src="./png/list.png" alt="Home"/>
                </div>
                  {activeNavbar && (
                    <div>
                        <p><b>Órdenes</b></p>
                    </div>
                  )}
              </div>
            </li>
            <li className="py-2 my-2">
              <div className="d-flex justify-content-between w-100">
                <div className={`${activeNavbar ? 'pe-4' : ' w-100 text-center'}`}>
                  <img src="./png/box.png" alt="Home"/>
                </div>
                  {activeNavbar && (
                    <div>
                        <p><b>Inventario</b></p>
                    </div>
                  )}
              </div>
            </li>
            <li className="py-2 my-2">
              <div className="d-flex justify-content-between w-100">
                <div className={`${activeNavbar ? 'pe-4' : ' w-100 text-center'}`}>
                  <img src="./png/te.png" alt="Home"/>
                </div>
                  {activeNavbar && (
                    <div>
                        <p><b>Servicios</b></p>
                    </div>
                  )}
              </div>
            </li>
          </ul>
        </li>
        <li className="d-">
          <ul>
            <li className="py-2 my-2 text-center">
              <img src="./png/setting.png" alt="Home"/>
            </li>
            <li className="py-2 my-2 text-center">
              <img src="./png/search.png" alt="Home"/>
            </li>
            <li className="py-2 my-2 text-center">
              <img src="./png/help.png" alt="Home"/>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
   );
}
 
export default Sidebar;
