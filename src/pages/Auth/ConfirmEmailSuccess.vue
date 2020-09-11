<template>
  <div>
  </div>
</template>
<script>
export default {
  name: 'ConfirmEmailSuccess',
  beforeMount () {
    console.log(this.$route.params)
    this.sendToken(this.$route.params.token)
  },
  methods: {
    sendToken (token) {
      // send token to backend
      // 
    }
  }
}
</script>
