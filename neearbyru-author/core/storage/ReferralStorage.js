const db = require('../services/database');
const REFERRAL_TARGET_TABLE_NAME = 'referral_targets';
const REFERRAL_USERS_TABLE_NAME = 'referral_users';
const CONSTANTS = require('../Constants');


class ReferralStorage {
    async addTargetInReferralSystem(data){
        const currentDate = Date.now();

        return db(REFERRAL_TARGET_TABLE_NAME).insert({
            type: data.type,
            target_id: data.targetId,
            referral_levels: JSON.stringify(data.referral_levels),
            active: CONSTANTS.ReferralActive.Active,
            updated_at: currentDate,
            created_at: currentDate,
        })
    }

    async searchReferralTargets(where, fields = ["*"], orderBy = ["id"]){
        return db(REFERRAL_TARGET_TABLE_NAME).where(where).select(fields).orderBy(orderBy);
    }

    async searchReferralTargetsByIds(arrayIds, fields=["*"], orderBy=["id"]){
        return db(REFERRAL_TARGET_TABLE_NAME).whereIn(['target_id', 'type'], arrayIds).select(fields).orderBy(orderBy);
    }

    async updateReferralTargets(where, data){
        return db(REFERRAL_TARGET_TABLE_NAME).where(where).update({
            ...data,
            updated_at: Date.now()
        })
    }

    async deleteReferralTarget(id){
        return db(REFERRAL_TARGET_TABLE_NAME).where('id', id).update({
            active: CONSTANTS.ReferralActive.NotActive,
            updated_at: Date.now()
        })
    }

    async createReferralUser(data){
        const createUser = {
            user_id: data.userId,
            referral_id: data.referralId,
            level: data.level,
            referral_key: data.refKey,
            active: CONSTANTS.ReferralActive.Active,
            created_at: Date.now()
        }

        return db(REFERRAL_USERS_TABLE_NAME).insert(createUser)
    }

    async searchReferralUser(where, fields=["*"], orderBy=["id"]){
        return db(REFERRAL_USERS_TABLE_NAME).where(where).select(fields).orderBy(orderBy);
    }

    async searchReferralUsersByIds(arrayIds, fields=["*"], orderBy=["id"]){
        return db(REFERRAL_USERS_TABLE_NAME).whereIn('id', arrayIds).select(fields).orderBy(orderBy);
    }

    async updateReferralUser(where, data){

    }
}

module.exports = new ReferralStorage();