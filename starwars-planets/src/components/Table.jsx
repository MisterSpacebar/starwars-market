// components/table.jsx:

import React, { useEffect, useState } from 'react';

const Table = () => {
  const [data, setData] = useState([]);

  // useEffect(() => {
  //   const dbRef = ref(database);
  //   onValue(dbRef, (snapshot) => {
  //     const data = snapshot.val();
  //     // transform data as needed, then set it
  //     setData(data);
  //   });
  // }, []);

  return (
    <table>
      {/* render your data here */}
    </table>
  );
};

export default Table;