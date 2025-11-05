import Group1450 from "../assets/images/Group-1450.svg";

export default function Register() {
  return (
    <section
      className="relative min-h-screen flex flex-col justify-center items-center text-white overflow-hidden"
      style={{
        background: "linear-gradient(to right, #333333 20%, #85AB20 100%)",
      }}
    >
      <img
        src={Group1450}
        alt="shieldbg"
        className="absolute top-0 right-0 w-[70%] opacity-20 pointer-events-none"
      />

      <div className="text-center mb-10 z-10">
        <h2 className="text-lg text-gray-300">READY TO</h2>
        <h1 className="text-4xl font-bold text-neon">FORTIFY THE SHIELD?</h1>
      </div>

      {/* Registration Box */}
      <div className="bg-[#36460A] rounded-2xl p-12 w-[90%] md:w-[500px] text-center z-10 shadow-lg">
        <h2 className="text-2xl font-semibold mb-8">REGISTER AS</h2>

        
        <div className="space-y-8">
          {/* Bounty Hunter Button */}
          <button
            className="w-full py-3 rounded-lg font-semibold transition text-white"
            style={{
              background: "linear-gradient(90deg, #85AB20 0%, #36450D 100%)",
            }}
          >
            BOUNTY HUNTER
          </button>

          {/* Guest Button */}
          <button className="w-full py-3 rounded-lg font-semibold text-[#36450D] bg-white hover:bg-[#f0f0f0] transition">
            GUEST
          </button>

          {/* Volunteer Button */}
          <button className="w-full py-3 rounded-lg font-semibold text-[#36450D] bg-white hover:bg-[#f0f0f0] transition">
            VOLUNTEER
          </button>
        </div>
      </div>
    </section>
  );
}
