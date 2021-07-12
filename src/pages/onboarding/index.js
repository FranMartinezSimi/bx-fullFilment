import { useState } from 'react';

import PageLayout from 'components/Templates/PageLayout';
import FirstStep from './FirstStep';
import SecondStep from './SecondStep';
import ThirdStep from './ThirdStep';
import FourthStep from './FourthStep';

const Onborading = () => {
  const [selectedItem, setSelectedItem] = useState('firstStep');
  let component;
  switch (selectedItem) {
    case 'secondStep':
      component = <SecondStep selectedItem={selectedItem} setSelectedItem={setSelectedItem} />;
      break;
    case 'thirdStep':
      component = <ThirdStep selectedItem={selectedItem} setSelectedItem={setSelectedItem} />;
      break;
    case 'fourthStep':
      component = <FourthStep selectedItem={selectedItem} setSelectedItem={setSelectedItem} />;
      break;
    default:
      component = <FirstStep selectedItem={selectedItem} setSelectedItem={setSelectedItem} />;
  }
  return (
    <PageLayout title="Bienvenido a Blue360" description="Bienvenido a Blue360" noBreadcrumb>
      <div className="container">
        <div className="content-wrapper row justify-content-center align-items-center">
          <div className="col-8">
            {component}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Onborading;
