import React, { useState } from 'react'
import Card from '../../components/Molecules/Card'
import FirstStep from './FirstStep';
import SecondStep from './SecondStep';
import FailStep from './FailStep';
import SuccessStep from './SuccessStep';

const Sync = ({setUser}) => {
  const [selectedItem, setSelectedItem] = useState('firstStep');
  let component;
  switch (selectedItem) {
    case 'firstStep':
      component = <FirstStep setSelectedItem={setSelectedItem}/>
      break;
    case 'secondStep':
      component = <SecondStep setUser={setUser} setSelectedItem={setSelectedItem}/>
      break;
    case 'failStep':
      component = <FailStep setUser={setUser} setSelectedItem={setSelectedItem}/>
      break;
    case 'successStep':
      component = <SecondStep setUser={setUser} setSelectedItem={setSelectedItem}/>
      break;
    default:
      component = <SuccessStep setSelectedItem={setSelectedItem}/>
  }
  return (
    <Card>
      {component}
    </Card>
  );
}
 
export default Sync;
