const NavigationDots = ({ list }) => {
  console.log(list);
  return (
    <ul>
      {list !== undefined && list.length > 0 && (
        list.map((item) => (
          <li key={item.name}>
            <a href="!#" className={item.active ? 'active' : ''}>{item.name}</a>
          </li>
        ))
      )}
    </ul>
  );
};

export default NavigationDots;
