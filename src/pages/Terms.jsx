import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Terms() {
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
          Defcomm Solutions Bug Bounty Terms & Conditions
        </h1>

        <p className="text-sm text-[#8F96A7] mb-10">
          Effective Date: January 5, 2026
        </p>

        <div className="space-y-8 text-sm leading-7 text-[#C3C7D3]">
          <p>
            Welcome to Defcomm Solutions’ Bug Bounty Program. By participating,
            you agree to the following terms.
          </p>

          <div>
            <h2 className="text-[#9DB347] font-semibold mb-2">
              1. Platform Use
            </h2>
            <p>
              You may use the Defcomm platform to participate in authorized bug
              bounty programs and submit vulnerability reports, provided you
              follow these terms and each program’s policy.
            </p>
          </div>

          <div>
            <h2 className="text-[#9DB347] font-semibold mb-2">
              2. Eligibility
            </h2>
            <p>
              You must comply with applicable laws and sanctions regulations.
            </p>
            <p>
              Participants must be at least 18 years old (or have guardian
              consent).
            </p>
            <p>You must not participate from restricted jurisdictions</p>
          </div>

          <div>
            <h2 className="text-[#9DB347] font-semibold mb-2">
              3. Code of Conduct
            </h2>
            <p>All participants must act professionally and ethically.</p>
            <p> You agree to:</p>
            <p>
              Test only in-scope assets ( will be provided on the day of the
              event )
            </p>
            <p>
              Avoid privacy violations, data destruction, or service disruption
            </p>
            <p>Not exploit vulnerabilities beyond proof-of-concept</p>
            <p>Communicate respectfully with Defcomm and partners</p>
            <p className="mt-4">
              Defcomm may suspend or remove participants for misconduct.
            </p>
          </div>

          <div>
            <h2 className="text-[#9DB347] font-semibold mb-2">
              4. Testing Rules
            </h2>
            <p>You must NOT:</p>
            <p>Test out-of-scope systems</p>
            <p>Perform social engineering, phishing, or physical attacks</p>
            <p>Conduct denial-of-service attacks</p>
            <p>Access or modify user data unnecessarily</p>
            <p>Reverse engineer the Defcomm platform itself</p>
            <p className="mt-4">
              Good faith security research within scope is allowed.
            </p>
          </div>

          <div>
            <h2 className="text-[#9DB347] font-semibold mb-2">
              5. Submissions
            </h2>
            <p>Reports must be original, clear, and reproducible</p>
            <p>
              Submit only via approved channels (please check your dashboard)
            </p>
            <p>Follow each program’s specific policy</p>
            <p>Do not publicly disclose findings without permission</p>
          </div>

          <div>
            <h2 className="text-[#9DB347] font-semibold mb-2">6. Rewards</h2>
            <p>
              Rewards are granted at Defcomm’s or the program owner’s discretion
            </p>
            <p>Valid reports that meet requirements may receive bounties</p>
            <p>You must provide accurate identity and payment details</p>
            <p>You are responsible for taxes</p>
            <p>Rewards may be denied for rule violations.</p>
          </div>

          <div>
            <h2 className="text-[#9DB347] font-semibold mb-2">
              7. Data & Privacy
            </h2>
            <p>You agree that:</p>
            <p>Your submissions do not violate laws or third-party rights</p>
            <p>Defcomm may use submitted data to improve security</p>
            <p>
              Sensitive data accessed during testing must be protected and
              deleted after reporting
            </p>
          </div>

          <div>
            <h2 className="text-[#9DB347] font-semibold mb-2">
              8. Independence
            </h2>
            <p>
              Participants are independent researchers, not employees or agents
              of Defcomm. Participation does not create employment or
              partnership.
            </p>
          </div>

          <div>
            <h2 className="text-[#9DB347] font-semibold mb-2">
              9. Ownership & License
            </h2>
            <p>You retain ownership of your research</p>
            <p>
              By submitting, you grant Defcomm and affected parties the right to
              use your findings to fix security issues
            </p>
            <p>Defcomm owns its platform and related content</p>
          </div>

          <div>
            <h2 className="text-[#9DB347] font-semibold mb-2">10. Disputes</h2>
            <p>
              Any disputes should be handled in good faith with Defcomm.
              Defcomm’s decision on bounty eligibility is final.
            </p>
          </div>

          <div>
            <h2 className="text-[#9DB347] font-semibold mb-2">
              11. Termination
            </h2>
            <p>
              Defcomm may suspend or terminate access for violations of these
              terms or legal concerns.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
