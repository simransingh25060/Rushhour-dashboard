import { useState, useEffect } from 'react';

const TimerControl = () => {
  const [removeTeamsCount, setRemoveTeamsCount] = useState('');
  const [timerDuration, setTimerDuration] = useState('');
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [removedTeams, setRemovedTeams] = useState([]);
  const [totalTeamsRemoved, setTotalTeamsRemoved] = useState(0);
  const [eliminatedTeams, setEliminatedTeams] = useState([]);
  const [timerDurationData, setTimerDurationData] = useState('');
  const [toggleDuration, setToggleDuration] = useState(true)
  const [toggleTeam, setToggleTeam] = useState(true)
  const [teamDeletion, setTeamDeletion] = useState('')
  const [elimination, setelimination] = useState(false);
  const [remainingTeams, setRemainingTeams] = useState(null);
  const [startButtonVisible, setStartButtonVisible] = useState(true);

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); 


  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const scrollStyle = {
    overflow: isMobile ? 'auto' : 'hidden', 
    height: '100vh',
  };
  
  const delTime = async () => {
    try {
      const response = await fetch('https://leaderboard-backend-rvnf.onrender.com/api/v1/delTeams', {
        method: 'POST',
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Team elimination process triggered:', data);
        
        if (data.remainingTeams !== undefined) {
          setRemainingTeams(data.remainingTeams);
        }
        if (data.remainingTeams === 0) {
          setelimination(false);
          console.log('All teams have been eliminated.');
        }
      } else {
        console.error('Failed to trigger team elimination:', response.statusText);
        setelimination(false); 
      }
    } catch (error) {
      console.error('Error triggering team elimination:', error);
      setelimination(false); 
    }
  };

  const startEliminationProcess = async () => {
    if (elimination) {
      console.log('Elimination process is already running.');
      return;
    }
    setelimination(true);
    try {
      await delTime();
      setStartButtonVisible(false);
    } catch (error) {
      console.error('Failed to start elimination process:', error);
      setelimination(false);
    }
  };

  useEffect(() => {
    if (remainingTeams === 0) {
      setelimination(false);
    }
  }, [remainingTeams]);

  const handleTime = async () => {
    try {
      console.log(toggleDuration,"ujhygfygfy")
      setToggleDuration(true)
      const parsedDuration = parseInt(timerDuration);
      if (isNaN(parsedDuration) || parsedDuration <= 0) {
        return;
      }
  
      const response = await fetch('https://leaderboard-backend-rvnf.onrender.com/api/v1/setTime', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ time: parsedDuration }),
      });
  
      const data = await response.json();
      console.log("TIme is ",data)
  
      if (response.ok && data.time !== undefined && toggleDuration) {

        console.log('Time updated to:', data.time);
        setTimerDuration(data.time); 
        setTimerDurationData(data.time)
        setTime(data.time * 60); 
        setToggleDuration(false)
        
      } else {
        console.error('Error updating time:', data.message || 'Invalid response');
        // alert('Failed to update the timer. Please try again.');
      }
    } catch (error) {
      console.error('Error making request:', error);
      // alert('An error occurred while updating the timer.');
    }
  };

 useEffect(()=>{
  const getTime = async () => {
    try {
      const response = await fetch('https://leaderboard-backend-rvnf.onrender.com/api/v1/getTime', {
        method: 'GET',
      });
  
      const data = await response.json();
      console.log("Response is:", data);
  
      if (response.ok && data.data.time !== undefined) {
        setTimerDurationData(data.data.time)
        setToggleDuration(false)
        console.log('Fetched timer duration:', data.data.time);
      } else {
        console.error('Error fetching time:', data.message || 'Invalid response');
      }
    } catch (error) {
      console.error('Error fetching time:', error);
    }
  };
  getTime();
 },[toggleDuration])


 useEffect(() =>{
  const getTeam = async () => {
    try {
      const response = await fetch('https://leaderboard-backend-rvnf.onrender.com/api/v1/getTeams', {
        method: 'GET',
      });
  
      const data = await response.json();
      console.log("Response of team is:", data);
  
      if (response.ok && data.data.team !== undefined) {
        // setRemoveTeamsCount(data.data.team)
        setTeamDeletion(data.data.team)
        setToggleTeam(false)
        console.log('Fetched team:', data.data.team);
      } else {
        console.error('Error fetching team:', data.message || 'Invalid response');
      }
    } catch (error) {
      console.error('Error fetching team:', error);
    }
  };
  getTeam();
 },[toggleTeam])

 const getTiming = async () => {
  try {
    const response = await fetch('https://leaderboard-backend-rvnf.onrender.com/api/v1/getTime', {
      method: 'GET',
    });

    const data = await response.json();
    setTimerDurationData(data.data.time)
    console.log("Response is:", data);

    if (response.ok && data.data.time !== undefined) {
      console.log('Fetched timer duration:', data.data.time);
    } else {
      console.error('Error fetching time:', data.message || 'Invalid response');
    }
  } catch (error) {
    console.error('Error fetching time:', error);
  }
};
const getTeaming = async () => {
  try {
    const response = await fetch('https://leaderboard-backend-rvnf.onrender.com/api/v1/getTeams', {
      method: 'GET',
    });

    const data = await response.json();
    console.log("Response of team is:", data);

    if (response.ok && data.data.team !== undefined) {
      setTeamDeletion(data.data.team);
      console.log('Fetched team:', data.data.team);
    } else {
      console.error('Error fetching team:', data.message || 'Invalid response');
    }
  } catch (error) {
    console.error('Error fetching team:', error);
  }
};
  

  
  const fetchEliminatedTeams = async () => {
    try {
      const response = await fetch('https://leaderboard-backend-rvnf.onrender.com/api/v1/removedTeams', {
        method: 'GET',
      });
      const json = await response.json();
      console.log('Deleted API response:', json);
  
      if (response.ok && json.success && Array.isArray(json.removedTeams)) {
        setEliminatedTeams(json.removedTeams);
        // const totalRemoved = json.removedTeams.reduce((sum, team) => sum + (team.removedCount || 0), 0);
        // setTotalTeamsRemoved(totalRemoved);
        // console.log(totalRemoved)
      } else {
        console.error('Invalid response format:', json);
      }
    } catch (error) {
      console.error('Error fetching eliminated teams:', error);
    }
  };

  useEffect(()=>{
    if(toggleDuration){handleTime();
    }  
  },[toggleDuration])

  
  

  useEffect(() => {
    // getTime();
    // getTeam();
    getTeaming();
    getTiming();
    fetchEliminatedTeams();
    const intervalId = setInterval(() => {
      // getTime();
      // getTeam();
      getTeaming();
      getTiming();
      fetchEliminatedTeams();
    }, 3000);

    return () => clearInterval(intervalId); // Clear the interval on component unmount
  }, []);
  
  
  
  const handleRemoveTeams = () => {
    const teamsToRemove = parseInt(removeTeamsCount);
    if (!isNaN(teamsToRemove) && teamsToRemove > 0) {
      const currentTime = new Date().toLocaleTimeString();

      setRemovedTeams((prev) => [...prev, { teamsRemoved: teamsToRemove, time: currentTime }]);
      setTotalTeamsRemoved((prev) => prev + teamsToRemove);
      setRemoveTeamsCount('');
    } else {
      // alert('Please enter a valid number of teams to remove.');
    }
  };

  const handlenoofremoveteam = async () => {
    
    try {
      setToggleTeam(true)
      const teamsToRemove = parseInt(removeTeamsCount);
      if (isNaN(teamsToRemove) || teamsToRemove <= 0){
        // alert('Please enter a valid time to remove.');
        return;
      }

      const response = await fetch('https://leaderboard-backend-rvnf.onrender.com/api/v1/setTeams', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ team: teamsToRemove }),
      });

      const data = await response.json();

      if (response.ok && data.team !== undefined) {
        console.log('new updated team removal:', data.team);
        // setRemoveTeamsCount(data.team);
        setTeamDeletion(data.team)
        setToggleTeam(false)
      } else {
        console.error('Error removing time:', data.message || 'Invalid response');
        // alert('Failed to remove. Please try again.');
      }
    } catch (error) {
      console.error('Error making request:', error);
      // alert('An error occurred while removing the team.');
    }
  };

  useEffect(()=>{
    if(toggleTeam){
      console.log("djbfb")
      handlenoofremoveteam();
    }  
  },[toggleTeam])

  const startTimer = () => {
    const parsedTime = parseInt(timerDuration);
    if (isNaN(parsedTime) || parsedTime <= 0) {
      // alert('Please enter a valid timer duration.');
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

  console.log("rempved team cound");
  console.log(removeTeamsCount);

  return (
    <div
      className="flex flex-col items-center justify-center space-y-6 sm:h-screen h-auto "
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
        className="absolute top-4 right-4 sm:w-16 w-10 h-16"
      />

      <img
        src="https://ucarecdn.com/1d59e6f5-5e72-47ba-9366-6db6db0ba486/-/preview/260x118/"
        alt="Logo1"
        className="absolute top-6 left-1/2 transform -translate-x-1/2 sm:w-12 w-8 sm:h-8 h-6"
      />

      <div className="text-center text-white space-y-4">
        <h1 className="text-xl font-sans">DASHBOARD</h1>
        <div className="text-white font-serif inline-flex">
          <img
            src="https://ucarecdn.com/29d62219-3eee-4275-aca4-d50c562b276b/-/preview/1000x154/"
            alt="Rush Hour"
            className="sm:w-96 w-[50vw] h-auto mt-4"
          />
        </div>
        <p className="text-xl font-serif">Race the clock!</p>
      </div>

      <div className="flex sm:flex-row gap-6 sm:gap-0 flex-col sm:space-x-8 w-full justify-center w-full p-10 sm:p-0">
        <div className="sm:w-1/4 h-40 bg-gradient-to-r from-gray-500 to-gray-700 text-white p-4 rounded-lg border-8 border-yellow-400 shadow-lg flex flex-col justify-between">
          <h3 className="text-lg flex-grow flex items-center justify-center">No. of teams that will be removed after each round:</h3>
          {teamDeletion ? (
            <p className="text-2xl text-yellow-400 font-bold flex-grow flex items-center justify-center">
              {teamDeletion} teams
            </p>
          ) : (
            <p className="text-xl text-yellow-400 font-bold flex-grow flex items-center justify-center">Loading...</p>
          )}  
        </div>

        <div className="sm:w-1/4 h-40 bg-gradient-to-r from-gray-500 to-gray-700 text-white p-4 rounded-lg border-8 border-yellow-400 shadow-lg flex flex-col justify-between">
          <h3 className="text-lg flex-grow flex items-center justify-center">Amount of time after which teams are eliminated:</h3>
          {timerDurationData ? (
            <p className="text-xl text-yellow-400 font-bold flex-grow flex items-center justify-center">{timerDurationData} minutes</p>
          ) : (
            <p className="text-2xl flex-grow flex items-center justify-center">No timer set</p>
          )}
        </div>

        <div className="sm:w-1/4 h-40 bg-gradient-to-r from-gray-500 to-gray-700 text-white p-4 rounded-lg border-8 border-yellow-400 shadow-lg flex flex-col justify-between">
          <h3 className="text-lg flex-grow flex items-center justify-center">Total no. of teams removed:</h3>
          <p className="text-2xl text-yellow-400 font-bold flex-grow flex items-center justify-center">{eliminatedTeams.length}</p>
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
              onClick={handlenoofremoveteam}
              className="bg-yellow-400 text-black font-bold p-2 rounded-lg w-1/2 mt-4 mx-auto flex-1 flex justify-center items-center"
            >
              SUBMIT
            </button>
          </div>
        </div>

        {startButtonVisible && (
  <button 
    onClick={startEliminationProcess}
    className="bg-yellow-400 text-black font-bold p-2 rounded-lg w-[15vw] mt-4 mx-auto  flex justify-center items-center self-center"
    disabled={elimination}
  >
    START
  </button>
)}
       
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
              onClick={handleTime}
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
