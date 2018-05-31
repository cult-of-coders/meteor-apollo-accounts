import {Meteor} from 'meteor/meteor'
import {Accounts} from 'meteor/accounts-base'

export default async function (root, options, context) {
  Meteor._nodeCodeMustBeInFiber()
  if (!options.phone) {
    throw new Error('Phone number is required')
  }

  let userId = Accounts.createUserWithPhone(options)
  if(userId) {
      Accounts.sendPhoneVerificationCode(userId, options.phone);
  }
  return ({success: !!userId})
}
