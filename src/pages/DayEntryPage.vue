<script lang="ts">

</script>
<template>
<form>

        <div style="display:block">
            <div>
                <label for="00">00:00</label>
                <input type="text" name="00"/>                
            </div>
        
            <div>
                <label for="01">01:00</label>
                <input type="text" name="01"/>
            </div>
        
            <div>
                <label for="02">02:00</label>
                <input type="text" name="02"/>
            </div>
        
            <div>
                <label for="03">03:00</label>
                <input type="text" name="03"/>
            </div>
        </div>
        <div style="display:block">
            <div>
                <input type="text" name="00A"/>                
            </div>
        
            <div>
                <label for="01">01:00</label>
                <input type="text" name="01A"/>
            </div>
        
            <div>
                <label for="02">02:00</label>
                <input type="text" name="02A"/>
            </div>
        
            <div>
                <label for="03">03:00</label>
                <input type="text" name="03A"/>
            </div>
        </div>
</form>

</template>
<style>
label {
    margin-right: 5px;
}
input[type=text] {
    width: 75px;
}
</style>