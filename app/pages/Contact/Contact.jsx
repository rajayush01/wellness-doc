import Navbar from '@/app/components/Navbar/Navbar'
import React from 'react'

const Contact = () => {
    return (
        <div className='bg-gray-100 h-screen'>
            <Navbar />
            <section id="contact-us" className="py-16 ">
                <div className="container mx-auto px-6 text-center ">
                    <h2 className="text-5xl font-bold mb-8 text-blue-500">Contact Us</h2>
                    <p className="text-lg mb-6">We&apos;d love to hear from you! Whether you have a question or want to schedule an appointment, feel free to reach out to us.</p>
                    <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-6">
                        <input
                            type="text"
                            placeholder="Your Name"
                            className="w-full md:w-1/3 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                        <input
                            type="email"
                            placeholder="Your Email"
                            className="w-full md:w-1/3 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>
                    <textarea
                        placeholder="Your Message"
                        className="w-full md:w-2/3 p-3 mt-6 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        rows="5"
                    ></textarea>
                    <br />
                    <button className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full transition duration-300 shadow-md">
                        Send Message
                    </button>
                </div>
            </section>
        </div>
    )
}

export default Contact
