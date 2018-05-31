import callMethod from '../callMethod'
import {Meteor} from 'meteor/meteor'


export default async function (root, options, context) {
  if (!options.phone) {
    throw new Error('Phone number is required')
  }
  if (!options.verificationCode) {
    throw new Error('Verification code is required')
  }

  return callMethod(context, 'verifyPhone', options.phone, options.verificationCode)
}
