import React, { useState } from 'react';

export default function Component() {
  const [data, setData] = useState();

  const test = async () => {
    const response = await fetch('https://ug627f5dha.execute-api.us-east-2.amazonaws.com/test2/userinfo/e6acf998-2eef-4488-8e9c-48d035ff33c4',{
        method: 'GET',       
        headers: {
            'Accept': 'application/json'
        },
    }
    );
    const jsonData = await response.json(); // await the promise to get data
    setData(jsonData);
  };

  return (
    <div>
      <button onClick={test}>click</button>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};