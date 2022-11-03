import { ServerClient } from 'postmark'

export default async function (req, res) {
  const serverToken = process.env.NEXT_PUBLIC_POSTMARK_API_TOKEN;
  const client = new ServerClient(serverToken);
  const submit = () => {
    const postmarkApiRes = client.sendEmailWithTemplate({
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
    })
    return postmarkApiRes
  }
  try {
    const submitRes = await submit()
    res.status(200).json(submitRes)
  }
  catch(err) {
    res.status(500).json(err)
  }
}




