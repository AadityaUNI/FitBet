import SimpleBottomNavigation from "../components/BottomNav/BottomNav";
import { ProfileForm } from "../components/Bets/CreateBet";
import { ProfilePopover } from "../components/ProfilePopover";
const BettingForm = () => {


  return (
    <>
      <div className="min-h-screen w-full bg-gradient-to-br from-white via-indigo-50/30 to-purple-50/40 relative">
        {/* Profile popover positioned at top-right */}
        <div className="absolute top-0 right-0 z-50 m-4">
          <ProfilePopover />
        </div>

        {/* Gradient backgrounds */}
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-gradient-to-br from-violet-300/40 via-purple-200/30 to-transparent rounded-full blur-2xl"></div>
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-bl from-cyan-300/40 via-blue-200/30 to-transparent rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-0 transform -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-pink-200/35 via-rose-200/25 to-transparent rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 right-0 transform -translate-y-1/2 w-80 h-80 bg-gradient-to-l from-emerald-200/35 via-green-200/25 to-transparent rounded-full blur-2xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-orange-300/45 via-amber-200/35 to-transparent rounded-full blur-2xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-teal-300/45 via-cyan-200/35 to-transparent rounded-full blur-2xl"></div>
        <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-[500px] h-[500px] bg-gradient-to-b from-indigo-200/25 via-purple-100/20 to-transparent rounded-full blur-3xl"></div>

        {/* Centered form content */}
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
          <div className="relative z-10 w-full max-w-md mx-auto rounded-xl shadow-xl bg-white/95 backdrop-blur-sm p-8 border border-gray-200">
            <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
              Start a FitBet
            </h1>
            <ProfileForm />
          </div>
        </div>
      </div>
      <SimpleBottomNavigation />
    </>
  );
};

export default BettingForm;
