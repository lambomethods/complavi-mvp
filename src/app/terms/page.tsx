import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Shield } from 'lucide-react';

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-24">
      <header className="bg-white border-b border-slate-200 py-6">
        <div className="max-w-4xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center">
            <Shield className="w-6 h-6 text-blue-600 mr-2" />
            <span className="font-extrabold tracking-widest text-slate-900 text-lg">COMPLAVI</span>
          </div>
          <Link href="/" className="text-sm font-medium text-slate-500 hover:text-blue-600 flex items-center transition-colors">
            <ArrowLeft className="w-4 h-4 mr-1" /> Return Home
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 pt-16">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Terms of Service</h1>
        <p className="text-slate-500 mb-12">Effective Date: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>

        <div className="prose prose-slate max-w-none space-y-8">
          <p className="lead text-lg text-slate-700 font-medium">
            These terms govern your department's use of COMPLAVI's compliance management platform. By accessing the platform, your department agrees to the following.
          </p>

          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">1. Services provided.</h3>
            <p className="text-slate-600 leading-relaxed">
              COMPLAVI provides cloud-based compliance management software designed to support county courts and probation departments in tracking participant supervision requirements.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">2. County responsibilities.</h3>
            <p className="text-slate-600 leading-relaxed">
              The county administrator is responsible for ensuring appropriate use of the platform in accordance with applicable federal, state, and local laws governing supervision and participant data.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">3. Data ownership.</h3>
            <p className="text-slate-600 leading-relaxed">
              All data entered into the COMPLAVI platform remains the sole property of the county. COMPLAVI does not sell, transfer, or use county data for any purpose outside of service delivery.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">4. Participant access.</h3>
            <p className="text-slate-600 leading-relaxed">
              Participant use of the mobile check-in application is provided at no cost. Counties are responsible for communicating platform use requirements to participants in accordance with their supervision conditions.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">5. Limitation of liability.</h3>
            <p className="text-slate-600 leading-relaxed">
              COMPLAVI provides supervision management tools to support county decision-making. All final supervision decisions remain the responsibility of authorized county officials. COMPLAVI is not liable for outcomes resulting from administrative decisions made using platform data.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">6. Service termination.</h3>
            <p className="text-slate-600 leading-relaxed">
              Either party may terminate service with 30 days written notice. County data will be returned or deleted within 60 days of termination at the county's direction.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">7. Governing law.</h3>
            <p className="text-slate-600 leading-relaxed">
              These terms are governed by the laws of the state in which COMPLAVI LLC is incorporated.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
