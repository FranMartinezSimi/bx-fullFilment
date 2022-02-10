import React, { useMemo, useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { useReposition } from 'context/useReposition';

import PageLayout from 'components/Templates/PageLayout';
import PageTitle from 'components/Atoms/PageTitle';
import Card from 'components/Molecules/Card';
import StepOne from './stepOne';
import StepTwo from './stepTwo';

export default function CreateReposition() {
  const { step, setStep, resetReposition } = useReposition();
  const { goBack } = useHistory();

  const Step = useMemo(() => {
    if (step === 0) return StepOne;
    if (step === 1) return StepTwo;

    return null;
  }, [step]);

  const onGoBack = useCallback(() => {
    if (step === 0) {
      resetReposition();
      goBack();

      return;
    }

    setStep(0);
  }, [step]);

  useEffect(() => () => {
    resetReposition();
  }, []);

  return (
    <PageLayout title="Reposición de Inventario" onGoBack={onGoBack}>
      <PageTitle title="Reposición de Inventario" />

      <div className="row d-flex justify-content-center align-items-center">
        <div className="col-12">
          <Card className="my-4 py-4 px-2 shadow">
            <Step />
          </Card>
        </div>
      </div>
    </PageLayout>
  );
}
