/* export const myMutations= (state)=>{

} */
export const setEntries = (state, entries)=>{
    //console.log(state.entries)
    state.entries = [...state.entries, ...entries]
    //Cuando se carguen las entradas se cambiara el estado del isLoading a false
    state.isLoading=false

}
//TAREA
export const updateEntry= (state,entry)=>{ //Recibir entry actualizada
    //state.entries => un arreglo
    //Recorremos los entries y ubicamos el indice que corresponde
    //Al que tenga el id del entry
    const indice=state.entries.map( e=> e.id).indexOf(entry.id)
    state.entries[indice]=entry
}
//
export const addEntry= (state ,entry)=>{
    //state -> entries , la nueva entrada debve de ser la primera
    state.entries=[entry,...state.entries]
}
export const deleteEntry=(state,id)=>{
    //Remover del state.entries borrar la entrada por ese ID
    state.entries=state.entries.filter(item=>item.id!==id)
}