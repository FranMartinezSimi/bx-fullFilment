import React from 'react'
import Button from '../../components/Atoms/Button';

const FailStep = ({ setSelectedItem }) => {
  const handleClick = () => {
    setSelectedItem('secondStep');
  }
  return (
    <>
      <h4 className="display-font text-center">Oh no :(</h4>
      <p className="display-font text-center mb-4" style={{fontSize: '16px'}}>No hemos podido sincronizar tu cuenta Shipedge.</p>
      <ol className="p-0 ps-3">
        <li>
          <p className="display-font" style={{fontSize: '16px'}}>Verifica que la información ingresada sea correcta.</p>
        </li>
        <li>
          <p className="display-font" style={{fontSize: '16px'}}>Recuerda seguir los pasos que te mostramos en la siguiente imagen:</p>
        </li>
      </ol>
      <div className="card-img my-4">
        <img className="w-100" src="./nonGif.jpg" alt="imagen"/>
      </div>
      <div className="text-center pt-5">
        <Button
          className="btn btn-primary"
          text="Reintentar"
          onClick={handleClick}
        />
      </div>
    </>
  );
}
 
export default FailStep;