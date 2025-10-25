import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const Hero = () => {
    return (
        <section className="relative min-h-screen overflow-hidden">
            <div className="absolute inset-0 w-full h-full">
                <Image
                    src="/assets/images/layered-waves-haikei.svg"
                    alt="Layered waves background"
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            <div className="absolute inset-0 w-full h-full opacity-10">
                <Image
                    src="/assets/images/circle-scatter-haikei.svg"
                    alt="Circle scatter overlay"
                    fill
                    className="object-cover"
                />
            </div>

            <main className="relative z-10 min-h-screen flex pt-20 mix-blend-difference">
                <div className="max-w-7xl mx-auto px-4 py-20">
                    <div className="max-w-4xl mx-auto text-center ">
                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 font-mono mix-blend-difference">
                            DooShen Tickets: we sell, we earn.
                        </h1>

                        <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto font-mono mix-blend-difference">
                            Your premier destination for event ticket management.
                            Discover, purchase, and manage your event tickets with ease.
                        </p>

                        <Link
                            href="/events"
                            className="group inline-flex items-center space-x-2 px-8 py-4 bg-white text-[#232323] rounded-lg hover:bg-gray-100 transition-all duration-300 font-mono font-semibold"
                        >
                            <span>Explore Events</span>
                            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>
            </main>

            <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 animate-bounce">
                <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
                    <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
                </div>
            </div>
        </section>
    )
}

export default Hero