// import { useEffect, useState } from "react";
// import { userProfile } from "../services/user";
// import { useSelector } from "react-redux";
// import { login } from "../features/authSlice";


// function Profile()
// {

//     const [profileImage, setProfileImage] = useState('');
//     const [firstName, setFirstName] = useState('');
//     const [lastName, setLastName] = useState('');
//     const [mobileNumber, setMobileNumber] = useState('');
//     const [address, setAddress] = useState('');
//     const [role, setRole] = useState('');
//     const [email, setEmail] = useState('');

    
//     useEffect(()=>{

        
//         loadUserDetails();
//         console.log(sessionStorage.getItem("token"))
//     },[])

//     const loadUserDetails= async ()=>{
//         const response= await userProfile();

//         if(response.status===200)
//         {
//             setFirstName(response.data.firstName)
//             setLastName(response.data.lastName)
//             setMobileNumber(response.data.mobile)
//             setRole(response.data.role)
//             setEmail(response.data.email)
            
//         }
        
//     }

//     const handleSave=()=>{

//     }




//     return(
//         <div className="container mt-5">
//       <h1 className="mb-4">Profile Page</h1>
      
//       <div className="mb-3">
//         <label className="form-label">First Name:</label>
//         <input
//           type="text"
//           className="form-control"
//           value={firstName}
//           onChange={(e) => setFirstName(e.target.value)}
//         />
//       </div>
//       <div className="mb-3">
//         <label className="form-label">Last Name:</label>
//         <input
//           type="text"
//           className="form-control"
//           value={lastName}
//           onChange={(e) => setLastName(e.target.value)}
//         />
//       </div>
//       <div className="mb-3">
//         <label className="form-label">Mobile Number:</label>
//         <input
//           type="text"
//           className="form-control"
//           value={mobileNumber}
//           onChange={(e) => setMobileNumber(e.target.value)}
//         />
//       </div>
//       <div className="mb-3">
//         <label className="form-label">Address:</label>
//         <textarea
//           className="form-control"
//           value={address}
//           onChange={(e) => setAddress(e.target.value)}
//         />
//       </div>
//       <div className="mb-3">
//         <label className="form-label">Role:</label>
//         <textarea
//           className="form-control"
//           value={role}
//           onChange={(e) => setRole(e.target.value)}
//           disabled={true}
//         />
//       </div>
//       <div className="mb-3">
//         <label className="form-label">Email:</label>
//         <textarea
//           className="form-control"
//           value={email}
//           onChange={(e) => setRole(e.target.value)}
//         />
//       </div>
//       <button className="btn btn-primary" onClick={handleSave}>Save</button>
//     </div>
//     )

// }

// export default Profile;