import React from 'react'
import { useHistory } from "react-router-dom";
import Button from '../../components/Atoms/Button'

const SecondStep = ({ setSelectedItem, setUser }) => {
  let history = useHistory();
  const handleClick = () => {
    setUser(true);
    history.push("/ordenes");
  }
  return (
    <>
      <div className="card-img mb-4">
        <img className="w-100" src="https://mdbootstrap.com/img/new/standard/nature/111.jpg" alt="imagen"/>
      </div>
      <ol className="p-0 ps-3">
        <li>
          <a href="https://www.shipedge.com/" target="_blank" rel="noreferrer">Ingresa a este link a Shipedge</a>
        </li>
        <li>
          <p>Copia tu Account ID y Key, (sigue los pasos de la imagen) y luego pégala en esta pantalla.</p>
        </li>
      </ol>
      <div className="pt-2">
        <form className="form">
          <div className="form-group">
            <label htmlFor="accountId" className="form-label text-uppercase w-100">
              <span>
                Account ID
              </span>
              <input 
                type="text"
                className="form-control mt-2"
                name="accountId"
                placeholder="Account ID"
              />
            </label>
          </div>
          <div className="form-group pt-2">
            <label htmlFor="key" className="form-label text-uppercase w-100">
              <span>
                Key
              </span>
              <input 
                type="text"
                className="form-control mt-2"
                name="key"
                placeholder="Key"
              />
            </label>
          </div>
        </form>
        <div className="text-center">
          <Button
            className="btn btn-primary mt-4"
            text="Siguiente"
            onClick={handleClick}
          />
        </div>
      </div>
    </>
  );
}

export default SecondStep;
