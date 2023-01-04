<template>
  <header class="header">
    <div>
      <img class="header-logo" src="../assets/images/logo.png" />
    </div>
    <div class="header-text">Timecontrol</div>
  </header>
</template>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  display: grid;
  grid-template-columns: 0.4fr 0.6fr;
  height: 3rem;
  width: 100vw;
  padding: 0.5rem;
  border-bottom: 1px #242424 solid;
  background-color: #abc9fb;
}
.header-logo {
  width: 32px;
}
.header-text {
  font-weight: bold;
  text-align: left;
}
</style>
