import React, { useState } from "react";



const PlaylistPage = (props) => {
    return (
     <ul className="list-group">
        {props.list.map( (item,index) => (<li key ={index} className="list-group-item">{item}</li>))}
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
