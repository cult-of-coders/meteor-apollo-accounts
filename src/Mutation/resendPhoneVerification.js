import callMethod from '../callMethod'
import {Meteor} from 'meteor/meteor'


export default async function (root, options, context) {
  if (!options.phone) {
    throw new Error('Phone number is required')
  }

  callMethod(context, 'requestPhoneVerification', options.phone)
  
  return {
    success: true
  }
}
