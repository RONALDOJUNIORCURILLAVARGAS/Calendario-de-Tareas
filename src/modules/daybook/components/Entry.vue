import second from 'vue';
<template>
  <div class="entry-container mb-3 pointer p-2"
  @click="$router.push({name:'entry',params:{id:5}})"
  >
      <div class="entry-title d-flex">
          <span class="text-success fs-5 fw-bold">15</span>
          <span class="mx-1 fs-5">Julio</span>
          <span class="mx-2 fw-light">2022,jueves</span>
      </div>
      <div class="entry-description">
        Aute nostrud incididunt exercitation nostrud sunt ea officia officia aliqua non occaecat deserunt. Nulla eiusmod dolor mollit anim reprehenderit tempor mollit aute minim est culpa. Do aliqua minim nisi deserunt culpa cillum consequat id sint cupidatat do duis sunt. Dolor ad id exercitation amet fugiat duis nulla. Nostrud consectetur anim qui deserunt irure ex cupidatat et veniam id aliquip qui. Reprehenderit aliquip enim amet enim nostrud aliquip esse officia mollit id enim deserunt ad amet.
      </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.entry-container{
    border-bottom: 1px solid #2c3e;
    transition: 0.2s all ease-in;
    &:hover{
        background-color: lighten($color: grey, $amount: 45);
        transition: 0.2s all ease-in;
    }
    .entry-description{
        font-size: 12px;
    }
}
</style>