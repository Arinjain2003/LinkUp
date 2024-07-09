
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import conf from "../assets/conf.jpg";
import { v4 as uuidv4 } from 'uuid';
import TopNav from "../components/TopNav";

const JoinMeet = () => {
  const [RoomCode, setRoomCode] = useState("");
  const navigate = useNavigate();
  
  useEffect(() => {
    if (RoomCode) {
      navigate(`/room/${RoomCode}`);
    }
  }, [RoomCode, navigate]);

  const submitCode = (e) => {
    e.preventDefault();
    console.log(RoomCode);
    navigate(`/room/${RoomCode}`);
  };

  const generateRoomCode = (e) => {
    
    const newRoomCode = uuidv4();
    setRoomCode(newRoomCode);
    navigate(`/room/${newRoomCode}`);
  };

  return (
    <div className=" bg-primary-black">
      {/* Navbar */}
      <TopNav />
      {/* Hero */}
      <div className="relative h-screen ">
        {/* Image */}
        <div className="absolute h-full w-full flex overflow-hidden">
          <img src={conf} className="object-cover  w-full h-full" />
        </div>
        {/* Overlay */}
        <div className="absolute h-full w-full flex overflow-hidden bg-black/60"></div>
        {/* Hero Info */}
        <div className="lg:flex lg:pt-20 flex-col items-center justify-center relative z-10 px-6 md:max-w-[90vw] mx-auto">
          {/* Main */}
          <div className=" flex flex-col items-center justify-center pb-8">
            <h1 className="text-[50px] md:text-[80px] text-white font-bold pt-12">
              LinkUp
            </h1>
            <p className="text-[26px] text-white  -mt-2">Enter Room Code</p>
          </div>

          {/* Enter Code */}
          <form
            onSubmit={submitCode}
            className="text-white md:pt-12 flex flex-col items-center justify-center"
          >
            <div className=" flex  justify-center items-center">
              {/* <label className="text-[30px] md:text-[40px] font-bold pt-6">
                Enter Room Code
              </label> */}
              <input
                type="text"
                required
                placeholder="Enter Room Code"
                value={RoomCode}
                onChange={(e) => setRoomCode(e.target.value)}
                className="py-1.5 md:py-2 px-4 rounded-full max-w-[14rem] mt-2 text-black md:mt-6 outline-0"
              />
            </div>
            <button
              type="submit"
              className=" bg-blue-500 hover:bg-blue-400 duration-100 ease-out font-bold w-[5rem] md:w-[7rem] rounded-full py-[5px] md:py-[7px] mt-2 md:mt-4 "
            >
              Go
            </button>

            <button
              type="button"
              onClick={generateRoomCode}
              className=" bg-green-500 hover:bg-green-400 duration-100 ease-out font-bold w-[10rem] md:w-[14rem] rounded-full py-[5px] md:py-[7px] mt-2 md:mt-4"
            >
              Create Random Room
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default JoinMeet;