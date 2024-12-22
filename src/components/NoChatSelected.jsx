import { Lock, MessageSquare } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className={`w-full md:flex flex-1 flex-col items-center justify-center p-16 bg-base-100/50 hidden`}>
      <div className="max-w-md text-center space-y-6">
        {/* Icon Display */}
        <div className="flex justify-center gap-4 mb-4">
          <div className="relative">
            <div
              className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center
             justify-center animate-bounce"
            >
              <MessageSquare className="w-8 h-8 text-green-400 " />
            </div>
          </div>
        </div>

        {/* Welcome Text */}
        <h2 className="text-2xl font-bold">Welcome to RoomieQ!</h2>
        <p className="text-base-content/60">
          Select a conversation from the sidebar to start chatting
        </p>
        <div className="flex gap-3 items-center bg-gray-100 rounded-lg py-2 justify-center"><Lock/> End-to-end encrypted</div>
      </div>
    </div>
  );
};

export default NoChatSelected;
