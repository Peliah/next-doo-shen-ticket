import Image from 'next/image'
import React from 'react'
import { Ticket, Shield, Smartphone, Clock, Users, Star } from 'lucide-react'

const Features = () => {
    const features = [
        {
            icon: Ticket,
            title: "Easy Ticket Management",
            description: "Create, manage, and track your event tickets with our intuitive dashboard. Set pricing, manage inventory, and monitor sales in real-time.",
            color: "text-blue-400"
        },
        {
            icon: Shield,
            title: "Secure Transactions",
            description: "Bank-level security ensures all transactions are protected. Your customers' data and payments are safe with our encrypted platform.",
            color: "text-green-400"
        },
        {
            icon: Smartphone,
            title: "Mobile Optimized",
            description: "Access your ticket management system anywhere, anytime. Our responsive design works perfectly on all devices.",
            color: "text-purple-400"
        },
        {
            icon: Clock,
            title: "Real-time Updates",
            description: "Get instant notifications about ticket sales, customer inquiries, and event updates. Stay connected with your audience.",
            color: "text-orange-400"
        },
        {
            icon: Users,
            title: "Customer Management",
            description: "Build and maintain relationships with your customers. Track purchase history and send targeted communications.",
            color: "text-pink-400"
        },
        {
            icon: Star,
            title: "Analytics & Insights",
            description: "Comprehensive analytics help you understand your audience, optimize pricing, and improve your event marketing strategy.",
            color: "text-yellow-400"
        }
    ]

    return (
        <section className="relative min-h-screen overflow-hidden py-20">
            <div className="absolute inset-0 w-full h-full">
                <Image
                    src="/assets/images/blob-scene-haikei.svg"
                    alt="Blob scene background"
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            <div className="absolute inset-0 w-full h-full opacity-10">
                <Image
                    src="/assets/images/blob-scatter-haikei.svg"
                    alt="Blob scatter overlay"
                    fill
                    className="object-cover"
                />
            </div>

            <main className="relative z-10 min-h-screen flex items-center mix-blend-difference">
                <div className="max-w-7xl mx-auto px-4 py-20">
                    {/* Section Header */}
                    <div className="max-w-4xl mx-auto text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-mono mix-blend-difference">
                            Why Choose DST?
                        </h2>
                        <p className="text-xl text-gray-200 font-mono mix-blend-difference">
                            Powerful features designed to make event ticket management simple and profitable
                        </p>
                    </div>

                    {/* Feature Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => {
                            const IconComponent = feature.icon
                            return (
                                <div
                                    key={index}
                                    className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 border border-white/20"
                                >
                                    <div className="flex items-center mb-6">
                                        <div className={`p-3 rounded-xl bg-white/20 ${feature.color}`}>
                                            <IconComponent className="h-8 w-8 text-white" />
                                        </div>
                                    </div>

                                    <h3 className="text-2xl font-bold text-white mb-4 font-mono">
                                        {feature.title}
                                    </h3>

                                    <p className="text-gray-200 leading-relaxed font-mono">
                                        {feature.description}
                                    </p>
                                </div>
                            )
                        })}
                    </div>

                    {/* Call to Action */}
                    <div className="text-center mt-16">
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-white/20 max-w-2xl mx-auto">
                            <h3 className="text-2xl font-bold text-white mb-4 font-mono">
                                Ready to Get Started?
                            </h3>
                            <p className="text-gray-200 mb-6 font-mono">
                                Join thousands of event organizers who trust DST for their ticket management needs.
                            </p>
                            <button className="bg-white text-[#232323] px-8 py-4 rounded-lg font-mono font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl">
                                Start Your Free Trial
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </section>
    )
}

export default Features