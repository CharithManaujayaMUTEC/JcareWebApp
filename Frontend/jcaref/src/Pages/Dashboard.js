import React from 'react';
import NavBar from '../Components/NavBar';
import Docs from './Images/Docs.png';

const Dashboard = () => {
    const today = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = today.toLocaleDateString(undefined, options);
  const schedule = [
    { time: "09:00 AM", event: "Team Meeting" },
    { time: "12:00 PM", event: "Lunch Break" },
    { time: "03:00 PM", event: "Project Update" }
  ];
  const notices = [
    { type: "Urgent", message: "Team Meeting" },
    { type: "Urgent", message: "Lunch Break" },
    { type: "Urgent", message: "Project Update" }
  ];
    // Add your code here

    return (
        <div>
            <div>
                <NavBar />
            </div>
            <div className="bg-gradient-to-r from-white to-purple-500 min-h-screen flex flex-col justify-center items-center">
            <section className='flex justify-center '>
              <div className=" flex justify-between  gap-x-8 gap-y-4 min-h-40">
                <div className="flex items-center basis-2/4 px-10 bg-white shadow-lg rounded-2xl min-h-40 ">
                  <img
                  src={Docs}
                  className="w-20 h-20 rounded-full border-4 border-blue-500"
                  />
                  <div className=" ml-4 p-6 text-start">
                    <h1 className="text-5xl font-semibold text-gray-800">Welcome, <br></br>Dr Name</h1>
                    <p className="text-gray-600">Glad to see you back.</p>
                  </div>
                  <div className="p-4 bg-gray-100 rounded-lg text-center min-w-20">
                    <p className="text-gray-700 font-medium">Today's Date</p>
                    <p className="text-lg font-semibold text-blue-500">{formattedDate}</p>
                  </div>
                </div>
                <div className="p-5 bg-white shadow-lg rounded-2xl max-w-auto mx-auto basis-1/4">
                  <h2 className="text-2xl font-semibold text-gray-800 text-center">Today's Schedule</h2>
                  <div className="mt-4 overflow-y-auto max-h-32">
                    {schedule.length > 0 ? (
                    <div className="p-4 bg-gray-100 rounded-lg">
                      <p className="text-lg font-medium text-gray-800">{schedule[0].time} - {schedule[0].event}</p>
                      <p className="font-light text-gray-800">Description</p>
                    </div>
                    ) : (
                          <p className="text-center text-gray-500">No events scheduled for today.</p>
                        )}
                  </div>
                </div>
                <div className="p-5 bg-white shadow-lg rounded-2xl max-w-auto mx-auto basis-1/4">
                  <h2 className="text-2xl font-semibold text-gray-800 text-center">Notices</h2>
                  <div className="mt-4 overflow-y-auto max-h-32">
                    {notices.length > 0 ? (
                    <div className="p-4 bg-gray-100 rounded-lg">
                      <p className="text-lg font-medium text-gray-800">{notices[0].type} - {notices[0].message}</p>
                      <p className="font-light text-gray-800">Description</p>
                    </div>
                    ) : (
                      <p className="text-center text-gray-500">No Notices for today.</p>
                    )}
                  </div>
                </div>
              </div>
            </section>
            </div>
          </div>
    );
};

export default Dashboard;
