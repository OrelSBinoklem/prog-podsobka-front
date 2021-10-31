<template>
  <div><vue-snotify></vue-snotify></div>
</template>

<script>
export default {
  name: "Notifications",

  created() {
    this.$eventHub.$on('open-modal', ({type, title, message}) => {
      const conf = {
        timeout: 5000,
        showProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true
      }
      if(!type) {
        throw new Error("Not given type")
      }

      if(!/^(simple|success|info|warning|error)$/gi.test(type)) {
        throw new Error("Supported types \"simple, success, info, warning, error\" given:" + type)
      }

      if(title) {
        this.$snotify[type](message, title, conf);
      } else {
        this.$snotify[type](message, conf);
      }
    });
  },
  beforeDestroy() {
    this.$eventHub.$off('open-modal');
  },
}
</script>

<style scoped>

</style>