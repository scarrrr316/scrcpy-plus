<template>
    <section class="s-alert-primary" v-if="updateAvailable">
        <h3 class="text-primary">Update Available</h3>
        <div style="color: #999;">A new version of SCRCPY+ is ready to be downloaded</div>
        <div class="flex">
            <span>{{ currentVersion }}</span>
            <icon name="arrow-right" class="mx-2" />
            <span>{{ latestVersion }}</span>
            <button class="btn ml-auto" @click="open"><icon name="download" /> Download</button>
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
