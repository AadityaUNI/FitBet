import { StartButton } from "@/components/startPage/startButton";

const LandingPage = () => {
  return (
    <>
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white p-6">
      <div className="text-center">
        <h1 className="text-5xl font-extrabold text-blue-900 mb-4">Welcome to FitBet</h1>
        <p className="text-lg text-blue-700 mb-8">Your smart companion for informed betting decisions.</p>
        <StartButton  />
      </div>
    </div>
    </>
  );
};
export default LandingPage;