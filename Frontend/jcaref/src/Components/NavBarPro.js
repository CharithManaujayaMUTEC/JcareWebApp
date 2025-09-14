import React, { useState, useEffect } from 'react';
import logo from './logo/Logo.png';
import { Link, useNavigate } from 'react-router-dom';

function NavBarPro() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showPatientMenu, setShowPatientMenu] = useState(false);
  const [department, setDepartment] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [patients, setPatients] = useState([]); // state for patients

  const navigate = useNavigate();

  // Fetch patients from backend
  const fetchAllPatients = async () => {
    try {
      const response = await fetch("http://localhost:8081/patientProfile/getAllPatients");
      const data = await response.json(); 
      
      // Convert strings into objects
      const allPatients = data.map((item) => {
        const [id, name, department] = item.split(" - ");
        return { id, name, department };
      });

      setPatients(allPatients); // update state
    } catch (error) {
      console.error("Error fetching patient data:", error);
    }
  };

  // Call API once when component mounts
  useEffect(() => {
    fetchAllPatients();
  }, []);

  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (department === '' || patient.department === department)
  );

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const togglePatientMenu = () => setShowPatientMenu(!showPatientMenu);

  const handlePatientClick = (patientId) => {
    navigate(`/patient/${patientId}`);
    setShowPatientMenu(false);
    setSearchTerm('');
  };  

  return (
    <nav className='bg-purple-100 py-2 px-10'>
      <div className='flex flex-col md:flex-row md:items-center justify-between'>
        <div className='flex justify-between items-center'>
          <img src={logo} alt='Jcare' />
          <div className='md:hidden'>
            <button className='text-black' onClick={toggleMenu}>
              <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path d='M4 6h16M4 12h16M4 18h16' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' />
              </svg>
            </button>
          </div>
        </div>

        {/* Desktop Menu */}
        <ul className='hidden md:flex space-x-10 items-center mt-4 md:mt-0'>
          <li><Link to='/' className='text-black font-bold font-Montserrat'>Home</Link></li>
          <li><Link to='/tasks' className='text-black font-bold font-Montserrat'>Tasks</Link></li>
          
          {/* Patients Dropdown */}
          <li className='relative'>
            <button onClick={togglePatientMenu} className='text-black font-bold font-Montserrat focus:outline-none'>
              Patients ▾
            </button>
            {showPatientMenu && (
              <div className='absolute top-10 right-0 bg-white border rounded shadow-md p-4 w-60 z-10'>
                <select
                  className='w-4/5 mb-2 p-1 border rounded text-black font-medium font-Montserrat'
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                >
                  <option value=''>All Departments</option>
                  <option value='Cardiology'>Cardiology</option>
                  <option value='Neurology'>Neurology</option>
                  <option value='Orthopedics'>Orthopedics</option>
                </select>

                <input
                  type='text'
                  placeholder='Search by name...'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className='w-4/5 p-1 border rounded mb-2 text-black font-semibold font-Montserrat'
                />

                <ul className='max-h-40 overflow-y-auto text-sm'>
                  {filteredPatients.length > 0 ? (
                    filteredPatients.map((patient) => (
                      <li
                        key={patient.id}
                        onClick={() => handlePatientClick(patient.id)}
                        className='py-1 border-b cursor-pointer hover:bg-purple-100 px-2 rounded text-black font-semibold font-Montserrat'
                      >
                        <strong>{patient.name}</strong> – ID: {patient.id}
                      </li>
                    ))
                  ) : (
                    <li className='text-gray-500 font-semibold font-Montserrat'>No patients found</li>
                  )}
                </ul>
              </div>
            )}
          </li>

          <li><Link to='/record' className='text-black font-bold font-Montserrat'>Record</Link></li>
        </ul>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <ul className='md:hidden space-y-3 mt-2'>
          <li><Link to='/' className='text-black font-bold font-Montserrat'>Home</Link></li>
          <li><Link to='/tasks' className='text-black font-bold font-Montserrat'>Tasks</Link></li>
          <li><Link to='/patients' className='text-black font-bold font-Montserrat'>Patients</Link></li>
          <li><Link to='/record' className='text-black font-bold font-Montserrat'>Record</Link></li>
        </ul>
      )}
    </nav>
  );
}

export default NavBarPro;