import React from 'react';

const Card = () => (
  <div className="bg-yellow-200 rounded-lg p-4 shadow-lg flex flex-col items-center">
    <div className="w-full flex justify-end space-x-2 mb-4">
      <div className="text-xl">❤️</div>
      <div className="text-xl">✔️</div>
    </div>
    <div className="text-center">
      <h3 className="text-lg font-semibold">Title for the category</h3>
      <p className="text-sm text-gray-700">Description for the category</p>
      <p className="text-lg font-bold mt-2">INR 2000/-</p>
      <p className="text-sm text-gray-500">City/area, State</p>
      <button className="mt-4 px-4 py-2 bg-blue-200 rounded-full text-black font-bold hover:bg-blue-300">
        Contact Now
      </button>
    </div>
  </div>
);

const App = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
    {Array.from({ length: 9 }).map((_, index) => (
      <Card key={index} />
    ))}
  </div>
);

export default App;
