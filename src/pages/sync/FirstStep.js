import React from 'react'

import Button from '../../components/Atoms/Button'

const FirstStep = ({setSelectedItem}) => (
  <>
    <div className="card-img mb-4">
      <img className="w-100" src="https://mdbootstrap.com/img/new/standard/nature/111.jpg" alt="imagen"/>
    </div>
    <h4>Gestiona tu bodega</h4>
    <p>Sincroniza tu cuenta Shipedge para acceder a tus órdenes de servicio e inventario.</p>
    <h4>¿Cómo hacerlo?</h4>
    <p>Sigue las instrucciones que te presentaremos a continuación.</p>
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