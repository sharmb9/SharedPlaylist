import React from 'react';

const PlaylistPage = (props) => {
  const { list } = props;
  return (
    <ul className="list-group">
      {list.map((item, index) => (<li key={index.toString()} className="list-group-item">{item}</li>))}
    </ul>
  );
};

//   // Button component
//   const Button = ({ onClick, className, children }) => (
//     <button onClick={onClick} className={className} type="button">
//       {children}
//     </button>
//   );
// };


export default PlaylistPage;
