<script setup>
import OverlayPanel from 'primevue/overlaypanel'
import Button from "primevue/button"
import { ref } from "vue";

const op = ref();
const toggle = (event) => {
    op.value.toggle(event);
}
</script>

<template>
    <div class="w-12 flex align-items-center">
        <h3 class="my-0 w-3">Hours:</h3>
        <div class="my-0 w-7 text-center">
            <h3 id="isOpen">Open</h3>
            <h3> - 7am to 9pm</h3>
        </div>
        <Button class="h-2rem w-2rem justify-content-center" @click="toggle">
            <img alt="search" style="height:80%" src="../assets/svgs/dropdown.svg" />
        </Button>
        <OverlayPanel class="w-3" ref="op" :pt="{
            header: { class: 'bg-white border-white' },
            title: { class: 'text-black border-white' },
            content: { class: 'text-black border-white' }
        }">
            <p>Mon: 7am to 9pm</p>
            <p>Tue: 7am to 9pm</p>
            <p>Wed: 7am to 9pm</p>
            <p>Thu: 7am to 9pm</p>
            <p>Fri: 7am to 9pm</p>
            <p>Sat: 7am to 9pm</p>
            <p>Sun: 7am to 9pm</p>
        </OverlayPanel>
    </div>
</template>

<script>
export default {
    inject: ["global"],
}
</script>

<style>
h3 {
    display: inline;
}
</style>