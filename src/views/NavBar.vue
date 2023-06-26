<script setup>
import Button from "primevue/button"
</script>

<template>
    <div id="left-nav" class="inline-flex card w-6">
        <div class="flex card-container gap-2 p-2">
            <Button class="mybutton" icon="pi pi-check" aria-label="Submit" />
            <Button class="mybutton" icon="pi pi-check" aria-label="Submit" />
            <Button class="mybutton" icon="pi pi-check" aria-label="Submit" />
        </div>
    </div>
    <div id="right-nav" class="inline-flex justify-content-end  card w-6">
        <div class="flex flex-wrap card-container gap-2 p-2">
            <Button class="mybutton" icon="pi pi-check" aria-label="Submit" />
            <Button class="mybutton" icon="pi pi-check" aria-label="Submit" />
            <Button class="mybutton" icon="pi pi-check" aria-label="Submit" />
        </div>
    </div>
    
</template>

<style lang="scss">
@import 'primeflex/primeflex.scss';

.mybutton {
    @include styleclass('inline-block flex align-items-center justify-content-center');
}
</style>