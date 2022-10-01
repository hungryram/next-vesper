import { ServerClient } from 'postmark'

export default async function (req, res) {
  const serverToken = process.env.NEXT_PUBLIC_POSTMARK_API_TOKEN;
  const client = new ServerClient(serverToken);
  const submit = await client.sendEmailWithTemplate({
      "From": process.env.NEXT_PUBLIC_POSTMARK_EMAIL,
      "To": process.env.NEXT_PUBLIC_POSTMARK_EMAIL,
      "ReplyTo": req.body.email,
      "TemplateAlias": "contact-form-submission",
      "TemplateModel": {
        "name": req.body.name,
        "email": req.body.email,
        "phone": req.body.phone,
        "message": req.body.message
      }
    }).then(function(res) {
    return res
    }, function(err) {
    return err
  })
   res.end()
   return submit
}




