function Table(props) {
  return (
    <table className="App">
      <thead>
        {Object.entries(props.data[0] == null ? {} : props.data[0]).map(
          ([key, value]) => {
            return (
              <th onClick={() => props.sortByKey(key)}>
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </th>
            );
          }
        )}
      </thead>
      <tbody>
        {props.data.map((element) => {
          return (
            <tr>
              {Object.entries(element).map(([key, value]) => (
                <td>{value}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default Table;
