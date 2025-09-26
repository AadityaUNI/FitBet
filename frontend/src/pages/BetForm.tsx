import SimpleBottomNavigation from "../components/BottomNav/BottomNav";
import { ProfileForm } from "../components/Bets/CreateBet";
const BettingForm = () => {
  return (
    <>
      <div className="min-h-screen w-full flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md mx-auto">
          <h1 className="text-2xl font-bold text-center mb-6">Start a FitBet</h1>
          <ProfileForm />
        </div>
      </div>
      <SimpleBottomNavigation />
    </>
  );
};

export default BettingForm;
