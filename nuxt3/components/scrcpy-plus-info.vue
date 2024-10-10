<template>
    <div>

      <!--   Error Alert   -->
      <section class="s-alert-error" v-if="startupError">
        <h3>Error Starting SCRCPY+</h3>
        <div style="color: #999;">This error could be caused by <b>{{ reason }}</b> not being properly installed on your OS.</div>
        <div style="color: #999; margin-top: 1em;">
          <b>More Details</b>
          <p style="white-space: pre-wrap;">{{ error }}</p>
        </div>
      </section>

      <section>
        <h1>SCRCPY+ <span style="color: #999">{{ version }}</span></h1>
        <h4>SCRCPY <span style="color: #999">{{ scrcpyVersion }}</span></h4>
        <h4>ADB <span style="color: #999">{{ adbVersion }}</span></h4>
        <div style="padding: 0.5em 0 0 0;">
          <button class="btn btn-primary" @click="$utils.openExternal('https://discord.gg/APQyKz9e9w')">
            <icon name="discord" /> Discord
          </button>
          <nuxt-link to="/settings">
            <button class="btn btn-primary">
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
      version: env.version,
      scrcpyVersion: localStorage.getItem("scrcpyVersion"),
      adbVersion: localStorage.getItem("adbVersion"),

      startupError: true,
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
