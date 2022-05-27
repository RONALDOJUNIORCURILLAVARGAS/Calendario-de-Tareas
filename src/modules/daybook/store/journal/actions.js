import journalApi from "@/api/journalApi"

/* export const myAction= async()=>{
} */
export const loadEntries= async({commit})=>{
    const {data}=await journalApi.get('/entries.json') //Es una promesa que alamcenaremos en resp
    console.log(data)
    //Si no tenemos data mandamos un arreglo vacio
    if(!data){
        commit('setEntries',[])
        return 
    }
    const entries = []
    for(let id of Object.keys(data)){
        entries.push({
            id,
            ...data[id]
        })
    }
    commit('setEntries',entries)
    //console.log(entries)

}
export const updateEntry= async({commit} ,entry )=>{//Entry debe de ser un parametro
//Extraer solo lo que se necesita //Quitar el id

const {id,date,picture,text}=entry
const dataToSave={date,picture,text}
// peticion HTTTP: await journalApi.put(PATH.json,dataToSave)
const resp= await journalApi.put(`/entries/${id}.json`,dataToSave)
console.log(resp)
commit('updateEntry',{...entry})//Con los ...  romperemos las referencias para que no cambie el entryList
}
export const createEntry= async({commit},entry)=>{
 //dataToSave
 const {date,picture,text}=entry
const dataToSave={date,picture,text}
const {data}= await journalApi.post(`/entries.json`,dataToSave)
//console.log(data)
 //data= {"name": "-N354BAJ6zzvwEKmKB4k" }
 dataToSave.id=data.name
 //Asignar a entry.id el valor de la data
 // comit->addEntry
 commit('addEntry',dataToSave)
 console.log('fin de commit')
 return dataToSave.id
}
export const deleteEntry= async({commit},id)=>{
    const resp=await journalApi.delete(`/entries/${id}.json`)
    console.log('respuesta delete:',resp)
    //commit =>deleteEnry
    commit('deleteEntry',id)
    return id
}
