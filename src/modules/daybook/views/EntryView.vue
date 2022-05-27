
<template>
<div class="h-100">
    <template v-if="entry">
        <div class="entry-title d-flex justify-content-between p-2">
        <div>
            <span class="text-success fs-3 fw-bold">{{day}}</span>
            <span class="mx-1 fs-3"> {{month}}</span>
            <span class="mx-2 fs-4 fw-light">{{yearDay}}</span>
        </div>
        <div>
            <!-- Referenciamos una variable y no necesita dos puntos ":" -->
             <!-- Con el v-show ocultamos el input -->
             <!--Con el accept manipulamos el inoput
              para que solo reciba cierto tipo de archivos  --> 
               <input type="file"
                @change="onSelectedImage" 
                ref="imageSelector"
                v-show="false"
                accept="image/png, image/jpeg, image/jpg"
                >
                
                <button class="btn btn-danger mx-2" 
                v-if="entry.id"
                @click="onDeleteEntry"
                >
                Borrar
                <i class="fa fa-trash-alt"></i>
                </button>
                <button class="btn btn-primary"
                @click="onSelectImage">
                Subir Foto
                <i class="fa fa-upload"></i>
                </button>
        </div>
    </div>
    <hr>
    <div class="d-flex flex-column px-3 h-75">
        <textarea
        v-model="entry.text"
        placeholder="¿Qué sucedio hoy?'"></textarea>
    </div>

    <img 
        v-if="entry.picture && !localImage"
        :src="entry.picture" 
        alt="entry-picture"
        class="img-thumbnail">
    <img 
        v-if="localImage"
        :src="localImage" 
        alt="entry-picture"
        class="img-thumbnail">

    </template>
    
    <Fab
        icon="fa-save"
        @on:click="saveEntry"
    />
    
</div>
   
  
</template>

<script>
import { defineAsyncComponent } from 'vue'
import {mapGetters,mapActions} from 'vuex' 
import Swal from 'sweetalert2'
import getdayMounthYear from '../helpers/getDayMonthYear'
import uploadImage from '../helpers/uploadImage'
export default {
    props:{
        id:{
            type:String,
            required:true,
        }
    },
    components:{
        Fab:defineAsyncComponent(()=>import('../components/Fab.vue')),
    },
    data(){
        return {
            entry:null,
            localImage:null,
            file:null
        }
    },
    computed:{
        ...mapGetters('journal',['getEntriesByID']),
        day(){
            const {day} =getdayMounthYear(this.entry.date)
            return day
        },
        month(){
            const {month} =getdayMounthYear(this.entry.date)
            return month
        },
        yearDay(){
            const {yearDay} =getdayMounthYear(this.entry.date)
            return yearDay
        }

    },
    methods:{
        loadEntry(){
        //console.log(this.getEntriesByID(this.id))  
        let entry;
        if(this.id=="new"){
            entry={
                text:'',
                date:new Date().getTime()
            }
        }else{
            entry=this.getEntriesByID(this.id)
            //Si es undefined sacamos al usuario
            if(!entry) return this.$router.push({name:'no-entry'})
             
        }
        this.entry=entry   
        return entry

        },
            //Disparar la accion del Journal Module
            //'updateEntry'
        ...mapActions('journal',['updateEntry','createEntry','deleteEntry']),

        async saveEntry(){

        new Swal({
                title:'Espere por favor',
                allowOutsideClick:false
        })
        //Mensaje de alerta de espere mientras se procesa
        Swal.showLoading()

        const picture_url=await uploadImage(this.file)
        console.log(picture_url)
        this.entry.picture=picture_url
        //console.log('Guardando entrada')
        if(this.entry.id){
            await this.updateEntry(this.entry)
        } else{
            console.log('Post de una nueva entrada')
            
            //action createEntry
            const id=await this.createEntry(this.entry)
            this.$router.push({name:'entry',params:{id:id}})
            //redirectTo => entry, params:id 
        }

        this.file=null

        //Mensaaje de confirmacion de que se realizo correctamente
        Swal.fire('Guardado','Entrada registrada con exito','success')
            
            
        },
        async onDeleteEntry(){
            const {isConfirmed}= await Swal.fire({
                title:'¿Está seguro?',
                text:'Una vez borrado no se puede recuperar',
                showDenyButton:true,
                confirmButtonText:'Sí,estoy seguro'
            })
            //Evaluamos que haya marcado si estoy seguro
            if(isConfirmed){
                new Swal({
                    title:'Espere por favor',
                    allowOutsideClick:false
                })
                Swal.showLoading()

                await this.deleteEntry(this.entry.id)
                //Redirecccionare al usuario fuera de aqui
                this.$router.push({name:'no-entry'})
                // entry
                Swal.fire('Eliminado','','success')
            }
            
        },
        onSelectedImage(event){
            //Como no pusimos en el input del file multiple
            //Solo recibiremos un archivo
            //Ese archivo esta en la posicion 0
            const file =event.target.files[0]
            if(!file){
                //Si no seleccionamos una imagen
                //Regresamos el valor del localimage a null
                this.localImage=null
                this.file=null
                return
            }
            //Cargamos en el objeto file que nos servira para enviarlo al 
            //Backend
            this.file=file
            const fr = new FileReader()
            //Cuando se cargue elarchivo
            fr.onload = () => this.localImage =fr.result
            fr.readAsDataURL(file)
            
        },
        onSelectImage(){
            //Muestra las referencias que establecimos en el html
            // en el inputo file creamos un ref
            //console.log(this.$refs)
            //Simulaermos un click en el input
           this.$refs.imageSelector.click()
           
        }
    },
    created(){
        //console.log(this.$route.params.id)
        this.loadEntry()
    },
    watch:{
        id(){
            this.localImage = null
            this.loadEntry()
            

        }
    }
}
</script>

<style lang="scss" scoped>
textarea{
    font-size: 20px;
    border: none;
    height: 100%;

    &:focus{
        outline: none;
    }

}
img {
    width: 200px;
    position: fixed;
    bottom: 150px;
    right: 20px;
    box-shadow: 0px 5px 10px rgba($color: #000000, $alpha: 0.2);
}

</style>