import Link from "next/link"

export default function Form({ formName, subject, source }) {
    return (
        <>
            <form name={formName} method="POST" netlify-honeypot="bot-field" data-netlify="true" action="/thank-you">
                <input type="hidden" name="form-name" value={formName} />
                <input name="bot-field" type="hidden" />
                <input type="hidden" name="Subject" value={subject} />
                <input type="hidden" name="Source" value={source} />
                <div>
                    <div className="py-5">
                        <div>
                            <div className="flex gap-3">
                                <div className="w-1/2">
                                    <div>
                                        <input
                                            type="text"
                                            name="full-name"
                                            id="full-name"
                                            autoComplete="given-name"
                                            className="mt-3 w-full border bg-transparent p-2 border-slate-300"
                                            placeholder="Full Name"
                                        />
                                    </div>
                                </div>
                                <div className="w-1/2">
                                    <div>
                                        <input
                                            type="text"
                                            name="email-address"
                                            id="email-address"
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