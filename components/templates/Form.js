import Link from "next/link"
import { useRouter } from 'next/router'

export default function Form({ formName, subject, source }) {

    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = {
          name: e.target.fullName.value,
          email: e.target.emailAddress.value,
          phone: e.target.phone.value,
          message: e.target.about.value
        }
        const JSONdata = JSON.stringify(data)
        const endpoint = '/api/postmark'
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSONdata,
        }
        const submit = async () => {
            if(e.target.name.value.length === 0 && e.target.email.value.length === 0){
                const res = await fetch(endpoint, options)
                return res;
            }
        }
        const res = await submit()
        if(res.status === 200){
            router.push('/thank-you')
        }
        else {
          // Add action for form submission error
          console.log('Browser: Error with form submission')
        }

      }

    return (
        <>
            <form onSubmit={handleSubmit}>    
                <input type="text" name="name" id="name" className="h-0 w-0 opacity-0" />   
                <input type="email" name="email" id="email" className="h-0 w-0 opacity-0" />   
                <div>
                    <div className="py-5">
                        <div>
                            <div className="flex gap-3">
                                <div className="w-1/2">
                                    <div>
                                        <input
                                            type="text"
                                            name="fullName"
                                            id="fullName"
                                            autoComplete="given-name"
                                            className="mt-3 w-full border bg-transparent p-2 border-slate-300"
                                            placeholder="Full Name"
                                        />
                                    </div>
                                </div>
                                <div className="w-1/2">
                                    <div>
                                        <input
                                            type="email"
                                            name="emailAddress"
                                            id="emailAddress"
                                            autoComplete="email"
                                            className="mt-3 w-full border bg-transparent p-2 border-slate-300"
                                            placeholder="Email"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <input
                                    type="text"
                                    name="Phone"
                                    id="phone"
                                    autoComplete="tel"
                                    className="mt-3 w-full border bg-transparent p-2 border-slate-300"
                                    placeholder="Phone"
                                />
                            </div>
                            <div>
                                <textarea
                                    id="about"
                                    name="about"
                                    rows={4}
                                    className="mt-3 w-full border bg-transparent p-2 border-slate-300"
                                    placeholder="Message"
                                />
                            </div>
                        </div>
                    </div>
                    <div>
                        <p className="m-1 text-sm text-black">By submitting the form with your information above you are agreeing to our <Link href="/legal/terms-and-conditions" className="accent font-bold">Terms and Conditions</Link> and <Link href="/legal/privacy-policy/" className="accent font-bold">Privacy Policy</Link></p>
                    </div>
                    <div className="mt-6">
                        <button
                            type="submit"
                            className="primary-button px-20 w-1/2 hover:bg-black hover:text-white transition-all ease-in"
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </form>
        </>
    )
}