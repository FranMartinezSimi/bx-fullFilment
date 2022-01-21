import React, { useMemo, useCallback, useState } from 'react';
import { setHours, setMinutes } from 'date-fns';
import cs from 'classnames';

import { useAuth } from 'context/userContex';
import { useReposition } from 'context/useReposition';

import InputWithLabel from 'components/Molecules/Form/InputWithLabel';
import InputDateWithLabel from 'components/Molecules/Form/InputDateWithLabel';
import DropZone from 'components/Molecules/DropZone';
import { InputRadio } from 'components/Atoms/Form/Input';
import Card from 'components/Molecules/Card';
import DialogModal from 'components/Templates/DialogModal';

import styles from './stepOne.module.scss';

const StepOne = () => {
  const { seller } = useAuth();
  const {
    setStep,
    formToReposition,
    setDateToReposition,
    setFilesToReposition,
    setSelectedModeToReposition,
    resetReposition,
    productsToReposition,
  } = useReposition();
  const [showModalChangeMode, setShowModalChangeMode] = useState({
    show: false,
    prevMode: null,
    mode: null,
  });

  const minDate = useMemo(() => new Date(), []);
  const isDisabledNextButton = useMemo(() => {
    const { date, selectedMode } = formToReposition;

    return !date || !selectedMode;
  }, [formToReposition]);

  const handleRadioChange = useCallback(
    (event) => {
      event.preventDefault();
      const mode = event.target.value;

      if (formToReposition.selectedMode !== null && productsToReposition.length) {
        setShowModalChangeMode({
          show: true,
          prevMode: formToReposition.selectedMode,
          mode,
        });

        return;
      }

      setSelectedModeToReposition(mode);
    },
    [setSelectedModeToReposition, formToReposition.selectedMode, productsToReposition],
  );

  const onAcceptChangeMode = useCallback(() => {
    resetReposition();
    setSelectedModeToReposition(showModalChangeMode.mode);
    setShowModalChangeMode({
      show: false,
      mode: null,
      prevMode: null,
    });
  }, [showModalChangeMode]);

  const onCancelChangeMode = useCallback(() => {
    setShowModalChangeMode({
      show: false,
      mode: null,
      prevMode: null,
    });
  }, []);

  return (
    <div className="row">
      <div className="col-sm-6 col-12 px-5">
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
              label="Fecha y Hora"
              id="date"
              format="dd/MM/yyyy - h:mm aa"
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
      <div className="col-sm-6 col-12">
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
                [styles.disabled]: isDisabledNextButton,
              })}
              disabled={isDisabledNextButton}
              onClick={() => setStep(1)}
            >
              Siguiente
            </button>
          </div>
        </div>
      </div>
      <DialogModal
        showModal={showModalChangeMode.show}
        onAccept={onAcceptChangeMode}
        onCancel={onCancelChangeMode}
      >
        <span className="text-center">
          Si cambias de modo, tendrás que seleccionar nuevamente
          los productos a reponer
        </span>
      </DialogModal>
    </div>
  );
};

export default StepOne;
