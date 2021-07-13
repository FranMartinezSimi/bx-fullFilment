import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useAuth } from 'context/userContex';
import clientFetch from 'lib/client-fetch';
import jwt from 'jwt-decode';

import PageLayout from 'components/Templates/PageLayout';
import Card from 'components/Molecules/Card';
import NavigationDots from 'components/Atoms/NavigationDots';

import styles from './styles.module.scss';

const data = [
  {
    name: 'firstStep',
    active: true,
    title: '¡Bienvenido a Blue360!',
    subTitle: 'Gestiona tus órdenes e inventario',
    imgPath: './fulfill1.png',
    cardBg: '/onboarding-bg1.png',
    key: 0,
  },
  {
    name: 'secondStep',
    active: false,
    title: 'Revisa y carga tus órdenes',
    subTitle: 'Conoce sus estados y síguelas con nuestro tracking',
    imgPath: './onboarding-ico2.png',
    cardBg: '/onboarding-bg2.png',
    key: 1,
  },
  {
    name: 'thirdStep',
    active: false,
    title: 'Gestiona tu inventario',
    subTitle: 'Verifica la cantidad de tus productos y entérate de su stock.',
    imgPath: './onboarding-ico3.png',
    cardBg: '/onboarding-bg3.png',
    key: 2,
  },
  {
    name: 'fourthStep',
    active: false,
    title: 'Sincroniza con Shipedge',
    subTitle: 'Si ya tienes una cuenta Shipedge, sincronízala y así no perderás tu información.',
    imgPath: './onboarding-ico4.png',
    cardBg: '/onboarding-bg4.png',
    key: 3,
  },
];

const Onborading = () => {
  const { user, setUser } = useAuth();
  const [selectedItem, setSelectedItem] = useState([]);

  const handleClick = (e, item, direction) => {
    e.preventDefault();

    let nextItem;
    if (item >= 0 && direction === 'next') {
      nextItem = item + 1;
    }

    if (item <= 3 && direction === 'back') {
      nextItem = item - 1;
      console.log(nextItem);
    }
    if (nextItem === undefined) {
      return;
    }

    const newItems = selectedItem;

    const deactivateItems = newItems.map((items) => ({
      ...items,
      active: false,
    }));

    deactivateItems[nextItem] = {
      ...newItems[nextItem],
      active: true,
    };

    setSelectedItem([...deactivateItems]);
  };

  const handleClickDot = (e, key) => {
    e.preventDefault();
    const newItems = selectedItem;
    const deactivateItems = newItems.map((item) => ({
      ...item,
      active: false,
    }));
    deactivateItems[key] = {
      ...deactivateItems[key],
      active: true,
    };
    setSelectedItem([...deactivateItems]);
  };

  const handleClickGetOut = (e) => {
    e.preventDefault();
    const userData = JSON.parse(user);
    const TOKEN = window.localStorage.getItem('__access-token__');
    const USER_DATA = jwt(TOKEN);
    const { sub, name, email } = USER_DATA;

    clientFetch('user/sync-oms-shipedge/v1/validate', {
      headers: {
        key: userData.credential.key,
        warehouse: 'bx1',
        account_id: userData.credential.accountId,
        apikey: process.env.REACT_APP_API_KEY_KONG,
      },
      body: {
        sub,
        name,
        email,
        onboarding: true,
      },
    })
      .then((response) => {
        if (response.status === 'successful') {
          const bxBusinessActiveFulfillment = localStorage.setItem('bxBusinessActiveFulfillment', JSON.stringify(response));
          // setLoading(false);
          setUser(bxBusinessActiveFulfillment);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSelectedItem(data);
    }, 10);
    return () => clearTimeout(timeout);
  }, []);
  return (
    <PageLayout title="Bienvenido a Blue360" description="Bienvenido a Blue360" noBreadcrumb>
      <div className="container">
        <div className="content-wrapper row justify-content-center align-items-center">
          <div className="col-lg-9 col-xxl-8">
            <TransitionGroup className="todo-list position-relative" style={{ minHeight: 510 }}>
              {selectedItem.filter((item) => item.active).map((content) => (
                <CSSTransition
                  timeout={300}
                  classNames="alert"
                  unmountOnExit
                  key={content.name}
                >
                  <Card className={`${styles.card} shadow w-100`} cardBackground={content.cardBg}>
                    <ul className="d-flex flex-column justify-content-between mb-0" style={{ minHeight: '440px' }}>
                      <li className="my-4 text-center">
                        <div className={`${styles.cardImageContainer} m-auto mb-5`}>
                          <img src={content.imgPath} alt="imagen" />
                        </div>
                      </li>
                      <li className="text-center">
                        <h1 className="display-font">{content.title}</h1>
                        <p style={{ fontSize: 16 }}>{content.subTitle}</p>
                      </li>
                      <li className="text-center pt-4">
                        <ul className="d-flex justify-content-between align-items-center m-auto" style={{ maxWidth: '500px' }}>
                          <li className={`${styles.navigationList}`}>
                            {content.key > 0 && (
                              <a className={styles.navigationLink} href="#!" onClick={(e) => handleClick(e, content.key, 'back')}>
                                {'< '}
                                Atrás
                              </a>
                            )}
                          </li>
                          <li className={`${styles.navigationList}`}>
                            <NavigationDots list={selectedItem} setListItem={handleClickDot} />
                          </li>
                          <li className={`${styles.navigationList}`}>
                            {content.key < 3 && (
                              <a className={styles.navigationLink} href="#!" onClick={(e) => handleClick(e, content.key, 'next')}>
                                Continuar
                                {' >'}
                              </a>
                            )}
                          </li>
                        </ul>
                      </li>
                      <li className="d-flex w-100">
                        <a
                          href="#!"
                          className={`${styles.navigationLink} ms-auto`}
                          onClick={handleClickGetOut}
                        >
                          <u>Salir del tour</u>
                        </a>
                      </li>
                    </ul>
                  </Card>
                </CSSTransition>
              ))}
            </TransitionGroup>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Onborading;
