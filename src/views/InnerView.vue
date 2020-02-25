<template>
  <div id="app-inner">
    <Navbar class="hidden-xs-only" />
    <NavbarMobile class="hidden-sm-and-up" />
    <transition
        name="fade"
        mode="out-in"
    >
      <router-view/>
    </transition>
  </div>
</template>
<script>
import Navbar from '../components/Navbar'
import NavbarMobile from '../components/NavbarMobile'

export default {
  name: 'innerview',
  components: {
    Navbar,
    NavbarMobile
  }
}
</script>
