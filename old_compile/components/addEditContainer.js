import React from 'react';



function AddEditContainer (arrayofGroups,classname,addGroup){
  var group = arrayofGroups[0];
  const [array,setArray] = React.useState([...arrayofGroups])

  function addlocalGroup(){
    var arrayofGroups = array;
    arrayofGroups.push(group)
    setArray([...arrayofGroups])
    addGroup(group);
    console.log('array',array)
  }
  function deleteGroup(index){

  }

  return (
            <div className={classname}>
            {array.map(function(x,index){
                return (<div key={index}>

                  {x}
                  </div>)
            })}
                              <button onClick={addlocalGroup}>addGroup</button>

            </div>
          );
}
export default AddEditContainer;
