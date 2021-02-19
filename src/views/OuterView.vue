<template>
  <div id="app-outer">
    <Alert v-if="alertVisible" :title="alert.title" :type="alert.type" />
    <transition
      name="fade"
      mode="out-in"
    >
      <router-view />
    </transition>
  </div>
</template>
<script>
import Alert from '@/components/Alert'
export default {
  name: 'outerview',
  components: {
    Alert
  },
  data () {
    return {
      alert: {
        title: '',
        type: ''
      },
      alertVisible: false,
    }
  },
  mounted () {
    this.$root.$on('create-alert', (info) => {
      this.setupAlert(info.title, info.type)
    })
  },
  methods: {
    setupAlert (title, type) {
      this.alert.title = title
      this.alert.type = type
      this.alertVisible = true
      setTimeout(() => {
        this.alertVisible = false
      }, 8000)
    },
  }
}
</script>
