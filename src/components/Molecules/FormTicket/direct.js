import Button from 'components/Atoms/Button';

const FormTicket = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const file = document.getElementById('testFile');
    const formdata = new FormData();
    formdata.append('archivo', file.files[0]);
    formdata.append('motivo', 'Cambio de dirección');
    formdata.append('descTicket', 'Prueba con adjunto de imagen');
    formdata.append('clienteID', '29');
    formdata.append('orderId', '46320');
    const requestOptions = {
      method: 'POST',
      body: formdata,
    };
    fetch('http://localhost:4000/api/fulfillment/ticket/v1/ticketera/addTicket', requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log('error', error));
  };
  return (
    <>
      <input type="file" id="testFile" />
      <Button
        className="btn btn-secondary fs-5 px-5"
        text="Crear"
        submit
        onClick={handleSubmit}
      />
    </>
  );
};

export default FormTicket;
