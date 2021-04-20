import React, { useState } from 'react'
import Card from '../../components/Molecules/Card'
import FirstStep from './FirstStep';
import SecondStep from './SecondStep';

const Sync = ({setUser}) => {
  const [selectedItem, setSelectedItem] = useState('firstStep');
  let component;
  switch (selectedItem) {
    case 'firstStep':
      component = <FirstStep setSelectedItem={setSelectedItem}/>
      break;
    case 'secondStep':
      component = <SecondStep setUser={setUser}/>
      break;
    default:
      component = (
        <p>Default</p>
      );
  }
  return (
    <Card>
      {component}
    </Card>
  );
}
 
export default Sync;
