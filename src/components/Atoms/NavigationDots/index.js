import styles from './styles.module.scss';

const NavigationDots = ({ list, setListItem }) => {
  const handleClick = (e, key) => {
    e.preventDefault();
    setListItem(e, key);
  };
  return (
    <ul className="d-flex w-100 justify-content-center">
      {list !== undefined && list.length > 0 && (
        list.map((item, key) => (
          <li key={item.name} className="mx-2">
            <a href="!#" onClick={(e) => handleClick(e, key)}>
              <span className={`${styles.dot} ${item.active ? styles.dotActive : ''}`} />
            </a>
          </li>
        ))
      )}
    </ul>
  );
};

export default NavigationDots;
