<template>
    <div class="ta_content">
        <img src="../assets/big_orFile.png" alt="">
    </div>
</template>
<script>
export default {
    name: 'PostContentEmpty'
}
</script>

<style scoped lang="scss">
.ta_content {
    text-align: left;
    width: 100%;
    border-radius: 10px;
    box-sizing: border-box;
    color: black;
    font-size: 16px;
    font-weight: 400;

    div {
        margin-bottom: 1rem;
    }

    .audio {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        gap: 10px;
        color: black;

        span {
            color: #2A5885;
        }
    }

    .file {
        display: flex;
        gap: 10px;
        align-items: flex-start;

        div {
            margin-bottom: 0;
            font-size: 14px;
            color: #7A7777;
        }

        span {
            color: #2A5885;
            font-size: 16px;
        }
    }
}
</style> 