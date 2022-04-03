import { memo, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import ApexCharts from 'react-apexcharts';

import PageTitle from 'components/Atoms/PageTitle';
import PageLayout from 'components/Templates/PageLayout';
import { useProductHistory } from 'hooks/useProductHistory';
import { useInventory } from 'hooks/useInventory';
import Card from 'components/Molecules/Card';
import Spinner from 'components/Atoms/Spinner';
import BoxSVG from 'assets/brand/box.svg';
import FormSVG from 'assets/brand/form.svg';
import BoxCheckSVG from 'assets/brand/box-with-check.svg';
import { getAllDaysFromRangeDates, datefromFormat } from 'utils/date';

import styles from './styles.module.scss';

const ItemDescription = memo(({ img, label, value }) => (
  <div className="d-flex justify-content-center align-items-center">
    <img src={img} alt="form" width={23} height={23} className="mx-2" />
    <span className={styles.bold}>{label}</span>
    <span className="paragraph3 mx-2">{value}</span>
  </div>
));

const ProductHistory = () => {
  const { sku } = useParams();
  const { isLoading, data, startDate, endDate } = useProductHistory({ sku });
  const { invetoryKeyedBySku, isGetInventory } = useInventory();
  const inventory = invetoryKeyedBySku[sku] || {};

  const allDaysToReport = useMemo(
    () => getAllDaysFromRangeDates(startDate, endDate, 'dd-MMM'),
    [],
  );

  const allDaysLabel = useMemo(
    () => allDaysToReport.map((days) => days.label),
    [allDaysToReport],
  );

  const { dataWithMissingDays, maxValue } = useMemo(() => {
    if (!data.length) return [];

    const dataKeyedByDay = data.reduce((acum, value) => {
      const date = datefromFormat(value.date_str, 'dd-MM-yyyy');

      return {
        ...acum,
        [`${date.getDate()}-${date.getMonth()}`]: value.quantity_in_warehouse,
      };
    }, {});

    let maxValueAux = 0;

    const allData = allDaysToReport.map((dayReport) => {
      const found = dataKeyedByDay[dayReport.date] || 0;

      if (found > maxValueAux) {
        maxValueAux = found;
      }

      return found;
    });

    return { dataWithMissingDays: allData, maxValue: maxValueAux };
  }, [data, allDaysToReport]);

  const loading = useMemo(
    () => isLoading && isGetInventory,
    [isLoading, isGetInventory],
  );

  const options = {
    chart: {
      height: 300,
      type: 'line',
      dropShadow: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },
    colors: ['#41B6E6'],
    dataLabels: {
      enabled: true,
    },
    stroke: {
      curve: 'smooth',
    },
    title: {},
    grid: {
      borderColor: '#e7e7e7',
      row: {
        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
        opacity: 0.5,
      },
    },
    markers: {
      size: 1,
    },
    xaxis: {
      categories: allDaysLabel,
    },
    yaxis: {
      min: 0,
      max: maxValue,
    },
    legend: {
      enabled: false,
    },
  };

  const series = [
    {
      name: inventory?.description || '',
      data: dataWithMissingDays,
    },
  ];

  return (
    <PageLayout title="Seguimiento de SKU">
      <PageTitle title="Seguimiento de SKU" className="mb-5" />

      <Card className="px-2 py-3 mb-5">
        <div className="row">
          <div className="col-12 col-md-4 d-flex justify-content-center align-items-center">
            <ItemDescription img={BoxSVG} label="SKU:" value={inventory?.sku} />
          </div>
          <div className="col-12 col-md-4 d-flex justify-content-center align-items-center">
            <ItemDescription
              img={FormSVG}
              label="Nombre:"
              value={inventory?.description}
            />
          </div>
          <div className="col-12 col-md-4 d-flex justify-content-center align-items-center">
            <ItemDescription
              img={BoxCheckSVG}
              label="Stock en Bodega:"
              value={inventory?.quantity_in_warehouse}
            />
          </div>
        </div>
      </Card>
      <Card className="px-2 py-3 mb-4">
        <div className="row">
          <div className="col-12 px-5">
            <span className="subtitle">Historial de SKU-</span>
            <span className="paragraph3 mx-2">Ultimos 30 días</span>
          </div>
          <div className="col-12 position-relative">
            {loading && (
              <div className={styles.spinnerContent}>
                <Spinner widt={50} height={50} color="#41B6E6" />
              </div>
            )}
            <ApexCharts
              options={options}
              series={series}
              type="line"
              height={300}
            />
          </div>
        </div>
      </Card>
    </PageLayout>
  );
};

export default ProductHistory;
