import { useState } from 'react';
import arrowDown from 'assets/brand/arrow-down.svg';
import downloadArrow from 'assets/brand/downloadarrow.svg';

const SelectDropDown = ({ list }) => {
  const [dropDown, setDropDown] = useState(false);

  const handleClickDropDown = (e) => {
    e.preventDefault();
    setDropDown(!dropDown);
  };
  return (
    <>
      <a href="#!" onClick={handleClickDropDown} className="position-relative">
        <ul className="d-flex align-items-center bg-white px-4" style={{ border: '1px solid #155C80', height: '40px', borderRadius: 16 }}>
          <li>
            <img src={downloadArrow} alt="download" width="14" />
          </li>
          <li className="mx-2">
            <span>
              Descargar
            </span>
          </li>
          <li>
            <img src={arrowDown} alt="Show" width="12" />
          </li>
        </ul>
      </a>
      <ul
        className={`${dropDown ? '' : 'd-none'} bg-white shadow position-absolute p-4`}
        style={{ width: 190, borderRadius: 15 }}
        onBlur={() => setDropDown(false)}
      >
        {list && list.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </>
  );
};

export default SelectDropDown;
