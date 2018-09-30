import SchemaTypes from './Auth';
import SchemaMutations from './Mutations';
import Mutation from './Mutation';
import LoginMethodResponse from './LoginMethodResponse';
import callMethod from './callMethod';

const initAccounts = function(givenOptions) {
  const defaultOptions = {
    CreateUserProfileInput: 'name: String',
    loginWithFacebook: false,
    loginWithGoogle: false,
    loginWithLinkedIn: false,
    loginWithPassword: true,
    loginWithPhone: false,
    overrideCreateUser: null, // createUser, args, context
  };
  const options = {
    ...defaultOptions,
    ...givenOptions,
  };

  const typeDefs = [SchemaTypes(options), ...SchemaMutations(options)];
  const resolvers = { ...Mutation(options), ...LoginMethodResponse(options) };

  return {
    typeDefs,
    resolvers,
  };
};

export { callMethod, initAccounts };
