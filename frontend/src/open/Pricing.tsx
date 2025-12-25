import { Check, Zap, Crown, Rocket, Plus, ArrowUpRight } from "lucide-react"
import { useState } from "react"

const PricingPage = () => {
    const [isYearly, setIsYearly] = useState(false);
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const plans = [
        {
            name: "Starter",
            price: "0",
            desc: "Perfect for testing our builder",
            icon: <Rocket className="text-slate-400" />,
            features: ["1 Basic Template", "Standard PDF Export", "Limited AI Checks", "Mobile Friendly"],
            button: "Current Plan",
            highlight: false
        },
        {
            name: "Professional",
            price: isYearly ? "12" : "19",
            desc: "Everything you need to get hired",
            icon: <Crown className="text-yellow-500" />,
            features: ["Unlimited Templates", "AI Cover Letter Writer", "ATS Optimization", "Priority Support", "No Watermark"],
            button: "Get Pro Access",
            highlight: true
        },
        {
            name: "Lifetime",
            price: "89",
            desc: "One payment, yours forever",
            icon: <Zap className="text-indigo-400" />,
            features: ["All Pro Features", "Lifetime Updates", "Exclusive Templates", "Unlimited Resumes", "Early Access"],
            button: "Buy Once",
            highlight: false
        }
    ];

    const faqs = [
        {
            q: "Will my resume be ATS-friendly?",
            a: "Absolutely. Our templates are specifically engineered with clean parsing structures that Applicant Tracking Systems (ATS) love."
        },
        {
            q: "Can I cancel my subscription at any time?",
            a: "Yes! There are no hidden contracts. You can cancel your Pro subscription with a single click from your profile settings."
        },
        {
            q: "How does the AI assistant work?",
            a: "Our AI analyzes your job title and target industry to suggest high-impact bullet points and skills based on top-performing resumes."
        }
    ];

    return (
        <div className="w-full h-fit bg-[#050505] text-slate-200 font-sans selection:bg-blue-500/30">
            {/* --- PRICING SECTION --- */}
            <section className="py-24 px-6 max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
                        Simple, <span className="text-blue-500">Transparent</span> Pricing
                    </h1>
                    
                    {/* Billing Toggle */}
                    <div className="flex items-center justify-center gap-4">
                        <span className={`text-sm font-medium ${!isYearly ? 'text-white' : 'text-slate-500'}`}>Monthly</span>
                        <button 
                            onClick={() => setIsYearly(!isYearly)}
                            className="w-12 h-6 bg-white/10 rounded-full p-1 relative transition-colors"
                        >
                            <div className={`w-4 h-4 bg-blue-500 rounded-full transition-all duration-300 ${isYearly ? 'translate-x-6' : 'translate-x-0'}`} />
                        </button>
                        <span className={`text-sm font-medium ${isYearly ? 'text-white' : 'text-slate-500'}`}>
                            Yearly <span className="ml-1.5 text-[10px] bg-green-500/20 text-green-400 px-2 py-0.5 rounded-md border border-green-500/20">-20%</span>
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
                    {plans.map((plan) => (
                        <div key={plan.name} className={`relative p-8 rounded-[2.5rem] border transition-all duration-500 ${plan.highlight ? 'bg-[#0A0A0A] border-blue-500/40 shadow-2xl shadow-blue-500/10' : 'bg-white/[0.02] border-white/5'}`}>
                            {plan.highlight && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg">Most Popular</div>
                            )}
                            <div className="mb-6 opacity-80">{plan.icon}</div>
                            <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                            <div className="flex items-baseline gap-1 mb-6">
                                <span className="text-4xl font-black text-white">${plan.price}</span>
                                <span className="text-slate-500 text-sm">/{plan.name === 'Lifetime' ? 'once' : 'mo'}</span>
                            </div>
                            <div className="space-y-4 mb-8">
                                {plan.features.map(f => (
                                    <div key={f} className="flex items-center gap-3 text-sm text-slate-400">
                                        <Check size={14} className="text-blue-500" /> {f}
                                    </div>
                                ))}
                            </div>
                            <button className={`w-full py-4 rounded-2xl font-bold transition-all ${plan.highlight ? 'bg-blue-600 hover:bg-blue-500 shadow-xl shadow-blue-600/20' : 'bg-white/5 hover:bg-white/10'}`}>
                                {plan.button}
                            </button>
                        </div>
                    ))}
                </div>

                {/* --- FAQ SECTION (Embedded) --- */}
                <div className="max-w-3xl mx-auto border-t border-white/5 pt-24">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-white mb-2">Got Questions?</h2>
                        <p className="text-slate-500 text-sm">Everything you need to know before joining.</p>
                    </div>

                    <div className="space-y-3">
                        {faqs.map((faq, idx) => (
                            <div key={idx} className="border border-white/5 rounded-2xl overflow-hidden bg-white/[0.01]">
                                <button 
                                    onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                                    className="w-full flex items-center justify-between p-5 text-left hover:bg-white/[0.02] transition-colors"
                                >
                                    <span className="text-sm font-semibold text-slate-300">{faq.q}</span>
                                    <div className={`transition-transform duration-300 ${openIndex === idx ? 'rotate-180 text-blue-400' : 'text-slate-600'}`}>
                                        <Plus size={18} />
                                    </div>
                                </button>
                                <div className={`transition-all duration-300 ease-in-out ${openIndex === idx ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                                    <div className="p-5 pt-0 text-xs leading-relaxed text-slate-500 border-t border-white/5">
                                        {faq.a}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Final CTA Footer */}
                    <div className="mt-20 p-8 rounded-3xl bg-gradient-to-r from-blue-600/10 to-indigo-600/10 border border-blue-500/20 text-center ">
                        <h4 className="text-lg font-bold mb-2 text-white">Still have more questions?</h4>
                        <p className="text-sm text-slate-400 mb-6 text-balance">Our support team is ready to help you land your next role. Contact us anytime.</p>
                        <button className="inline-flex items-center gap-2 text-blue-400 font-bold hover:text-blue-300 transition-colors">
                            Contact Support <ArrowUpRight size={16} />
                        </button>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default PricingPage