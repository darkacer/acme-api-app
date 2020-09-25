// node js 
const AccessToken = '00D7F000001wtp7!ARUAQHilmhNQMDoCTCMMxZFYFdbCQpB3cM0Mus6MS4KTo459eXoCsFsl6bkx1QInxAaDM8rqVi5RED7Wfr4stFxX5wzAXURo';
const InstanceUrl = 'https://mybatcave-dev-ed.my.salesforce.com'
const jsforce = require('jsforce');
const { CompositeCall } = require('sf-composite-call');

var conn = new jsforce.Connection({
  instanceUrl : InstanceUrl,
  accessToken : AccessToken
});

const compositeCall =  new CompositeCall({
  allOrNone: true,
  jsforceConnection: conn
});

async function main() {
  const query1 = compositeCall.addQuery('Select id from account limit 50');
  const query2 = compositeCall.addQuery('Select id from contact limit 50');
  const listofaccounts = [
    {
      Name: 'ASome account name56'
    },
    {
      Name: 'ASome account name25'
    }
  ]

  listofaccounts.forEach(el => compositeCall.addSObject('Account').create(el))

  const result = await compositeCall.execute()
  console.log('result => ', result)
}

main()
