<template>
    <div id="popup">
        <div id="popup-head"> 
            <div id="popupbuild"> {{ buildLabel }} </div>
        </div>
        <p id="popup-general"> </p>
    </div>

</template>

<script>
export default {
    props: ['buildLabel']
}
</script>

<style scoped>
#popup {
    width: 100vw;
    height: 25vh;
    position: absolute;
    pointer-events: all;
    display:inline-block;
    bottom: 0;
    z-index: 6;
    transform: translateY(19vh);
    transition: transform .5s;
    box-sizing: border-box;
    background-color: white;
    border: 3px solid var(--softborder);
    border-bottom-style: none;
    box-shadow: 0px -2px 25px rgba(0, 0, 0, 0.08);
    border-radius: 3vh 3vh 0vh 0vh;
}

#popup-head {
    width: 100vw;
    border-radius: 3vh 3vh 0vh 0vh;
    height: 6vh;
    background-color: none;
    color: rgb(0, 0, 0);
    position: absolute;
    font-weight: 600;
    font-size: x-large;
}

#popupbuild {
    padding: 10px 20px;
}
</style>