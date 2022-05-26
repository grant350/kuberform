import React from 'react';



function DefaultContainer (array,classname){
  return (
            <div className={classname}>
            {array.map(function(x,index){
                return <React.Fragment key={index}>{x}</React.Fragment>
            })}
            </div>
          );
}
export default DefaultContainer;
