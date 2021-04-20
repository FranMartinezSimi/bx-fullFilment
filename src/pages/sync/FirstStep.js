import React from 'react'

import Button from '../../components/Atoms/Button'

const FirstStep = ({setSelectedItem}) => (
  <>
    <div className="card-img mb-4">
      <img className="w-100" src="./nonImg.jpg" alt="imagen"/>
    </div>
    <h4 className="display-font">Gestiona tu bodega</h4>
    <p className="display-font" style={{fontSize: '16px'}}>Sincroniza tu cuenta Shipedge para acceder a tus órdenes de servicio e inventario.</p>
    <h4 className="display-font">¿Cómo hacerlo?</h4>
    <p className="display-font" style={{fontSize: '16px'}}>Sigue las instrucciones que te presentaremos a continuación.</p>
    <div className="text-center pt-4">
      <Button
        className="btn btn-primary"
        text="Siguiente"
        onClick={() => setSelectedItem('secondStep')}
      />
    </div>
  </>
)
 
export default FirstStep;