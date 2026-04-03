import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Shield } from 'lucide-react';

export default function PrivacyPolicy() {
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
        <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Privacy Policy</h1>
        <p className="text-slate-500 mb-12">Effective Date: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>

        <div className="prose prose-slate max-w-none space-y-8">
          <p className="lead text-lg text-slate-700 font-medium">
            COMPLAVION is committed to responsible data stewardship. This policy explains what information we collect, how we use it, and how we protect it.
          </p>

          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">What we collect</h3>
            <p className="text-slate-600 leading-relaxed">
              Department administrator names and contact information. Participant check-in confirmation data including GPS coordinates and biometric verification tokens. Platform usage data for service improvement purposes.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">What we do not collect</h3>
            <p className="text-slate-600 leading-relaxed">
              <strong>Raw biometric data of any kind.</strong> Biometric verification is processed entirely on the participant&apos;s personal device using device-native technology. COMPLAVION receives only a cryptographic confirmation token indicating whether verification was successful. We never see, store, or transmit facial data.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">How we use information</h3>
            <p className="text-slate-600 leading-relaxed">
              To deliver compliance tracking services to authorized county administrators. To generate audit records for administrative and court use. To improve platform performance and reliability. We do not use participant or county data for advertising, research resale, or any purpose outside direct service delivery.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Data security</h3>
            <p className="text-slate-600 leading-relaxed">
              All platform data is stored on encrypted cloud infrastructure. Access is restricted to authorized county administrators only. COMPLAVION maintains industry-standard security protocols and conducts regular security reviews.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Data retention</h3>
            <p className="text-slate-600 leading-relaxed">
              County data is retained for the duration of the service agreement plus 36 months for audit record purposes, unless a longer retention period is required by applicable law.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Your rights</h3>
            <p className="text-slate-600 leading-relaxed">
              Participants seeking information about their stored check-in data should contact their county administrator. County administrators may request a full data export or deletion at any time.
            </p>
          </div>

          <div className="pt-8 border-t border-slate-200">
            <h3 className="text-xl font-bold text-slate-900 mb-3">Contact</h3>
            <p className="text-slate-600 leading-relaxed">
              For privacy inquiries: <a href="mailto:privacy@complavi.com" className="text-blue-600 font-medium hover:underline">privacy@complavi.com</a>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
