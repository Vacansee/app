<template>
    <div>
        <div class="h-6">
            <img src="../assets/photos/DCC.jpg" alt="DCC" class="w-12 border-round-2xl">
        </div>
        <h2 class="my-0 text-3xl">Darrin Communications Center</h2>
        <h2 class="my-0 text-3xl text-500"> ({{ global.bldg }})</h2>
        <svg width="100%" height="4px">
            <rect width="100%" height="100%" style="fill:var(--surface-500);" />
        </svg>
    </div>
</template>

<script>
export default {
    inject: ["global"],
}
</script>

<style>
h2 {
    display: inline;
}
</style>