import React, { useState } from 'react'
import Card from '../../components/Molecules/Card'
import FirstStep from './FirstStep';
import SecondStep from './SecondStep';
import FailStep from './FailStep';
import SuccessStep from './SuccessStep';
import LayoutUnAuth from 'components/Templates/LayoutUnAuth';

const Sync = () => {
  const [selectedItem, setSelectedItem] = useState('firstStep');
  let component;
  switch (selectedItem) {
    case 'firstStep':
      component = <FirstStep setSelectedItem={setSelectedItem}/>
      break;
    case 'secondStep':
      component = <SecondStep setSelectedItem={setSelectedItem}/>
      break;
    case 'failStep':
      component = <FailStep setSelectedItem={setSelectedItem}/>
      break;
    case 'successStep':
      component = <SuccessStep setSelectedItem={setSelectedItem}/>
      break;
    default:
      component = <SuccessStep setSelectedItem={setSelectedItem}/>
  }
  return (
    <LayoutUnAuth title="Sincroniza tu cuenta">
      <Card>
        {component}
      </Card>
    </LayoutUnAuth>
  );
}
 
export default Sync;
