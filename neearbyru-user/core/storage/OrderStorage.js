const db = require('../services/database');
const ORDERS_TABLE = 'orders';

class OrderStorage {

    async createOrder(data){
        const currentTime = Date.now();

        const createOrder = {
            client_id: data.client_id,
            author_id: data.author_id,
            order_type: data.type,
            target_id: data.targetId,
            status: data.status,
            price: data.price,
            referral: data.referral ? JSON.stringify(data.referral) : JSON.stringify({}),
            created_at: currentTime,
            updated_at: currentTime
        }

        return db(ORDERS_TABLE).insert(createOrder).returning('id');
    }

    async searchOrders(where, fields = ['*'], orderBy = ['id'], selectPeriodDays = 7){
        let selectStartDate = this.addDays(new Date(), -selectPeriodDays);
        return db(ORDERS_TABLE).where(where).select(fields).orderBy(orderBy).where('created_at', '>=', selectStartDate.getTime());
    }

    async updateOrder(where, data) {
        return db(ORDERS_TABLE).where(where).update(data);
    }

    addDays(date, number) {
        const newDate = new Date(date);
        return new Date(newDate.setDate(newDate.getDate() + number));
    }

}

module.exports = new OrderStorage();