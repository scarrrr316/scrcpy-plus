<template>
    <section class="s-alert-primary" v-if="updateAvailable">
        <h3>Update Available</h3>
        <div style="color: #999;">A new version of SCRCPY+ is ready to be downloaded</div>
        <div>
            <span>{{ currentVersion }}</span>
            <v-icon style="margin-right: 0; transform: translateY(-10%);" color="primary">mdi-arrow-right</v-icon>
            <span>{{ latestVersion }}</span>
        </div>
        <div style="display: flex;">
            <v-spacer />
            <v-btn rounded class="primaryButton" @click="open"><v-icon>mdi-download</v-icon>Download</v-btn>
        </div>
    </section>
</template>

<script>
export default {
    data() {
        return {
            updateAvailable: true,
            currentVersion: new String(),
            latestVersion: new String(),
            repo: []
        }
    },
    async mounted() {
        this.currentVersion = this.$config.public.version;
        this.repo = await $fetch(process.env.releasesUrl);
        this.latestVersion = this.repo[0].name;
        
        const latest = this.latestVersion.split(".");
        const current = this.currentVersion.split(".");
        for (const i in latest) {
            if (latest[i] > current[i]) {
                console.log("UPDATE AVAILABLE")
                return this.updateAvailable = true;
            }
        }
    },

    methods: {
        open() {
            require('electron').shell.openExternal(this.repo[0].html_url)
        }
    }
}
</script>
