import { ServerClient } from 'postmark'

export default async function (req, res) {
  const serverToken = process.env.NEXT_PUBLIC_POSTMARK_API_TOKEN;
  const client = new ServerClient(serverToken);
  return new Promise(resolve => {
    client.sendEmailWithTemplate({
      "From": process.env.NEXT_PUBLIC_POSTMARK_EMAIL,
      "To": process.env.NEXT_PUBLIC_POSTMARK_EMAIL,
      "ReplyTo": req.body.email,
      "TemplateAlias": "contact-form-submission",
      "TemplateModel": {
        "name": req.body.name,
        "email": req.body.email,
        "phone": req.body.phone,
        "message": req.body.message
      }}).then(function(res) {
        if(res.ErrorCode === 0){
          // Add backend action for successful form submission or remove
          console.log('API: Form Submitted')
        }
        else {
          // Add backend action for unsuccessful form submission or remove
          console.log('API: Error With Form Submission')
        }
    }, function(err) {
        // Do something with error response or remove
        console.error(err)
    });
    res.end();
    return resolve()
  })
}

