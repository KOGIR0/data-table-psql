function Table(props) {
  const head = Object.keys(props.data[0] || {}).map((key, index) => (
    <th key={index} onClick={() => props.onHeaderClick(key)}>
      {key.charAt(0).toUpperCase() + key.slice(1)}
    </th>
  ));

  const body = props.data.map((element, index) => (
    <tr key={index}>
      {Object.values(element).map((value) => (
        <td>{value}</td>
      ))}
    </tr>
  ));

  return (
    <table>
      <thead>{head}</thead>
      <tbody>{body}</tbody>
    </table>
  );
}

export default Table;
