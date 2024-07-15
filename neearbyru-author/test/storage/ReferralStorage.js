const REFERRAL_TARGET_TABLE_NAME = 'referral_targets';
const REFERRAL_USERS_TABLE_NAME = 'referral_users';


class ReferralStorage {
    async searchReferralTargetsByIds(arrayIds, fields=["*"], orderBy=["id"]){
        return [];
    }
}

module.exports = new ReferralStorage();