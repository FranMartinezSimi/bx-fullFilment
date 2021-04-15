import React from 'react'
import styles from './styles.module.scss'

const Sidebar = () => {
  return ( 
    <nav className="shadow bg-white p-4">
      <img src="./png/logo.png" alt="Blue express" className="w-100"/>
      <ul className={`${styles.navigation} d-flex flex-column justify-content-between my-4`}>
        <li>
          <ul>
            <li className="py-2 my-2 text-center">
              <img src="./png/home.png" alt="Home"/>
            </li>
            <li className="py-2 my-2 text-center">
              <img src="./png/list.png" alt="Home"/>
            </li>
            <li className="py-2 my-2 text-center">
              <img src="./png/box.png" alt="Home"/>
            </li>
            <li className="py-2 my-2 text-center">
              <img src="./png/te.png" alt="Home"/>
            </li>
          </ul>
        </li>
        <li>
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
