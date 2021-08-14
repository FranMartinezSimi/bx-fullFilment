import PageLayout from 'components/Templates/PageLayout';
import PageTitle from 'components/Atoms/PageTitle';
import Card from 'components/Molecules/Card';

const homeResolutor = () => (
  <PageLayout title="Bienvenido a Blue360" description="Bienvenido a Blue360" noBreadcrumb>
    <div className="container mt-5">
      <div className="row justify-content-between align-items-center">
        <PageTitle
          className="col-8"
          subtitleClassName="display-font fw-bold fs-3"
          title="Bienvenido a Blue360"
          titleSize="50px"
        />
        <div className="col-4">
          <div className="text-center">
            <img src="/fulfill1.png" alt="" width="180" />
          </div>
        </div>
      </div>
    </div>

    <div className="container">
      <div className="row align-items-stretch">
        <div className="col-lg-12">
          <Card
            className="shadow my-5"
          >
            <h4 className="display-font">Estado de tus órdenes</h4>
          </Card>
        </div>
      </div>
    </div>
  </PageLayout>
);

export default homeResolutor;
