<template>
    <img :src="`/icons/${name}.svg`" class="w-6 h-6 invert" >
    </img>
</template>

<script>
export default {
    props: ['name'],
}
</script>