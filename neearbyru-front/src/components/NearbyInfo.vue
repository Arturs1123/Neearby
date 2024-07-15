<template>
    <div class="info">
        <div>
            Поддержка
            <span class="bb_txt">Neearby.com:</span>
            <span class="bb_txt" style="margin-left: 0.5rem;">support@neearby.com</span>
        </div>
        <div class="">
            Владелец
            <span class="bb_txt">Neearby.com</span>
        </div>
        <div class="">ИП: Яковлев Михаил Геннадьевич</div>
        <div class="">ОГРНИН: 321602700021753</div>
        <div class="">ИНН: 601500047894</div>
        <div class="">
            Документация:
            <span class="c_black">Пользовательское соглашение | Политика конфиденциальности |<br>
                Соглашение с подпиской | Правила сервиса и рекуррентные платежи</span>
        </div>
        <div class="">© <span class="bb_grey">Neearby.com</span> · 2021-2023</div>
    </div>
</template>
<script>


export default {
    name: "NearbyInfo",
    components: {

    },
    data() {

    },
    methods: {
    },
}
</script>
<style scoped>
.info{
    margin-top: 2rem;
}
.info div {
    color: #7A7777;
    font-size: 16px;
    font-weight: 400;
}

.bb_txt {
    border-bottom: 1px solid #000;
    width: 95%;
    color: black;
}

.c_black {
    color: black !important;
}

.bb_grey {
    border-bottom: 1px solid #7A7777;
}
</style>