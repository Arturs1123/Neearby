<template>
  <div class="balance-info-wrapper">
    <div class="balance-info-header">
      <img src="../assets/balance-info.png" alt="">
      <p>История вашего баланса</p>
    </div>
  </div>
  <div class="balance-info-wrapper">
    <div class="balance-table-info">
      <table class="table">
        <thead>
        <tr>
          <th>ID</th>
          <th>Дата Транзакции</th>
          <th>Сумма</th>
          <th>Описание</th>
          <th>Статус</th>
          <th>Остаток</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td style="color: black">112497</td>
          <td>11.11.2022 18:10:27</td>
          <td>432</td>
          <td>Комиссия Neearby за транзакции #112498</td>
          <td><button style="background: #39ff39; outline: none;border: none;border-radius: 2px; color: white; padding: 10px; width: 100px">Оплачен</button></td>
          <td style="color: black">3276.86</td>
        </tr>
        </tbody>
        <tbody>
        <tr>
          <td style="color: black;background: #fba0a0">112497</td>
          <td style="background: #fba0a0">11.11.2022 18:10:27</td>
          <td style="background: #fba0a0">432</td>
          <td style="background: #fba0a0">Комиссия Neearby за транзакции #112498</td>
          <td style="background: #fba0a0"><button style="background: #cb0404; outline: none;border: none;border-radius: 2px; color: white; padding: 10px; width: 120px">Не проведена</button></td>
          <td style="color: black;background: #fba0a0">3276.86</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>export default {
  components: {}
}
</script>

<style lang="scss">

.balance-info-wrapper {
  background-color: white;
  border-radius: 10px;
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 30px;

  .balance-info-header {
    padding: 20px;
    display: flex;
    align-items: center;
    width: 100%;

    p {
      margin-left: 20px;
      font-family: var(--base-font);
      font-size: 20px;
    }
  }
}
.table {
  width: 100%;
  margin-bottom: 20px;
  border: 1px solid #dddddd;
  border-collapse: collapse;
}
.table th {
  font-weight: bold;
  padding: 15px;
  border: 1px solid #dddddd;
}
.table td {
  border: 1px solid #dddddd;
  padding: 20px;
  background: #b6ffb6;
  color: gray;
}

</style>