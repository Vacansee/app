<script setup>
import Button from "primevue/button"
</script>

<template>
    <div id="navbar" class="card h-6">
        <div id="leftnav" class="inline-flex card w-6">
            <div class="flex flex-wrap card-container gap-2 p-2">
                <Button class="mybutton">
                    <img alt="search" src="../assets/svgs/search.svg"/>
                </Button>
                <Button class="mybutton">
                    <img style="height:80%" alt="help" src="../assets/svgs/help.svg"/>
                </Button>
                <Button class="mybutton">
                    <img alt="settings" src="../assets/svgs/settings.svg"/>
                </Button>
            </div>
        </div>

        <div id="rightnav" class="inline-flex justify-content-end card w-6">
            <div class="flex flex-wrap card-container gap-2 p-2">
                <Button class="mybutton">
                    <img alt="bug" src="../assets/svgs/bug.svg"/>
                </Button>
            </div>
        </div>
    </div>
    
</template>

<style lang="scss">
@import 'primeflex/primeflex.scss';

.mybutton {
    @include styleclass('h-3rem w-3rem inline-block flex align-items-center justify-content-center');
}
</style>