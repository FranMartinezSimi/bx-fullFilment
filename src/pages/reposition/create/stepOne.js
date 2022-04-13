import React, { useMemo, useCallback, useState } from 'react';
import { setHours, setMinutes } from 'date-fns';
import cs from 'classnames';

import { useAuth } from 'context/userContex';
import { useReposition } from 'context/useReposition';
import { useInventory } from 'hooks/useInventory';

import InputWithLabel from 'components/Molecules/Form/InputWithLabel';
import InputDateWithLabel from 'components/Molecules/Form/InputDateWithLabel';
import DropZone from 'components/Molecules/DropZone';
import { InputRadio } from 'components/Atoms/Form/Input';
import Card from 'components/Molecules/Card';
import DialogModal from 'components/Templates/DialogModal';
import UploadCsvFull from 'components/Molecules/UploadCsvFull';
import plantillaCsv from 'assets/plantilla.csv';
import loadArrowOrange from 'assets/brand/loadarrowOrange.svg';
import ValidationMessageModal from 'components/Templates/ValidationMessageModal';

import AlertModal from 'components/Templates/AlertModal';
import AlertInfo from 'components/Molecules/AlertInfo';
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
    updateQuantitiesToRepositionBySku,
    setProductsToReposition,
    productsWithErrorToReposition,
    setProductsWithErrorToReposition,
  } = useReposition();
  const { invetoryKeyedBySku } = useInventory();
  const [showModalChangeMode, setShowModalChangeMode] = useState({
    show: false,
    prevMode: null,
    mode: null,
  });
  const [showValidationModal, setShowValidationModal] = useState(false);
  const [nextReposition, setNextReposition] = useState({
    isError: false,
    message: null,
  });

  const minDate = useMemo(() => new Date(), []);
  const isDisabledNextButton = useMemo(() => {
    const { selectedMode } = formToReposition;

    if (selectedMode === 'files' && !productsToReposition.length) {
      return true;
    }

    return !selectedMode;
  }, [formToReposition, productsToReposition]);

  const handleRadioChange = useCallback(
    (event) => {
      event.preventDefault();
      const mode = event.target.value;

      if (
        formToReposition.selectedMode !== null
        && productsToReposition.length
      ) {
        setShowModalChangeMode({
          show: true,
          prevMode: formToReposition.selectedMode,
          mode,
        });

        return;
      }

      setSelectedModeToReposition(mode);
    },
    [
      setSelectedModeToReposition,
      formToReposition.selectedMode,
      productsToReposition,
    ],
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

  const isSkuSelected = useMemo(
    () => formToReposition.selectedMode === 'sku',
    [formToReposition.selectedMode],
  );

  const isFilesSelected = useMemo(
    () => formToReposition.selectedMode === 'files',
    [formToReposition.selectedMode],
  );

  const onErrorUploadFile = useCallback((errorUpload) => {
    if (!errorUpload.length) return;

    const { key, errors } = errorUpload[0] || {};
    setNextReposition({ isError: true, message: `${key} ${errors[0] || ''}` });
  }, []);

  const onChangeUploadFile = useCallback(
    (csvData) => {
      if (!csvData || !csvData.length) return;

      const inventoryAdapter = csvData.reduce(
        (acum, csvValue) => {
          const { SKU, CANTIDAD, DESCRIPCION } = csvValue;
          const foundInventory = invetoryKeyedBySku[SKU];

          if (foundInventory) {
            updateQuantitiesToRepositionBySku(SKU, Number(CANTIDAD));
            return {
              ...acum,
              productsToReposition: acum.productsToReposition.concat({
                ...foundInventory,
                statusProcess: 'Agregado',
              }),
            };
          }

          return {
            ...acum,
            productsWithErros: acum.productsWithErros.concat({
              sku: SKU,
              description: DESCRIPCION,
              statusProcess: 'No existe',
            }),
          };
        },
        { productsToReposition: [], productsWithErros: [] },
      );

      setProductsToReposition(inventoryAdapter.productsToReposition);
      setProductsWithErrorToReposition(inventoryAdapter.productsWithErros);
      setShowValidationModal(true);
    },
    [invetoryKeyedBySku],
  );

  const columns = useMemo(
    () => [
      {
        Header: 'SKU',
        accessor: 'sku',
      },
      {
        Header: 'Descripción',
        accessor: 'description',
      },
      {
        Header: 'Estado',
        accessor: 'statusProcess',
      },
    ],
    [],
  );

  const dataTable = useMemo(
    () => [...productsToReposition, ...productsWithErrorToReposition],
    [productsToReposition, productsWithErrorToReposition],
  );

  const toggleValidationModal = useCallback(
    () => setShowValidationModal((prevState) => !prevState),
    [],
  );

  const resetNextReposition = useCallback(() => {
    setNextReposition({ isError: false, message: null });
  }, []);

  const nextStep = useCallback(() => {
    if (!formToReposition.date) {
      setNextReposition({
        isError: true,
        message:
          'Selecciona fecha y hora en que deseas programar tu reposición.',
      });
      return;
    }

    setStep(1);
  }, [formToReposition.date]);

  const typeValidationMessage = useMemo(() => {
    if (productsToReposition.length && productsWithErrorToReposition.length) {
      return 'warning';
    }
    if (!productsToReposition.length && productsWithErrorToReposition.length) {
      return 'error';
    }

    return 'success';
  }, [productsToReposition, productsWithErrorToReposition]);

  return (
    <div className={cs(styles.container, 'row')}>
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
              lableClassName="mb-4"
            />
          </div>
          <div className="col-6 mb-2">
            <InputWithLabel
              label="Nombre de contacto"
              value={seller.nameContact}
              id="contact_name"
              readOnly
              lableClassName="mb-4"
            />
          </div>
          <div className="col-6 mb-2">
            <InputWithLabel
              label="Teléfono de contacto"
              value={seller.phoneContact}
              id="phone_number"
              readOnly
              lableClassName="mb-4"
            />
          </div>
          <div className="col-6 mb-2">
            <InputWithLabel
              label="Correo de contacto"
              value={seller.emailContact}
              id="email_address"
              readOnly
              lableClassName="mb-4"
            />
          </div>
          <div className="col-12 mt-4">
            <p className="subtitle">Carga de archivo</p>
            <p className="paragraph1">Facturas y/o Guía de despacho</p>
          </div>
          <div className="col-7 mb-2">
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
          {productsToReposition.length > 0 && isSkuSelected && (
            <div className="row mb-4">
              <AlertInfo>
                Has seleccionado
                {' '}
                {productsToReposition.length}
                {' '}
                SKU para reponer. Ingresa fecha, hora y
                luego presiona el boton “Siguiente”
              </AlertInfo>
            </div>
          )}
          <div className="row">
            <div className="col-6 mb-2">
              <p className="subtitle mb-2">Agenda tu reposición</p>
              <InputDateWithLabel
                lableClassName="mb-4"
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
            <div className="col-6 mb-2">
              <p className="subtitle mb-2">Carga de SKU</p>
              <div className="mb-3">
                <InputRadio
                  id="sku"
                  label="SKU"
                  onChange={handleRadioChange}
                  value="sku"
                  checked={isSkuSelected}
                />
              </div>
              <div>
                <InputRadio
                  id="files"
                  label="Archivo"
                  onChange={handleRadioChange}
                  value="files"
                  checked={isFilesSelected}
                />
              </div>
            </div>
          </div>
          {isFilesSelected && (
            <div className="row d-flex justify-content-center mb-4 mt-2">
              <div className="col-12">
                <Card className="my-4 py-4 px-5 shadow">
                  <div className="row">
                    <div className="col-12 d-flex justify-content-center align-items-center">
                      <p className="subtitle">Carga tu archivo</p>
                    </div>
                    <div className="col-12 d-flex justify-content-center align-items-center">
                      <p className="paragraph2">formato excel, csv</p>
                    </div>
                    <div className="mt-3 col-12 d-flex justify-content-center align-items-center">
                      <UploadCsvFull
                        size="medium"
                        onChange={onChangeUploadFile}
                        description="Arrastra tu archivo o selecciona desde tu computadora"
                        setDataWhitErrors={onErrorUploadFile}
                      />
                    </div>
                    <div className="mt-5 mb-2 col-12 d-flex justify-content-start align-items-center">
                      <a
                        href={plantillaCsv}
                        className="btn btn-complementary"
                        download="planilla_resposicion"
                      >
                        <img src={loadArrowOrange} alt="Download" width="16" />
                        <span className="ps-2"> Planilla de Resposición</span>
                      </a>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          )}
          {!isFilesSelected ? (
            <div className={styles.contentBottomBtn}>
              <button
                type="button"
                className={cs(styles.nextButton, 'btn btn-secondary', {
                  [styles.disabled]: isDisabledNextButton,
                })}
                disabled={isDisabledNextButton}
                onClick={nextStep}
              >
                Siguiente
              </button>
            </div>
          ) : (
            <div className="row">
              <div className="col-12 d-flex justify-content-end">
                <button
                  type="button"
                  className={cs(styles.nextButton, 'btn btn-secondary')}
                  disabled={isDisabledNextButton}
                  onClick={nextStep}
                >
                  Siguiente
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <DialogModal
        showModal={showModalChangeMode.show}
        onAccept={onAcceptChangeMode}
        onCancel={onCancelChangeMode}
      >
        <span className="text-center">
          Al cambiar de opción, se perderán los datos ingresados.
          <br />
          ¿Deseas continuar?
        </span>
      </DialogModal>
      <ValidationMessageModal
        showModal={showValidationModal}
        onAccept={toggleValidationModal}
        onClose={toggleValidationModal}
        type={typeValidationMessage}
        leftIndicatorText="Ingresados"
        leftIndicatorValue={dataTable.length}
        centerIndicatorText="Errores"
        centerIndicatorValue={productsWithErrorToReposition.length}
        rightIndicatorText="Validos"
        rightIndicatorValue={productsToReposition.length}
        columns={columns}
        dataTable={dataTable}
      />
      <AlertModal
        showModal={nextReposition.isError}
        message={nextReposition.message}
        onClose={resetNextReposition}
      />
    </div>
  );
};

export default StepOne;
