import React from 'react';
import { Link } from 'react-router-dom';
import LogoBlue from 'assets/brand/logoBlue.svg';
import Home from 'assets/brand/home.svg';
import Box from 'assets/brand/box.svg';
import Tag from 'assets/brand/label.svg';
import Todo from 'assets/brand/todo.svg';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';

const Sidebar = ({ activeNavbar, setActiveNavbar }) => {
  const primaryLinks = [
    {
      name: 'Dashboard',
      img: Home,
      active: true,
      route: '/',
    },
    {
      name: 'Órdenes',
      img: Todo,
      active: true,
      route: '/ordenes',
      children: [
        {
          name: 'Carga de Órdenes',
          route: '/ordenes/subir-ordenes',
        },
        {
          name: 'Listado de Órdenes',
          route: '/ordenes',
        },
      ],
    },
    {
      name: 'Inventario',
      img: Box,
      active: true,
      route: '/inventario',
      children: [
        {
          name: 'Listado de Inventario',
          route: '/inventario',
        },
        {
          name: 'Listado de Reposición',
          route: '/reposition',
        },
      ],
    },
    {
      name: 'Incidencias',
      img: Tag,
      active: true,
      route: '/incidencias',
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
  const handleClick = (e) => {
    e.preventDefault();
    setActiveNavbar(!activeNavbar);
  };
  return (
    <nav className={`${styles.navigation} ${activeNavbar ? styles.navigationOpen : styles.navigationClose} shadow bg-white py-4 px-3 px-lg-4`}>
      <a href="!#" onClick={handleClick} className={styles.navigationToggle} style={{ left: activeNavbar ? '185px' : '75px' }}>
        <span className={styles.navigationToggleSymbol}>
          {activeNavbar ? '<' : '>'}
        </span>
      </a>
      <div className="mb-5">
        <img src={LogoBlue} alt="Blue express" width="50" />
      </div>
      <ul className={`${styles.navigationContent} d-flex flex-column justify-content-between my-4`}>
        <li>
          <ul>
            {primaryLinks.map((item) => (
              <li className={`${item.active ? '' : 'd-none'} py-2 my-3`} key={item.name}>
                <Link to={`${item.route}`}>
                  <div className={`d-flex ${activeNavbar ? '' : 'justify-content-center align-items-center'}`}>
                    <div className={`${styles.navigationItemImg} me-2`}>
                      <img src={item.img} alt={item.name} width="20" />
                    </div>
                    <div className={`${styles.navigationItemText} ${activeNavbar ? styles.navigationItemTextOpen : ''}`}>
                      <p className="mb-0"><b>{item.name}</b></p>
                    </div>
                  </div>
                </Link>
                {item.children?.length > 0 && (
                  <ul className={`ps-5 ${activeNavbar ? styles.navigationSubItemTextOpen : styles.navigationSubItemTextColse}`}>
                    {item.children.map((subItem) => (
                      <li className="py-1">
                        <Link to={`${subItem.route}`}>
                          {subItem.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </li>
        {secondaryLinks.some((item) => (item.active)) && (
          <li>
            <ul>
              {secondaryLinks.map((item) => (
                <li className={`${activeNavbar ? '' : 'text-center'} py-2 my-2`} key={item.name}>
                  <img src={item.img} alt={item.name} width="20" />
                </li>
              ))}
            </ul>
          </li>
        )}
      </ul>
    </nav>
  );
};

Sidebar.propTypes = {
  activeNavbar: PropTypes.bool.isRequired,
};

export default Sidebar;
