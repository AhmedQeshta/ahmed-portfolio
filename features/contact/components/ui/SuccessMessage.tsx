interface ISuccessMessage {
  state: {
    message: string;
  };
}
export default function SuccessMessage({ state }: ISuccessMessage) {
  return (
    <div className="text-center p-6 bg-green-500/10 border border-green-500/30 rounded-lg">
      <div className="text-green-400 mb-2">✓ Message Sent!</div>
      <p className="text-white">{state.message}</p>
      <button
        onClick={() => window.location.reload()}
        className="mt-4 px-4 py-2 text-sm bg-green-500/20 hover:bg-green-500/30 rounded-md text-green-400 transition-colors">
        Send Another Message
      </button>
    </div>
  );
}
