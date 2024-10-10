<template>
  <div style="scrollbar-width: thin;">
    <!--   Import Modules   -->
    <update-notice />
    <scrcpy-plus-info />
    <!-- <device :device.sync="deviceConnected" style="margin-bottom: 0;" />
    
    <tools v-if="deviceConnected" />
    <scrcpy v-if="deviceConnected && !mirrorEngine" />
    <mirror v-if="deviceConnected && mirrorEngine" /> -->
    <!--   End Import Modules   -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      deviceConnected: false,
    }
  }
}
</script>
