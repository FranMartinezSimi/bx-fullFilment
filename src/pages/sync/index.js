import { useState } from 'react';
import { useKeyclockAuth } from 'context/userKeyclockContext';
import { useAuth } from 'context/userContex';

import LayoutUnAuth from 'components/Templates/LayoutUnAuth';
import Card from 'components/Molecules/Card';
import FirstStep from './FirstStep';
import SecondStep from './SecondStep';
import FailStep from './FailStep';
import SuccessStep from './SuccessStep';

const Sync = () => {
  const [selectedItem, setSelectedItem] = useState('firstStep');
  const { setUserKeyclock } = useKeyclockAuth();
  const { setUser } = useAuth();

  const signOut = (e) => {
    e.preventDefault();
    localStorage.removeItem('bxBusinessActiveSession');
    localStorage.removeItem('__access-token__');
    localStorage.removeItem('__refresh-token__');
    localStorage.removeItem('bxBusinessActiveFulfillment');
    setUser(null);
    setUserKeyclock(null);
  };
  let component;
  switch (selectedItem) {
    case 'firstStep':
      component = <FirstStep setSelectedItem={setSelectedItem} signOut={signOut} />;
      break;
    case 'secondStep':
      component = <SecondStep setSelectedItem={setSelectedItem} />;
      break;
    case 'failStep':
      component = <FailStep setSelectedItem={setSelectedItem} signOut={signOut} />;
      break;
    case 'successStep':
      component = <SuccessStep setSelectedItem={setSelectedItem} />;
      break;
    default:
      component = <SuccessStep setSelectedItem={setSelectedItem} />;
  }
  return (
    <LayoutUnAuth title="Sincroniza tu cuenta">
      <Card className="shadow">
        {component}
      </Card>
    </LayoutUnAuth>
  );
};

export default Sync;
