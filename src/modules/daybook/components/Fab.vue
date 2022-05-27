<template>
  <button class="btn btn-primary" @click="this.$emit('on:click')">
      <i class="fa fa-2x"
      :class="icon"
      ><!-- Al  poner :class se hace un append solo se puede hacer una vez no se puede poner dos veces : class-->
      </i>
  </button>
</template>

<script>
//fa-plus
//fa-save
export default {
    props:{
        icon:{
            type:String,
            default:'fa-plus'
        }
    }
}
</script>

<style lang="scss" scoped>
button{
    border-radius:100%;
    bottom: 20px;
    height: 80px;
    position: fixed;
    right: 20px;
    width: 80px;
}
</style>