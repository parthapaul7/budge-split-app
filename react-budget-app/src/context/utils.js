export const getFormattedData = (data) => {
    // seperate an array of objects into two array of keys and values in order
    let usernames=[],splits= [];
    if(data === []){
        return { keys: [], values: [null] };
    }

    data.forEach(element => {
       usernames.push(Object.keys(element)[0]) 
       splits.push(Object.values(element)[0])
    }); 
   
    
    
    return { usernames, splits};
  
  };

