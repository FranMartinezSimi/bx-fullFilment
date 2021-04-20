import React from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.module.scss';

const Sidebar = ({ activeNavbar }) => {
  const primaryLinks = [
    {
      name: 'Dashboard',
      img: './png/home.png',
      active: false,
      route: '/',
    },
    {
      name: 'Órdenes',
      img: './png/list.png',
      active: true,
      route: '/ordenes',
    },
    {
      name: 'Inventario',
      img: './png/te.png',
      active: true,
      route: '/inventarios',
    },
  ];
  const secondaryLinks = [
    {
      name: 'Setings',
      img: './png/setting.png',
      active: false,
    },
    {
      name: 'Search',
      img: './png/search.png',
      active: false,
    },
    {
      name: 'Help',
      img: './png/help.png',
      active: false,
    },
  ];
  return ( 
    <nav className={`${styles.navigation} ${activeNavbar ? styles.navigationOpen : styles.navigationClose} shadow bg-white py-4 px-3 px-lg-4`}>
      <div className="">
        <img src="./png/logo.png" alt="Blue express"/>
      </div>
      <ul className={`${styles.navigationContent} d-flex flex-column justify-content-between my-4`}>
        <li>
          <ul>
            {primaryLinks.map((item) => (
              <li className={`${item.active ? '' : 'd-none'} py-2 my-2`} key={item.name}>
                <Link to={`${item.route}`}>
                  <div className={`d-flex ${activeNavbar ? '' : 'justify-content-center'}`}>
                    <div className={`${styles.navigationItemImg} me-2`}>
                      <img src={item.img} alt={item.name} width="20"/>
                    </div>
                    <div className={`${styles.navigationItemText} ${activeNavbar ? styles.navigationItemTextOpen : ''}`}>
                        <p className="mb-0"><b>{item.name}</b></p>
                    </div>
                  </div>
                </Link>


              </li>
            ))}
          </ul>
        </li>
        {secondaryLinks.some((item) => (item.active)) && (
          <li>
            <ul>
              {secondaryLinks.map((item) => (
                <li className={`${activeNavbar ? '' : 'text-center'} py-2 my-2`} key={item.name}>
                  <img src={item.img} alt={item.name} width="20"/>
                </li>
              ))}
            </ul>
          </li>
        )}
      </ul>
    </nav>
   );
}
 
export default Sidebar;
