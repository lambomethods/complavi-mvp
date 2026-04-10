import React from 'react';
import Link from 'next/link';
import { Shield, CheckCircle2, Activity, LayoutDashboard, Smartphone, ShieldCheck, Scale, FileText, Check, DollarSign } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-blue-600 selection:text-white font-sans">
      {/* Navigation */}
      <nav className="bg-slate-950 border-b border-slate-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center">
              <Shield className="w-8 h-8 text-blue-500 mr-2" />
              <span className="font-extrabold text-xl tracking-widest text-white hover:text-blue-400 transition-colors">COMPLAVI</span>
            </Link>
            <div className="hidden md:flex space-x-8">
               <a href="#problem" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">The Problem</a>
               <a href="#platform" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Platform</a>
               <a href="#pricing" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Pricing</a>
               <a href="#about" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">About</a>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/dashboard" className="text-sm font-medium text-slate-300 hover:text-white transition-colors hidden sm:block">Court / Officer Login</Link>
              <a href="mailto:founder@complavi.com?subject=Pilot Application" className="text-sm font-bold bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-md transition-colors shadow-lg shadow-blue-900/20">Apply For Pilot</a>
            </div>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative bg-slate-950 pt-20 pb-32 overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-slate-950 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="inline-block py-1 px-4 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold tracking-wider uppercase mb-6 border border-blue-500/20">
            Currently Onboarding 2026 Pilot Counties
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-8 max-w-5xl mx-auto leading-tight">
            Court-Ready Compliance Records. <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-amber-400">Automatically Generated.</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 mb-6 max-w-4xl mx-auto leading-relaxed italic border-l-4 border-amber-500 pl-4 py-1 text-left inline-block">
            "Audit failures don't just create inefficiencies. They create liability."
          </p>
          <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-4xl mx-auto leading-relaxed">
            COMPLAVI provides the secure legal defensibility infrastructure courts and probation departments need to reduce audit failures, protect funding, and strengthen legal defensibility.
          </p>
          {/* VSL VIDEO EMBED */}
          <div className="max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-[0_0_80px_rgba(37,99,235,0.15)] border border-slate-800 bg-slate-900/50 relative mb-4">
            <video 
              controls 
              className="w-full h-auto aspect-video cursor-pointer"
              preload="metadata"
            >
              <source src="/demo.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <p className="text-xs text-slate-500 max-w-xl mx-auto mb-10 italic">
            *COMPLAVI generates secure audit records designed to support court-admissible documentation.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-10">
            <span className="flex items-center text-sm font-medium text-slate-300 bg-slate-900 px-4 py-2 rounded-lg border border-slate-800"><ShieldCheck className="w-4 h-4 mr-2 text-blue-400" /> Aligned with Federal Grant Funding (JAG, Title II)</span>
            <span className="flex items-center text-sm font-medium text-slate-300 bg-slate-900 px-4 py-2 rounded-lg border border-slate-800"><DollarSign className="w-4 h-4 mr-2 text-emerald-400" /> No Participant Fees. Ever.</span>
            <span className="flex items-center text-sm font-medium text-slate-300 bg-slate-900 px-4 py-2 rounded-lg border border-slate-800"><Activity className="w-4 h-4 mr-2 text-amber-400" /> Deploys in 48 Hours</span>
          </div>

          <div className="flex flex-col items-center justify-center">
            <a href="mailto:founder@complavi.com?subject=Complimentary Pilot Request" className="text-xl font-bold bg-blue-600 hover:bg-blue-500 text-white px-10 py-5 rounded-xl transition-all shadow-[0_0_40px_rgba(37,99,235,0.4)] hover:shadow-[0_0_60px_rgba(37,99,235,0.6)] hover:-translate-y-1">
              Apply For Pilot Program
            </a>
            <p className="mt-5 text-sm text-slate-400 font-medium flex items-center">
              <CheckCircle2 className="w-4 h-4 mr-1.5 text-emerald-500" /> Complimentary 90-day pilot. Limited availability. No procurement commitment required.
            </p>
          </div>
        </div>
      </section>

      {/* PROBLEM SECTION */}
      <section id="problem" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">The Missing Audit Ledger. <br className="hidden md:block"/>The $3 Billion Problem.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100">
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-6">
                <FileText className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Audit Failures</h3>
              <p className="text-slate-600 leading-relaxed">Real county audits from 2025/2026 reveal systemic failures to complete accountability logs or provide supporting documentation. Missing data means lost grants and direct liability.</p>
            </div>
            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                <AlertTriangleIcon className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">The Logistics Gap</h3>
              <p className="text-slate-600 leading-relaxed">Counties hemorrhage budget incarcerating people for technical check-in failures. Better digital documentation prevents logistical barriers from being incorrectly classified as genuine criminal violations.</p>
            </div>
            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <ShieldCheck className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Civil Rights Defense</h3>
              <p className="text-slate-600 leading-relaxed">Oversight committees are increasingly scrutinizing supervision disparities. Departments cannot defend their equitable supervision practices without unforgeable, timestamped behavioral data trails.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SOLUTION SECTION */}
      <section id="platform" className="py-24 bg-slate-950 text-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-4">One Platform. <br/>Built For The Way Your Department Actually Works.</h2>
            <p className="text-slate-400 text-lg">Three streamlined modules replacing hours of administrative debt.</p>
          </div>
          
          <div className="space-y-12">
            
            <div className="flex flex-col md:flex-row items-center gap-12 bg-slate-900/50 p-8 md:p-12 rounded-3xl border border-slate-800">
              <div className="flex-1">
                <span className="text-amber-400 font-bold tracking-widest text-xs uppercase mb-3 block">Module One</span>
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                  <FileText className="w-6 h-6 mr-3 text-amber-500" /> Secure Audit Ledger
                </h3>
                <p className="text-slate-400 leading-relaxed">Every check-in and compliance event is automatically sealed with a cryptographic timestamp and locked into a secure audit record. Generate perfect oversight documentation in seconds. Designed to support definitive, court-admissible evidence.</p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row-reverse items-center gap-12 bg-slate-900/50 p-8 md:p-12 rounded-3xl border border-slate-800">
              <div className="flex-1">
                <span className="text-blue-400 font-bold tracking-widest text-xs uppercase mb-3 block">Module Two</span>
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                  <LayoutDashboard className="w-6 h-6 mr-3 text-blue-500" /> Live Compliance Matrix
                </h3>
                <p className="text-slate-400 leading-relaxed">A real-time overview of supervision status that automatically generates the audit trail. See exact participant compliance boundaries, active alerts, and geo-fenced logs instantly without digging through scattered paper files.</p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-12 bg-slate-900/50 p-8 md:p-12 rounded-3xl border border-slate-800">
              <div className="flex-1">
                <span className="text-emerald-400 font-bold tracking-widest text-xs uppercase mb-3 block">Module Three</span>
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                  <Smartphone className="w-6 h-6 mr-3 text-emerald-500" /> Remote Identity Check-In
                </h3>
                <p className="text-slate-400 leading-relaxed">Participants securely verify check-ins remotely using secure, on-device biometric identity verification and active GPS telemetry. Reduces the cost of logistical failure violations while seamlessly populating the core audit ledger.</p>
                <div className="mt-6 flex items-start bg-emerald-900/20 border border-emerald-500/20 p-4 rounded-xl">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5 mr-3" />
                  <p className="text-sm text-emerald-100 font-medium">Free for participants. Always. The county covers everything. Zero cost to the individual.</p>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">Up And Running In 48 Hours.</h2>
            <p className="text-slate-500 text-lg mt-4">We eliminated the grueling procurement cycles. Getting started is frictionless.</p>
          </div>
          
          <div className="max-w-4xl mx-auto relative pl-8 md:pl-0">
             {/* Timeline Line */}
             <div className="hidden md:block absolute left-1/2 top-4 bottom-4 w-0.5 bg-slate-200 -translate-x-1/2"></div>
             
             {[
               { step: 1, title: 'Apply for Pilot', desc: 'Your department applies for the 90-day complimentary pilot program.' },
               { step: 2, title: 'Configuration', desc: 'COMPLAVI configures your secure department dashboard within 48 hours of approval.' },
               { step: 3, title: 'Participant Access', desc: 'Participants receive access to the mobile check-in application at zero cost.' },
               { step: 4, title: 'Live Dashboard', desc: 'Officers log in to a live compliance matrix. Intuitive by design. No extensive training required.' },
               { step: 5, title: 'Automated Reports', desc: 'The department receives automated monthly compliance reports ready for administrative review.' },
             ].map((item, idx) => (
               <div key={item.step} className={`relative flex items-center justify-between w-full mb-10 ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                 <div className="hidden md:block w-5/12"></div>
                 <div className="absolute left-[-32px] md:left-1/2 md:-ml-5 w-10 h-10 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center shadow-lg border-4 border-white z-10 text-sm">
                   {item.step}
                 </div>
                 <div className="w-full md:w-5/12 bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] ml-4 md:ml-0 relative z-0">
                    <h4 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h4>
                    <p className="text-slate-600 leading-relaxed text-sm">{item.desc}</p>
                 </div>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* WHO IT IS FOR & PARTICIPANTS */}
      <section className="py-24 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">Designed Around The People Who Run The System.</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
              <ShieldCheck className="w-8 h-8 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">Probation Officers</h3>
              <p className="text-slate-600 text-sm leading-relaxed">Spend less time on administrative tasks and more time on meaningful casework. COMPLAVI surfaces exactly what needs your attention so the rest takes care of itself.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
              <Activity className="w-8 h-8 text-indigo-600 mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">Court Administrators</h3>
              <p className="text-slate-600 text-sm leading-relaxed">Demonstrate operational efficiency to county leadership with automated reporting, drastically reduced overhead, and measurable compliance outcomes.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
              <Scale className="w-8 h-8 text-amber-600 mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">County Judges</h3>
              <p className="text-slate-600 text-sm leading-relaxed">Every supervision decision is supported by verified, timestamped, and court-admissible compliance documentation. Clear records. Confident decisions.</p>
            </div>
          </div>

          <div className="bg-slate-900 rounded-3xl p-10 md:p-16 text-center shadow-xl border border-slate-800">
            <h2 className="text-3xl font-extrabold text-white mb-6">Designed With Participants In Mind.</h2>
            <p className="text-slate-300 text-lg leading-relaxed text-center">
              Supervision should support second chances, not create new barriers. COMPLAVI gives participants a simple, dignified way to complete required check-ins from wherever they are. From work. From home. From anywhere. In thirty seconds using the phone they already carry. No missed shifts. No long commutes. No unnecessary friction. Always free.
            </p>
          </div>
        </div>
      </section>

      {/* FUNDING & PRICING */}
      <section id="pricing" className="py-24 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           {/* Funding Alert */}
           <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 mb-20 max-w-4xl mx-auto flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-6">
             <div className="bg-emerald-100 p-4 rounded-full shrink-0">
               <DollarSign className="w-8 h-8 text-emerald-600" />
             </div>
             <div>
               <h3 className="text-xl font-bold text-emerald-900 mb-2">Already Funded For Most Counties.</h3>
               <p className="text-emerald-800 text-sm leading-relaxed">
                 Many counties are eligible to apply COMPLAVI costs toward existing federal grant allocations, including the Edward Byrne Memorial Justice Assistance Grant (JAG) program and Title II state formula grants. Our team can help your department identify available funding streams before your pilot even begins. In most cases, counties pay nothing out of their existing budget.
               </p>
             </div>
           </div>

           <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">Straightforward Pricing. County-Scale Value.</h2>
            <p className="text-slate-500 mt-4">Participant access is always free. COMPLAVI does not charge individuals under supervision. Ever.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Tier 1 */}
            <div className="bg-white border text-center p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow relative">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -mt-4 bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest border border-blue-200">
                Start Here
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2 mt-4">Pilot Program</h3>
              <div className="text-4xl font-extrabold text-slate-900 mb-2">Complimentary</div>
              <p className="text-slate-500 text-sm mb-8">90-day technical evaluation sandbox.</p>
              <ul className="text-sm text-slate-600 space-y-4 mb-8 text-left">
                <li className="flex items-center"><Check className="w-4 h-4 text-emerald-500 mr-2 shrink-0" /> Up to 100 active participants</li>
                <li className="flex items-center"><Check className="w-4 h-4 text-emerald-500 mr-2 shrink-0" /> Full platform access</li>
                <li className="flex items-center"><Check className="w-4 h-4 text-emerald-500 mr-2 shrink-0" /> Dedicated onboarding support</li>
                <li className="flex items-center"><Check className="w-4 h-4 text-emerald-500 mr-2 shrink-0" /> No procurement commitment</li>
              </ul>
              <a href="mailto:founder@complavi.com?subject=Pilot Request" className="block w-full py-3 rounded-lg font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 transition-colors">Apply For Pilot</a>
            </div>

            {/* Tier 2 */}
            <div className="bg-slate-900 border border-slate-800 text-center p-8 rounded-3xl shadow-xl transform md:-translate-y-4 relative">
              <h3 className="text-xl font-bold text-white mb-2 mt-4">Standard</h3>
              <div className="text-4xl font-extrabold text-white mb-2">$50<span className="text-xl text-slate-400 font-medium">/mo</span></div>
              <p className="text-slate-400 text-sm mb-8">Per active participant.</p>
              <ul className="text-sm text-slate-300 space-y-4 mb-8 text-left">
                <li className="flex items-center"><Check className="w-4 h-4 text-blue-400 mr-2 shrink-0" /> Up to 300 participants</li>
                <li className="flex items-center"><Check className="w-4 h-4 text-blue-400 mr-2 shrink-0" /> Full compliance dashboard</li>
                <li className="flex items-center"><Check className="w-4 h-4 text-blue-400 mr-2 shrink-0" /> Mobile check-in application</li>
                <li className="flex items-center"><Check className="w-4 h-4 text-blue-400 mr-2 shrink-0" /> Automated audit log</li>
                <li className="flex items-center"><Check className="w-4 h-4 text-blue-400 mr-2 shrink-0" /> Email support included</li>
              </ul>
              <a href="mailto:founder@complavi.com?subject=Standard Licensing Inquiry" className="block w-full py-3 rounded-lg font-bold text-slate-900 bg-white hover:bg-slate-100 transition-colors shadow-md">Contact Sales</a>
            </div>

            {/* Tier 3 */}
            <div className="bg-white border text-center p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold text-slate-900 mb-2 mt-4">County-Wide</h3>
              <div className="text-4xl font-extrabold text-slate-900 mb-2">Custom</div>
              <p className="text-slate-500 text-sm mb-8">For full departmental scaling.</p>
              <ul className="text-sm text-slate-600 space-y-4 mb-8 text-left">
                <li className="flex items-center"><Check className="w-4 h-4 text-emerald-500 mr-2 shrink-0" /> Unlimited participants</li>
                <li className="flex items-center"><Check className="w-4 h-4 text-emerald-500 mr-2 shrink-0" /> Dedicated account support</li>
                <li className="flex items-center"><Check className="w-4 h-4 text-emerald-500 mr-2 shrink-0" /> API access for integration</li>
                <li className="flex items-center"><Check className="w-4 h-4 text-emerald-500 mr-2 shrink-0" /> Priority response</li>
              </ul>
              <a href="mailto:founder@complavi.com?subject=Enterprise Custom Solution" className="block w-full py-3 rounded-lg font-bold text-slate-700 bg-slate-50 hover:bg-slate-100 transition-colors border border-slate-200">Contact Enterprise</a>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT THE FOUNDER SECTION */}
      <section id="about" className="py-24 bg-slate-950 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-8">Built From The Inside Out.</h2>
            <div className="bg-slate-900 p-10 rounded-3xl border border-slate-800 shadow-2xl relative">
              <Shield className="w-12 h-12 text-slate-800 absolute top-5 right-5 opacity-20" />
              <p className="text-slate-300 text-lg leading-relaxed text-left">
                COMPLAVI was built by a technology developer with direct experience navigating and analyzing critical documentation gaps within the justice system. Not from a whitepaper. Not from a consulting engagement. From firsthand observation of a system that was missing basic digital infrastructure.
                <br/><br/>
                That experience drives every design decision we make. The supervision features exist to serve the documentation. Not the other way around. We build for the officer who is overwhelmed. We build for the administrator who needs to justify every dollar. And we build for the county that is ready to lead.
              </p>
            </div>
        </div>
      </section>

      {/* FOOTER & DISCLOSURES */}
      <footer className="bg-white border-t border-slate-200 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="grid md:grid-cols-2 gap-12 mb-12">
             <div>
                <div className="flex items-center mb-4">
                  <Shield className="w-6 h-6 text-slate-800 mr-2" />
                  <span className="font-extrabold tracking-widest text-slate-900">COMPLAVION LLC</span>
                </div>
                <p className="text-sm text-slate-500 font-medium">Compliance technology built for county government.</p>
                <p className="text-xs text-slate-400 mt-2 max-w-sm">Court Optimized Monitoring Platform for Legal Accountability and Verified Intelligence.</p>
             </div>
             <div className="flex flex-col md:items-end">
               <h4 className="font-bold text-slate-900 mb-4">Legal & Compliance</h4>
               <nav className="flex flex-col space-y-2 md:items-end">
                 <Link href="/terms" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">Terms of Service</Link>
                 <Link href="/privacy" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">Privacy Policy</Link>
                 <a href="mailto:founder@complavi.com" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">Contact Administrator</a>
               </nav>
             </div>
           </div>

           <div className="border-t border-slate-100 pt-8 pb-4 space-y-4">
             <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Required Disclosures</h4>
             <p className="text-[10px] text-slate-400 leading-relaxed max-w-5xl">
               1. COMPLAVION LLC is an independent technology company. It is not affiliated with any law enforcement agency, federal government body, state department of corrections, or judicial authority.<br/>
               2. COMPLAVION does not store, access, or transmit raw biometric data. All biometric verification is processed on the participant&apos;s personal device. COMPLAVION receives confirmation tokens only.<br/>
               3. COMPLAVION is a supervision management tool. All case decisions, compliance determinations, and supervisory actions remain the sole responsibility of authorized county officials.<br/>
               4. Participant use of the COMPLAVI mobile application is provided at no charge. COMPLAVION does not bill, charge, or collect fees from individuals under supervision.<br/>
               5. County use of this platform may be subject to applicable state and local procurement requirements. Contact your county counsel or procurement office for guidance specific to your jurisdiction.
             </p>
           </div>
           <div className="mt-8 text-center text-xs text-slate-400 font-medium">
             © {new Date().getFullYear()} COMPLAVION LLC. All rights reserved.
           </div>
        </div>
      </footer>
    </div>
  );
}

const UsersIcon = (props: React.SVGProps<SVGSVGElement>) => <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>;
const AlertTriangleIcon = (props: React.SVGProps<SVGSVGElement>) => <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>;
const BuildingIcon = (props: React.SVGProps<SVGSVGElement>) => <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>;
