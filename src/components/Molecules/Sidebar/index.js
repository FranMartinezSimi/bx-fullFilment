import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useKeyclockAuth } from 'context/userKeyclockContext';
import jwt from 'jwt-decode';
import LogoBlue from 'assets/brand/logoBlue.svg';
import Home from 'assets/brand/home.svg';
import Box from 'assets/brand/box.svg';
import Tag from 'assets/brand/label.svg';
import Todo from 'assets/brand/todo.svg';
import { BxChevronRight, BxChevronLeft } from '@bx-design/react-icons';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';

const Sidebar = ({ className, activeNavbar, setActiveNavbar }) => {
  const { userKeyclock } = useKeyclockAuth();
  const history = useHistory();

  let resolutor;
  if (userKeyclock) {
    const userKeyclockData = JSON.parse(userKeyclock);
    const TOKEN = userKeyclockData.access_token;
    const USER_DATA = jwt(TOKEN);
    resolutor = USER_DATA.realm_access.roles.some((item) => item === 'fulfillment-resolutor');
  }
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
      childrenActive: false,
      children: [
        {
          name: 'Carga de Órdenes',
          route: '/ordenes/subir-ordenes',
        },
        {
          name: 'Listado de Órdenes',
          route: '/ordenes',
        },
        {
          name: 'Reporte de Mensual',
          route: '/ordenes/reporte-mensual',
        },
      ],
    },
    {
      name: 'Inventario',
      img: Box,
      active: true,
      route: '/inventario',
      childrenActive: false,
      children: [
        {
          name: 'Crear Sku',
          route: '/inventario/sku',
        },
        {
          name: 'Listado de Inventario',
          route: '/inventario',
        },
        {
          name: 'Listado de Reposición',
          route: '/reposition',
        },
        {
          name: 'Meses de Inventario',
          route: '/meses-de-inventario',
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
  const resolutorLinks = [
    {
      name: 'Dashboard',
      img: Home,
      active: true,
      route: '/',
    },
    {
      name: 'Incidencias',
      img: Tag,
      active: true,
      route: '/incidencias',
    },
  ];
  let links;
  if (!resolutor) {
    links = primaryLinks;
  } else {
    links = resolutorLinks;
  }

  const [currentLinks, setCurrentLinks] = useState(links);

  const handleClick = (e) => {
    e.preventDefault();
    setActiveNavbar(!activeNavbar);
  };

  const handleClickItem = (e, key) => {
    e.preventDefault();
    const newArray = currentLinks;
    if (activeNavbar) {
      newArray[key] = {
        ...newArray[key],
        childrenActive: !newArray[key].childrenActive,
      };
      setCurrentLinks([...newArray]);
    } else {
      history.push(newArray[key].route);
    }
  };
  const handleHoverItem = (e, key) => {
    e.preventDefault();
    if (!activeNavbar) {
      setCurrentLinks(links);
      const newArray = links;
      newArray[key] = {
        ...newArray[key],
        childrenActive: !newArray[key].childrenActive,
      };
      setCurrentLinks([...newArray]);
    }
  };
  const handleLeaveItem = () => {
    if (!activeNavbar) {
      setCurrentLinks(links);
    }
  };
  return (
    <aside className={`${className} shadow bg-white  d-none d-lg-block`}>
      <nav
        className={`${styles.navigation} ${activeNavbar ? styles.navigationOpen : styles.navigationClose}`}
        onMouseLeave={() => handleLeaveItem()}
      >
        <a href="!#" onClick={handleClick} className={`${styles.navigationToggle}`}>
          <span className={styles.navigationToggleSymbol}>
            {activeNavbar ? (
              <BxChevronLeft
                color="white"
                size="14"
              />
            ) : (
              <BxChevronRight
                color="white"
                size="14"
              />
            )}
          </span>
        </a>
        <div>
          <div className="text-center my-4 pb-4 d-none d-lg-block">
            <Link to="/">
              <img src={LogoBlue} alt="Blue express" width="62" />
            </Link>
          </div>
          <ul className="d-flex flex-column align-items-center my-4">
            <li>
              <ul className={`${activeNavbar ? styles.innerMenu : ''} whole`}>
                {currentLinks.map((item, key) => (
                  <li
                    className={`${item.active ? '' : 'd-none'} py-2 my-3`}
                    key={item.name}
                  >
                    <a
                      href="!#"
                      className="itemLi"
                      onClick={(e) => handleClickItem(e, key)}
                      onMouseEnter={(e) => handleHoverItem(e, key)}
                    >
                      <div className={`d-flex ${activeNavbar ? 'w-100' : ''}`}>
                        <div className={`${styles.navigationItemImg} me-2`}>
                          <img src={item.img} alt={item.name} width="22" />
                        </div>
                        <div className={`${styles.navigationItemText} ${activeNavbar ? '' : 'd-none'}`}>
                          <p className="ms-3 mt-1 mb-0 display-font" style={{ fontSize: 15 }}>
                            <b>
                              {item.children?.length > 0 ? (
                                <span>
                                  {item.name}
                                </span>
                              ) : (
                                <Link to={`${item.route}`}>
                                  {item.name}
                                </Link>
                              )}
                            </b>
                          </p>
                        </div>
                        {activeNavbar && item.children?.length > 0 && (
                          <div className={`ms-auto ${item.childrenActive ? styles.rotateIcon : styles.normalIcon}`}>
                            <BxChevronRight
                              color="#ff7e44"
                              size="16"
                            />
                          </div>
                        )}
                      </div>
                    </a>
                    {item.children?.length > 0 && item.childrenActive && (
                      <ul className={`mb-2 ${activeNavbar ? styles.subListOpen : styles.subListClose}`}>
                        {item.children.map((subItem) => (
                          <li className="py-2" key={subItem.route}>
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
          </ul>
        </div>
      </nav>
    </aside>
  );
};

Sidebar.propTypes = {
  activeNavbar: PropTypes.bool.isRequired,
};

export default Sidebar;
