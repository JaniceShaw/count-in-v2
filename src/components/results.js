import React from 'react';

export const Results = (props) => {
  return (
    <table className='table table-responsive'>
      <thead>
        <tr>
          <th>Language</th>
          <th>Numbers</th>
          <th>Time</th>
          <th>Incorrect</th>
        </tr>
      </thead>
      <tbody>
        {props.results.map((results, index) =>
          <tr key={index}>
            <td>{results[0]}</td>
            <td>{results[1]}</td>
            <td>{results[2]}</td>
            <td>{results[3]}</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
