export default {
  meEndpoint: '/me',
  loginEndpoint: '/auth/sign-in',
  registerEndpoint: '/jwt/register',
  storageTokenKeyName: 'accessToken',
  onTokenExpiration: 'logout' // logout | refreshToken
}
