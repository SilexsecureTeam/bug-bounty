import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Engagement() {
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
          Rules of Engagement
        </h1>

        <div className="space-y-8 text-sm leading-7 text-[#C3C7D3]">
          <div>
            <h2 className="text-[#9DB347] font-semibold mb-2">
              NOTE:
            </h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>If multiple submissions indicate a general pattern of weakness, only the first report that clearly establish the pattern will be eligible for a full bounty</li>
              <li>Rewards are tier-dependent, but final amounts are based on the CVSS score and at the discretion of the Eternal Security Team</li>
              <li>Public disclosure of the vulnerability prior to resolution will result in disqualification from the program.</li>
              <li>Anything not clearly listed in the in-scope document — including apps, URLs, or third-party services — is out-of-scope and should be avoided.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-[#9DB347] font-semibold mb-2">
              Disclosure Policy
            </h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Let us know as soon as possible upon discovery of a potential security issue, and we'll make every effort to quickly resolve the issue.</li>
              <li>Make a good faith effort to avoid privacy violations, destruction of data, and interruption or degradation of our service. Only interact with accounts you own or with the explicit permission of the account holder.</li>
              <li>Provide us a reasonable amount of time to resolve the issue before any disclosure to the public or a third-party</li>
            </ul>
          </div>

          <div>
            <h2 className="text-[#9DB347] font-semibold mb-2">
              Test Plan
            </h2>
            <p>
              Please include a header WITH YOUR USERNAME OR NAME e.g Defcomm bug bounty: (username) when you test so we can identify your requests easily
            </p>
          </div>

          <div>
            <h2 className="text-[#9DB347] font-semibold mb-2">
              In-scope vulnerabilities
            </h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Web app</li>
              <li>Mobile app</li>
              <li>Defcomm OS ( Defcomm command and control )</li>
            </ul>
          </div>

          <div>
            <p>
              Below, you can find examples of vulnerabilities and their impacts grouped by our severity ranking. This is not an exhaustive list and it is designed to give you insight on how we rate vulnerabilities.
            </p>
          </div>

          <div>
            <h2 className="text-[#9DB347] font-semibold mb-2">
              Critical
            </h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Remote Code Execution (RCE)</li>
              <li>SQL Injection</li>
              <li>Server-Side Request Forgery (SSRF) - able to pivot to internal application and/or access credentials (not blind)</li>
              <li>Information Disclosure - </li>
            </ul>
          </div>

          <div>
            <h2 className="text-[#9DB347] font-semibold mb-2">
              High
            </h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Stored Cross-Site Scripting (XSS) - stored XSS with access to non HttpOnly cookies</li>
              <li>Information Disclosure - leaked credentials</li>
              <li>Subdomain Takeover </li>
              <li>Cross-Site Request Forgery (CSRF) - leading to account takeover</li>
              <li>Account Takeover (ATO) </li>
              <li>Insecure Direct Object Reference (IDOR) - read or write access to sensitive data or important fields that you do not have permission to</li>
              <li>SQL Injection - able to perform queries with a limited access user</li>
            </ul>
          </div>

          <div>
            <h2 className="text-[#9DB347] font-semibold mb-2">
              Medium
            </h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>CSRF - able to modify important information (authenticated)</li>
              <li>ATO - required user interaction</li>
              <li>IDOR - write access to modify objects that you do not have permission to</li>
              <li>XSS - reflected/DOM XSS with access to cookies</li>
            </ul>
          </div>

          <div>
            <h2 className="text-[#9DB347] font-semibold mb-2">
              Low
            </h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Directory listings</li>
              <li>XSS - Without access to cookies/Auth Data</li>
              <li>XSS - POST based XSS</li>
              <li>Lack of HTTPS on dynamic pages </li>
              <li>Server information page (no credentials)</li>
              <li>Subdomain Takeover - on an unused subdomain</li>
            </ul>
          </div>

          <div>
            <h2 className="text-[#9DB347] font-semibold mb-2">
              Informative Bugs
            </h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Broken Link Hijacking issues </li>
              <li>Credential leakage reports are considered informational if two-factor authentication (2FA) is in place</li>
              <li>SSL Pinning/Root Detection Bypass</li>
              <li>Able to retrieve user's public information</li>
            </ul>
          </div>

          <div>
            <h2 className="text-[#9DB347] font-semibold mb-2">
              Out of scope vulnerabilities
            </h2>
            <p>
              When reporting vulnerabilities, please consider (1) attack scenario / exploitability, and (2) security impact of the bug. The following issues are considered out of scope:
            </p>
            <ul className="list-disc pl-6 space-y-1 mt-4">
              <li>Clickjacking on pages with no sensitive actions</li>
              <li>Attacks requiring MITM or physical access to a user's device.</li>
              <li>Missing best practices in SSL/TLS configuration.</li>
              <li>Content spoofing and text injection issues </li>
              <li>Software version disclosure / Banner identification issues / Descriptive error messages or headers (e.g. stack traces, application or server errors).</li>
              <li>Tabnabbing</li>
              <li>Any activity that could lead to the disruption of our service (DoS).</li>
              <li>Rate limiting or brute-force issues on non-authentication endpoints and our external Help Desk forums</li>
              <li>Removing all organization owners from the organization (or demoting all users to a "basic user" role)</li>
            </ul>
          </div>

          <div>
            <h2 className="text-[#9DB347] font-semibold mb-2">
              Declaration
            </h2>
            <p>
              I hereby confirm that:
            </p>
            <ul className="list-disc pl-6 space-y-1 mt-4">
              <li>I have read and understood the Rules of Engagement.</li>
              <li>I agree to test only within the defined scope.</li>
              <li>I will not intentionally disrupt services, access unauthorized data, or violate privacy.</li>
              <li>I will follow responsible disclosure practices and submit findings through the official channels.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-[#9DB347] font-semibold mb-2">
              Participant Details
            </h2>
            <form className="space-y-4 max-w-md">
  <div>
    <label htmlFor="fullName" className="block mb-1">Full Name: </label>
    <input
      type="text"
      id="fullName"
      className="w-full bg-[#1A1F2B] border border-[#3A4250] px-4 py-2 rounded-lg text-[#E8EAF2]"
      placeholder="input name"
    />
  </div>
  <div>
    <label htmlFor="phoneNumber" className="block mb-1">Phone Number: </label>
    <input
      type="text"
      id="phoneNumber"
      className="w-full bg-[#1A1F2B] border border-[#3A4250] px-4 py-2 rounded-lg text-[#E8EAF2]"
      placeholder="input phone number"
    />
  </div>
  <div>
    <label htmlFor="date" className="block mb-1">Date: </label>
    <input
      type="text"
      id="date"
      className="w-full bg-[#1A1F2B] border border-[#3A4250] px-4 py-2 rounded-lg text-[#E8EAF2]"
      placeholder="input Date"
    />
  </div>
  <button
    type="submit"
    className="w-full bg-[#9DB347] hover:bg-[#B2D660] px-4 py-2 rounded-lg transition-colors text-[#0A0D13] font-semibold"
  >
    Submit
  </button>
</form>
          </div>
        </div>
      </div>
    </div>
  );
}