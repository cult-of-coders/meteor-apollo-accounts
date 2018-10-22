import loginWithPassword from './loginWithPassword'
import loginWithPhone from './loginWithPhone'
import logout from './logout'
import changePassword from './changePassword'
import createUser from './createUser'
import createUserWithPhone from './createUserWithPhone'
import verifyEmail from './verifyEmail'
import resendVerificationEmail from './resendVerificationEmail'
import resendPhoneVerification from './resendPhoneVerification'
import forgotPassword from './forgotPassword'
import resetPassword from './resetPassword'
import oauth from './oauth'
import hasService from './oauth/hasService'

export default function(options) {
  const resolvers = {
    logout,
    verifyEmail,
    resendVerificationEmail,
    ...oauth(options),
  };

  if (hasService(options, 'password')) {
    resolvers.loginWithPassword = loginWithPassword;
    resolvers.changePassword = changePassword;

    // TODO: maybe allow hooks for other implementations as well
    // Maybe do not allow login without email verification?
    resolvers.createUser = async (...args) => {
      if (options.overrideCreateUser) {
        return options.overrideCreateUser(createUser, ...args);
      }

      return createUser.call(null, ...args);
    };

    resolvers.forgotPassword = forgotPassword;
    resolvers.resetPassword = resetPassword;
  }

  if (hasService(options, 'phone')) {
    resolvers.loginWithPhone = loginWithPhone
    resolvers.createUserWithPhone = createUserWithPhone
    resolvers.resendPhoneVerification = resendPhoneVerification
  }

  return { Mutation: resolvers };
}
