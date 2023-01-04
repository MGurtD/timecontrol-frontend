<template>
  <nav class="nav">
    <div class="nav-links">
      <div class="nav-link">
        <i class="pi pi-clock"></i>
      </div>
      <div class="nav-link">
        <i class="pi pi-list"></i>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.nav {
  position: fixed;
  bottom: 0;
  left: 0;
  height: 3rem;
  width: 100vw;
  padding: 0.5rem;
  border-top: 1px #242424 solid;
  background-color: #abc9fb;
}
.nav-links {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  padding-top: 2px;
}
.nav-links {
  list-style: none;
}
.nav-link:hover {
  cursor: pointer;
  color: #fff;
}
.nav-link i {
  font-size: 1.5rem;
  text-align: center;
}
</style>
