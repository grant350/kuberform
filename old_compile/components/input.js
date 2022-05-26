import React from 'react';

function Input(props){

    return (

      <div className="input">
        <input onChange={function(e){props.VALIDATE(e.target.value)}}></input>
        <span>status:{props.state.status}</span>
      </div>
    );
};

export default Input;

