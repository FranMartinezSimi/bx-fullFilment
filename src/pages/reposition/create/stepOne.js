import React, { useMemo, useCallback } from 'react';
import { setHours, setMinutes } from 'date-fns';
import cs from 'classnames';

import { useAuth } from 'context/userContex';
import { useReposition } from 'context/useReposition';

import InputWithLabel from 'components/Molecules/Form/InputWithLabel';
import InputDateWithLabel from 'components/Molecules/Form/InputDateWithLabel';
import DropZone from 'components/Molecules/DropZone';
import { InputRadio } from 'components/Atoms/Form/Input';
import Card from 'components/Molecules/Card';

import styles from './stepOne.module.scss';

const StepOne = () => {
  const { seller } = useAuth();
  const {
    formToReposition,
    setDateToReposition,
    setFilesToReposition,
    setSelectedModeToReposition,
  } = useReposition();

  const minDate = useMemo(() => new Date(), []);

  const handleRadioChange = useCallback(
    (event) => {
      event.preventDefault();
      setSelectedModeToReposition(event.target.value);
    },
    [setSelectedModeToReposition],
  );

  return (
    <div className="row">
      <div className="col-6 px-5">
        <div className="row">
          <div className="col-12 py-2">
            <p className="subtitle">Datos de Contacto</p>
          </div>
          <div className="col-6 mb-2">
            <InputWithLabel
              label="Nombre del Seller"
              value={seller.nameSeller}
              id="seller_name"
              readOnly
            />
          </div>
          <div className="col-6 mb-2">
            <InputWithLabel
              label="Nombre de contacto"
              value={seller.nameContact}
              id="contact_name"
              readOnly
            />
          </div>
          <div className="col-6 mb-2">
            <InputWithLabel
              label="Teléfono de contacto"
              value={seller.phoneContact}
              id="phone_number"
              onChangeText={console.log}
              readOnly
            />
          </div>
          <div className="col-6 mb-2">
            <InputWithLabel
              label="Correo de contacto"
              value={seller.emailContact}
              id="email_address"
              onChangeText={console.log}
              readOnly
            />
          </div>
          <div className="col-12 my-2">
            <p className="subtitle">Agenda tu reposición</p>
          </div>
          <div className="col-6 mb-2">
            <InputDateWithLabel
              label="Fecha"
              id="date"
              format="dd/MM/yyyy h:mm aa"
              showTimeSelect
              selected={formToReposition.date}
              onChange={setDateToReposition}
              minDate={minDate}
              minTime={setHours(setMinutes(minDate, 30), 8)}
              maxTime={setHours(setMinutes(minDate, 30), 16)}
            />
          </div>
          <div className="col-12 my-2">
            <p className="subtitle">Carga de archivo</p>
            <p className="paragraph1">Facturas y/o Guía de despacho</p>
          </div>
          <div className="col-6 mb-2">
            <DropZone
              setSelectedFiles={setFilesToReposition}
              size="small"
              internalTitle="Arrastra tu archivo o selecciona desde tu computadora en formato jpg - png o pdf"
              noValidation
            />
          </div>
        </div>
      </div>
      <div className="col-6">
        <div className={cs(styles.contentTwo, 'px-5 py-2')}>
          <div className="row">
            <div className="col-12 mb-2">
              <p className="subtitle">Carga de archivo</p>
            </div>
            <div className="col-12 mb-2">
              <InputRadio
                id="sku"
                label="SKU"
                onChange={handleRadioChange}
                value="sku"
                checked={formToReposition.selectedMode === 'sku'}
              />
            </div>
            <div className="col-12">
              <InputRadio
                id="files"
                label="Archivo"
                onChange={handleRadioChange}
                value="files"
                checked={formToReposition.selectedMode === 'files'}
              />
            </div>
          </div>
          {formToReposition.selectedMode === 'files' && (
            <div className="row d-flex justify-content-center mt-4">
              <div className="col-10">
                <Card className="my-4 py-4 px-5 shadow">
                  <div className="row">
                    <div className="col-12 d-flex justify-content-center align-items-center">
                      <p className="subtitle">Carga tu archivo</p>
                    </div>
                    <div className="col-12 d-flex justify-content-center align-items-center">
                      <p className="paragraph2">formato excel, csv</p>
                    </div>
                    <div className="mt-3 col-12 d-flex justify-content-center align-items-center">
                      AQUI VA EL DROPZONE
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          )}
          <div className={styles.contentBottomBtn}>
            <button
              type="button"
              className={cs('btn btn-secondary', {
                [styles.disabled]: formToReposition.selectedMode === null,
              })}
              disabled={formToReposition.selectedMode === null}
            >
              Siguiente
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepOne;
