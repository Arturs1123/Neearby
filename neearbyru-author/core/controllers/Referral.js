const CONSTANTS = require('../Constants');
const Validator = require("../helpers/validator");

class Referral{

    _referralStorage;
    _productController;
    _subscriptionController;

    constructor(referralStorage, productController, subscriptionController){
        this._referralStorage = referralStorage;
        this._productController = productController;
        this._subscriptionController = subscriptionController;
    }

    async searchReferralTarget(data){
        const validator = new Validator();

        validator.setRule('referralKey', Validator.TYPES.string().required());

        validator.validate(data)

        const [referralUser] = await this._referralStorage.searchReferralUser({referral_key: data.referralKey});

        if(!referralUser){
            return false;
        }

        const [referralTarget] = await this._referralStorage.searchReferralTargets({id: referralUser.referral_id});

        if(!referralTarget || referralTarget.active === CONSTANTS.ReferralActive.NotActive){
            return false;
        }

        let target

        if(referralTarget.type === CONSTANTS.ReferralTargetType.Product){
            [target] = await this._productController.searchProducts({id: referralTarget.target_id}, {});

            if(
                !target
                || target.active === CONSTANTS.Products.UserBanned
                || target.active === CONSTANTS.Products.Deleted
            ) {
                return false
            }

        } else if(referralTarget.type === CONSTANTS.ReferralTargetType.Subscription){
            [target] = await this._subscriptionController.searchSubscriptions({id: referralTarget.target_id});

            if(
                !target
                || target.active === CONSTANTS.Products.UserBanned
                || target.active === CONSTANTS.Products.Deleted
            ) {
                return false
            }
        }


        return {
            target_id: target.id,
            type: referralTarget.type,
            referral_id: referralUser.user_id,
            author_id: target.author_id,
            percent: referralTarget.referral_levels[referralUser.level]
        }
    }

}

module.exports = Referral