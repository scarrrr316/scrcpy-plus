<template>
    <div>

      <!--   Error Alert   -->
      <section class="s-alert-error" v-if="startupError">
        <h3 class="text-error"><b>Error Starting SCRCPY+</b></h3>
        <div style="color: #999;">This error could be caused by <b>{{ reason }}</b> not being properly installed on your OS.</div>
        <div style="color: #999; margin-top: 1em;">
          <b>More Details</b>
          <p style="white-space: pre-wrap;">{{ error }}</p>
        </div>
      </section>

      <section>
        <h1 class="text-2xl"><b>SCRCPY+</b> <span style="color: #999">{{ version }}</span></h1>
        <h4 class="text-xl"><b>SCRCPY</b> <span style="color: #999">{{ scrcpyVersion }}</span></h4>
        <h4 class="text-xl"><b>ADB</b> <span style="color: #999">{{ adbVersion }}</span></h4>
        <div class="pt-2">
          <button class="btn btn-primary text-white mr-2" @click="$utils.openExternal('https://discord.gg/APQyKz9e9w')">
            <icon name="discord" /> Discord
          </button>
          <nuxt-link to="/settings">
            <button class="btn btn-primary text-white mr-2">
              <icon name="gear" /> Settings
            </button>
          </nuxt-link>
        </div>
      </section>

    </div>
</template>

<script>
const env = process.env;

export default {
  data() {
    return {
      version: this.$config.public.version,
      scrcpyVersion: localStorage.getItem("scrcpyVersion"),
      adbVersion: localStorage.getItem("adbVersion"),

      startupError: false,
      error: new String(),
      reason: "SCRCPY or ADB"
    }
  },
  async mounted() {
    await this.$execute("adb --version")
    .then(data => {
      const version = data.split('\n')[1].split(" ")[1].trim();
      this.adbVersion = version;
      localStorage.setItem("adbVersion", version);
    })
    .catch(err => this.errHandler(err));

    await this.$execute("scrcpy --version")
    .then(data => {
      const version = data.split('\n')[0].split(" ")[1].trim();
      this.scrcpyVersion = version;
      localStorage.setItem("scrcpyVersion", version);
    })
    .catch(err => this.errHandler(err));
  },

  methods: {
    errHandler(err) {
        this.startupError = true;
        this.error = err;

        if (err.toString().includes("scrcpy")) return this.reason = "SCRCPY";
        if (err.toString() .includes("adb")) return this.reason = "ADB";
    }
  }

}
</script>
