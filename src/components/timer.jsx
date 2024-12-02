import { useState, useEffect } from 'react';

const TimerControl = () => {
  const [removeTeamsCount, setRemoveTeamsCount] = useState('');
  const [timerDuration, setTimerDuration] = useState('');
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const [removedTeams, setRemovedTeams] = useState([]);
  const [totalTeamsRemoved, setTotalTeamsRemoved] = useState(0);

  const handleRemoveTeams = () => {
    const teamsToRemove = parseInt(removeTeamsCount);
    if (!isNaN(teamsToRemove) && teamsToRemove > 0) {
      const currentTime = new Date().toLocaleTimeString();

      setRemovedTeams((prev) => [...prev, { teamsRemoved: teamsToRemove, time: currentTime }]);
      setTotalTeamsRemoved((prev) => prev + teamsToRemove);
      setRemoveTeamsCount('');
    } else {
      alert('Please enter a valid number of teams to remove.');
    }
  };

  const startTimer = () => {
    const parsedTime = parseInt(timerDuration);
    if (isNaN(parsedTime) || parsedTime <= 0) {
      alert('Please enter a valid timer duration.');
      return;
    }

    try {
      console.log(`Starting timer for ${parsedTime} minutes...`);
      const response = { success: true, startTime: Date.now(), duration: parsedTime };

      if (response.success) {
        setIsRunning(true);
        setTime(parsedTime * 60);
      }
    } catch (error) {
      console.error('Error starting timer:', error);
    }
  };

  useEffect(() => {
    let interval;

    if (isRunning && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0 && isRunning) {
      setIsRunning(false);
    }

    return () => clearInterval(interval);
  }, [isRunning, time]);

  const formatMinutes = (seconds) => Math.floor(seconds / 60);
  const formatSeconds = (seconds) => seconds % 60;

  return (
    <div
      className="flex flex-col items-center justify-center space-y-6 h-screen overflow-hidden"
      style={{
        backgroundImage:
          'url(https://ucarecdn.com/3b2b02c1-7369-4555-838a-3afe97ff7ec4/-/preview/1000x711/)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        margin: 0,
        padding: 0,
      }}
    >
      <img
        src="https://ucarecdn.com/671f6e4e-6688-44b0-bee5-8f5e786e1a65/"
        alt="Logo2"
        className="absolute top-4 right-4 w-16 h-16"
      />

      <img
        src="https://ucarecdn.com/1d59e6f5-5e72-47ba-9366-6db6db0ba486/-/preview/260x118/"
        alt="Logo1"
        className="absolute top-6 left-1/2 transform -translate-x-1/2 w-12 h-8"
      />

      <div className="text-center text-white space-y-4">
        <h1 className="text-xl font-sans">DASHBOARD</h1>
        <div className="text-white font-serif inline-flex">
          <img
            src="https://ucarecdn.com/29d62219-3eee-4275-aca4-d50c562b276b/-/preview/1000x154/"
            alt="Rush Hour"
            className="w-96 h-auto"
          />
        </div>
        <p className="text-xl font-serif">Race the clock!</p>
      </div>

      <div className="flex sm:flex-row gap-6 sm:gap-0 flex-col sm:space-x-8 w-full justify-center w-full p-10 sm:p-0">
        <div className="sm:w-1/4 h-40 bg-gradient-to-r from-gray-500 to-gray-700 text-white p-4 rounded-lg border-8 border-yellow-400 shadow-lg flex flex-col justify-between">
          <h3 className="text-lg flex-grow flex items-center justify-center">No. of teams that will be removed after each round:</h3>
          {removedTeams.length > 0 ? (
            <p className="text-2xl text-yellow-400 font-bold flex-grow flex items-center justify-center">
              {removedTeams[removedTeams.length - 1].teamsRemoved} teams
            </p>
          ) : (
            <p className="flex-grow flex items-center justify-center">No teams removed</p>
          )}
        </div>

        <div className="sm:w-1/4 h-40 bg-gradient-to-r from-gray-500 to-gray-700 text-white p-4 rounded-lg border-8 border-yellow-400 shadow-lg flex flex-col justify-between">
          <h3 className="text-lg flex-grow flex items-center justify-center">Amount of time after which teams are eliminated:</h3>
          {timerDuration ? (
            <p className="text-xl text-yellow-400 font-bold flex-grow flex items-center justify-center">{timerDuration} minutes</p>
          ) : (
            <p className="text-2xl flex-grow flex items-center justify-center">No timer set</p>
          )}
        </div>

        <div className="sm:w-1/4 h-40 bg-gradient-to-r from-gray-500 to-gray-700 text-white p-4 rounded-lg border-8 border-yellow-400 shadow-lg flex flex-col justify-between">
          <h3 className="text-lg flex-grow flex items-center justify-center">Total no. of teams removed:</h3>
          <p className="text-2xl text-yellow-400 font-bold flex-grow flex items-center justify-center">{totalTeamsRemoved}</p>
        </div>
      </div>

      <div className="text-4xl font-bold text-center">
        <span className="text-white">SET THE </span>
        <span className="text-yellow-400">RULES!</span>
      </div>

      <div className="flex sm:flex-row flex-col gap-6 sm:gap-0 space-x-6 w-full justify-center">
        <div className="flex-1 flex justify-center items-center">
          <div className="w-1/2">
            <input
              type="number"
              value={removeTeamsCount}
              onChange={(e) => setRemoveTeamsCount(e.target.value)}
              className="border-2 p-2 rounded-lg border-yellow-400 text-white w-full h-10 bg-black"
              placeholder="Enter no. of teams to be eliminated in each round"
              min="1"
            />
            <button
              onClick={handleRemoveTeams}
              className="bg-yellow-400 text-black font-bold p-2 rounded-lg w-1/2 mt-4 mx-auto flex-1 flex justify-center items-center"
            >
              SUBMIT
            </button>
          </div>
        </div>

        <div className="flex-1 flex justify-center items-center">
          <div className="w-1/2">
            <input
              type="number"
              value={timerDuration}
              onChange={(e) => setTimerDuration(e.target.value)}
              className="border-2 p-2 rounded-lg text-white w-full h-10 border-yellow-400 bg-black"
              placeholder="Enter time after which teams are eliminated"
              min="1"
            />
            <button
              onClick={startTimer}
              className="bg-yellow-400 text-black font-bold p-2 rounded-lg w-1/2 mt-4 mx-auto flex-1 flex justify-center items-center"
            >
              SUBMIT
            </button>
          </div>
        </div>
      </div>

      {isRunning && time > 0 && (
        <div>
          <h2 className="text-3xl font-bold text-yellow-400">{`${formatMinutes(time)}m ${formatSeconds(time)}s`}</h2>
        </div>
      )}
    </div>
  );
};

export default TimerControl;
