import SimpleBottomNavigation from "../components/BottomNav/BottomNav";
import { ProfilePopover } from "./ProfilePopover";


import { Coins, Flame, Clock, BicepsFlexed } from "lucide-react"
import { StatCard } from "@/components/HomePage/statCards"

const Home = () => {
  return (
    <>



      <div className="min-h-screen w-full bg-gradient-to-br from-white via-purple-50/30 to-pink-50/40 relative">
        <div className="flex items-start justify-end">
          <div className="m-4">
            <ProfilePopover />
          </div>
        </div>
        



        {/* Symmetrical rainbow gradient accents - iPhone style */}
        {/* Top corners */}
        <div className="absolute top-0 left-0 w-80 h-80 bg-gradient-to-br from-purple-300/40 via-pink-200/30 to-transparent rounded-full blur-2xl"></div>
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-blue-300/40 via-cyan-200/30 to-transparent rounded-full blur-2xl"></div>
        
        {/* Middle sides */}
        <div className="absolute top-1/2 left-0 transform -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-orange-200/35 via-yellow-200/25 to-transparent rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 right-0 transform -translate-y-1/2 w-64 h-64 bg-gradient-to-l from-green-200/35 via-teal-200/25 to-transparent rounded-full blur-2xl"></div>
        
        {/* Bottom corners */}
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-indigo-300/45 via-purple-200/35 to-transparent rounded-full blur-2xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-pink-300/45 via-rose-200/35 to-transparent rounded-full blur-2xl"></div>
        
        {/* Center accent */}
        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 w-72 h-72 bg-gradient-to-b from-cyan-200/25 via-blue-100/20 to-transparent rounded-full blur-3xl"></div>
        
        <div className="relative z-10 p-6 pt-10">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Welcome Back!
          </h1>
          {/* Token component */}
        <div className="mx-auto max-w-4xl px-4 py-5">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 lg:grid-cols-2">
            <StatCard icon={Coins}   value={850}  label="Tokens"         variant="green" />
            <StatCard icon={Flame}   value={12}   label="Day Streak"     variant="orange" />
            <StatCard icon={BicepsFlexed} value={45}  label="Total Workouts" variant="indigo" />
            <StatCard icon={Clock}   value="105m" label="This Week"      variant="violet" />
          </div>
        </div>
        <p className="text-lg text-gray-600 mb-2 pt-8">Level 7 Achieved!</p>
        <p className="text-lg text-gray-600 mb-2">12 Day Streak</p>

          {/* HomePage with user info, stats */}
        </div>
      </div>
      <SimpleBottomNavigation />
    </>
  );
};

export default Home;
