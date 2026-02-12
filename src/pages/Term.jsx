import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Term() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0D13] text-[#E8EAF2] px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 text-sm bg-[#9DB347] hover:bg-[#B2D660] px-4 py-2 rounded-lg transition-colors"
        >
          ← Back
        </button>

        <h1 className="text-3xl font-semibold tracking-wide mb-4">
          Website Terms of Use and Data Protection Notice
        </h1>

        <div className="space-y-8 text-sm leading-7 text-[#C3C7D3]">
          <div>
            <h2 className="text-[#9DB347] font-semibold mb-2">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing or using this website, you agree to comply with and be bound by these Terms of Use and our Data Protection Notice. If you do not agree, please discontinue use of the website immediately.
            </p>
          </div>

          <div>
            <h2 className="text-[#9DB347] font-semibold mb-2">
              2. Use of the Website
            </h2>
            <p>
              You agree to use this website only for lawful purposes and in a manner that does not:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Violate any applicable laws or regulations</li>
              <li>Infringe on the rights of others</li>
              <li>Disrupt or interfere with the security or functionality of the website</li>
              <li>Attempt unauthorized access to any part of the platform</li>
            </ul>
            <p className="mt-4">
              We reserve the right to suspend or terminate access where misuse is suspected.
            </p>
          </div>

          <div>
            <h2 className="text-[#9DB347] font-semibold mb-2">
              3. Intellectual Property
            </h2>
            <p>
              All content on this website, including text, graphics, logos, software, and design, is the property of defcomm solutions and technologies ltd unless otherwise stated and is protected by applicable intellectual property laws.
            </p>
            <p>
              You may not reproduce, distribute, modify, or republish any material without prior written consent.
            </p>
          </div>

          <div>
            <h2 className="text-[#9DB347] font-semibold mb-2">
              Data Protection and Privacy Notice
            </h2>

            <h2 className="text-[#9DB347] font-semibold mt-6 mb-2">
              4. Data We Collect
            </h2>
            <p>
              We may collect and process the following categories of personal data:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Full name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Organization details</li>
              <li>IP address and device information</li>
              <li>Login credentials</li>
              <li>Any information voluntarily submitted through forms</li>
            </ul>
            <p className="mt-4">
              We collect only data that is necessary for legitimate business and operational purposes.
            </p>
          </div>

          <div>
            <h2 className="text-[#9DB347] font-semibold mb-2">
              5. Lawful Basis for Processing
            </h2>
            <p>
              Your data is processed based on one or more of the following:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Your consent</li>
              <li>Performance of a contract</li>
              <li>Compliance with legal obligations</li>
              <li>Legitimate business interests that do not override your rights</li>
            </ul>
          </div>

          <div>
            <h2 className="text-[#9DB347] font-semibold mb-2">
              6. How We Use Your Data
            </h2>
            <p>
              Your information may be used to:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Provide and improve our services</li>
              <li>Respond to inquiries or requests</li>
              <li>Process registrations or transactions</li>
              <li>Send important service updates</li>
              <li>Enhance website security</li>
              <li>Meet regulatory requirements</li>
            </ul>
            <p className="mt-4">
              We do not sell personal data to third parties.
            </p>
          </div>

          <div>
            <h2 className="text-[#9DB347] font-semibold mb-2">
              7. Data Sharing
            </h2>
            <p>
              We may share your data only with:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Trusted service providers and technology partners</li>
              <li>Regulatory authorities where required by law</li>
              <li>Professional advisers under confidentiality obligations</li>
            </ul>
            <p className="mt-4">
              All third parties are required to maintain appropriate security safeguards.
            </p>
          </div>

          <div>
            <h2 className="text-[#9DB347] font-semibold mb-2">
              8. Data Security
            </h2>
            <p>
              We implement administrative, technical, and physical safeguards to protect personal data against unauthorized access, loss, misuse, or alteration.
            </p>
            <p>
              However, no online transmission is completely secure, and users share information at their own risk.
            </p>
          </div>

          <div>
            <h2 className="text-[#9DB347] font-semibold mb-2">
              9. Data Retention
            </h2>
            <p>
              Personal data will only be retained for as long as necessary to fulfill the purpose for which it was collected, comply with legal obligations, or resolve disputes.
            </p>
          </div>

          <div>
            <h2 className="text-[#9DB347] font-semibold mb-2">
              10. Your Rights
            </h2>
            <p>
              Depending on applicable data protection laws, you may have the right to:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Request access to your personal data</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your data</li>
              <li>Restrict or object to processing</li>
              <li>Withdraw consent at any time</li>
              <li>Request data portability</li>
            </ul>
            <p className="mt-4">
              Requests can be made using the contact details below.
            </p>
          </div>

          <div>
            <h2 className="text-[#9DB347] font-semibold mb-2">
              11. Cookies and Tracking Technologies
            </h2>
            <p>
              Our website may use cookies and similar technologies to enhance user experience, analyze traffic, and improve functionality.
            </p>
            <p>
              You may adjust browser settings to refuse cookies; however, some features of the site may not function properly.
            </p>
          </div>

          <div>
            <h2 className="text-[#9DB347] font-semibold mb-2">
              12. Third-Party Links
            </h2>
            <p>
              This website may contain links to external websites. We are not responsible for the privacy practices or content of those sites.
            </p>
          </div>

          <div>
            <h2 className="text-[#9DB347] font-semibold mb-2">
              13. Updates to This Notice
            </h2>
            <p>
              We may update these Terms and Privacy Notice periodically. Changes become effective immediately upon posting.
            </p>
            <p>
              We encourage users to review this page regularly.
            </p>
          </div>

          <div>
            <h2 className="text-[#9DB347] font-semibold mb-2">
              14. Contact Information
            </h2>
            <p>
              For questions, data requests, or privacy concerns, please contact:
            </p>
            <p className="mt-2">business@defcomm.ng</p>
          </div>
        </div>
      </div>
    </div>
  );
}