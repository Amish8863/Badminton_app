export default function ScoreUpdater({ label, score, onIncrease, onDecrease }) {
  return (
    <div className="flex flex-col items-center bg-gray-100 p-4 rounded-xl w-full max-w-xs mx-auto">
      <h2 className="text-lg font-bold">{label}</h2>
      <p className="text-4xl my-2">{score}</p>
      <div className="flex gap-4">
        <button onClick={onIncrease} className="bg-green-500 text-white p-2 rounded-full">▲</button>
        <button onClick={onDecrease} className="bg-red-500 text-white p-2 rounded-full">▼</button>
      </div>
    </div>
  );
}
