import React, { useMemo } from 'react';

import { useReposition } from 'context/useReposition';

import PageLayout from 'components/Templates/PageLayout';
import PageTitle from 'components/Atoms/PageTitle';
import Card from 'components/Molecules/Card';
import StepOne from './stepOne';

export default function CreateReposition() {
  const { step } = useReposition();

  const Step = useMemo(() => {
    if (step === 0) return StepOne;

    return null;
  }, [step]);

  return (
    <PageLayout title="Reposición de Inventario">
      <PageTitle title="Reposición de Inventario" />

      <Card className="my-4 py-4 px-2 shadow">
        <Step />
      </Card>
    </PageLayout>
  );
}
