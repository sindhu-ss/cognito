import { storeData } from './storeData'
export function exportFormData (formdata) {
  var config = require('./config')
  var AmazonCognitoIdentity = require('amazon-cognito-identity-js')

  var poolData = {
    UserPoolId: config.userPoolId, // Your user pool id here
    ClientId: config.userPoolClientId // Your client id here
  }

  var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData)

  var attributeList = []

  var dataEmail = {
    Name: 'email',
    Value: formdata['customer-email']
  }

  var attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(dataEmail)
  attributeList.push(attributeEmail)

  userPool.signUp(formdata['customer-email'], 'password', attributeList, null, function (err, result) {
    if (err) {
      console.log(err)
      document.getElementById('unique-email-error').innerHTML = '** User already exists.'
      return
    }
    var cognitoUser = result.user
    console.log('user name is ' + cognitoUser.getUsername())
    storeData(formdata)
  })
}
