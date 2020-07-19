import React from 'react';

const Mistakes = ({count}) => {
  const mistakes = new Array(count).fill(``);

  return (
    <div className="game__mistakes">
      {mistakes.map((it, i) => <div key={`mistake-${i}`} className="wrong" />)}
    </div>
  );
};

export default Mistakes;
