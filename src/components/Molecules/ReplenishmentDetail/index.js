import React from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const ReokenishmentDetail = ({ activeData }) => {
  const manifiesto = activeData.replace(' ', '');
  console.log(manifiesto);

  return (
    <Document
      file={`data:application/pdf;base64,${manifiesto}`}
    >
      <Page
        size="letter"
        pageNumber={1}
      />
    </Document>

  );
};

export default ReokenishmentDetail;
