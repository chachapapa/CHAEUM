import React from 'react';

const MediaInput = () => {
  return (
    <div className="relative flex">
      <img
        className="h-80 w-80 object-cover object-center"
        src="../chacha1.jpg"
        alt="cat"
      />

      <input
        className="block w-24 h-80 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
        id="file_input"
        type="file"
      ></input>
    </div>
  );
};

export default MediaInput;
