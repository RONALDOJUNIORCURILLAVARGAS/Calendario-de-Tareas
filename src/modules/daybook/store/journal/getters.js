/* export const myGetter = (state)=>{
return state
} */
export const getEntriesByTerm = (state) => ( term = '') => { //Retornaremos una funciones 
    if(term.length === 0) return state.entries

    return state.entries.filter(entry => entry.text.toLowerCase() .includes(term.toLocaleLowerCase()))
}
//Resiviremos el ID como argumento
// y regresamos una entrada
export const getEntriesByID = (state)=>(id='')=>{
    const entry=state.entries.find(entry => entry.id==id)
    if(!entry)return 
   return {...entry}
}