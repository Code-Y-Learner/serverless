import React, { useState } from 'react';
//import AWS from 'aws-sdk';

function App() {
  const [query, setQuery] = useState('');
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const lambda = new AWS.Lambda({ region: 'your-region' });

    const params = {
      FunctionName: 'your-lambda-function-name',
      Payload: JSON.stringify({ query })
    };

    try {
      const result = await lambda.invoke(params).promise();
      const jsonData = JSON.parse(result.Payload);
      setData(jsonData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>채용정보 검색</h1>
      <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
      <button onClick={fetchData}>검색</button>
      <ul>
        {data.map((item, index) => (
          <li key={index}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
