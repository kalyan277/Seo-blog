export default (state =[],action)=>{
    switch (action.type){
        case 'CHECK_AUTH':
            return action.payload;
            default:
          return state;      
    }
}