import Input from './dist/components/input'
var input = {
'name':{
  name:'name',
     type:'formControl',
     value:'grant',
     style:'',
     html:Input,
     validator: function(currentval,observer) {
      //  console.log('name',currentval)
       setTimeout(function(){
        //  console.log(currentval.length >= 35)
         if (currentval.length >= 35){
           observer.next(true)
         } else {
          observer.next(false)
         }
       },3000);
     }
   },

   'name2':{
    name:'name2',
       type:'formControl',
       value:'mitchell',
       style:'',
       html:Input,
       validator: function(currentval,observer) {
         console.log('name2',currentval)
        //  console.log(currentval.length >= 5)

           if (currentval.length > 5){
             observer.next(true)
           } else if (currentval.length < 5){
             observer.next(false)
           }
       }
     },
   'innerformgroup':{
    name:'innerformgroup',
       type:'formGroup',
       style:'',
       htmlContainer:null,
       controls:
        {
          'innerGroupControl':{
             type:'formControl',
             value:'not undefined group',
             name:'innerGroupControl',
             style:'',
             html:Input,
             validator: function(currentval,observer) {
              //  console.log('innerGroupControl',currentval)
               setTimeout(function(){
                 if (currentval.length >= 5){
                   observer.next(true)
                 } else if (currentval.length < 5){
                   observer.next(false)
                 }
               },3000);
             }
           }
          }

     },
     'products':{
      name:'products',
         type:'formArray',
         htmlContainer:null,
         controls:[
          {
            name:'innerArrayControl',
               type:'formControl',
               value:'not undefined array',
               style:'',
               html:Input,
               validator: function(currentval,observer) {
                //  console.log('innerArrayControl',currentval)
                 setTimeout(function(){
                   if (currentval.length >= 5){
                     observer.next(true)
                   } else if (currentval.length < 5){
                     observer.next(false)
                   }
                 },3000);
               }
             }
         ]
       }
      };

export default input;