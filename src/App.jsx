import './App.css'
import { useRef, useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import Navbar from "./Components/Navbar"
import Manager from "./Components/Manager"
import Footer from "./Components/Footer"
import { v4 as uuidv4 } from "uuid";


function App() {
  const ref = useRef()
  const passRef = useRef()
  const [form, setform] = useState({ url: "", username: "", password: "" })
  const [passwordArray, setpasswordArray] = useState([])

  const getPasswords = async () => {
    let req = await fetch("http://localhost:3000/")
    let passwords = await req.json()
    if (passwords) {
      console.log("here are the passwords fetched from the mongo db - ", passwords)
      setpasswordArray(passwords)
    }
  }
  useEffect(() => {
    getPasswords()

  }, [])


  const ShowPassword = () => {
    if (ref.current.src.includes("/eye_close.png")) {
      ref.current.src = "/show.png"
      passRef.current.type = "text"
    }
    else {
      ref.current.src = "/eye_close.png"
      passRef.current.type = "password"
    }
    // alert("show the password ")
  }


  const SavePassword = async () => {
    if (form.url.trim() === "" || form.username.trim() === "" || form.password.trim() === "") {
      toast('Can not save blank form ', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",

      });
    }
    else {
      // console.log(form)
      setpasswordArray([...passwordArray, { ...form, id: uuidv4() }])
      // if any such id exist , delete it 
      await fetch("http://localhost:3000/", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify( {id:form.id})
       })




      let res = await fetch("http://localhost:3000/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify( { ...form, id: uuidv4() })
       })
      // localStorage.setItem("password", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
      console.log(passwordArray)
      setform({ url: "", username: "", password: "" })
      toast('Password saved', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
     
    }
  }
  const DeletePassword = async(id) => {
    // console.log("deleting password with id - ", id)
    // console.log("delete btn clicked ")
    let sure = confirm("do you really want to delete this ?")
    if (sure = true) {

      setpasswordArray(passwordArray.filter(item => item.id !== id))
       let res = await fetch("http://localhost:3000/", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify( { ...form, id})
       })
      // localStorage.setItem("password", JSON.stringify(passwordArray.filter(item => item.id !== id)))
      toast('Password deleted', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",

      });
    }

  }
  const EditPassword = (id) => {
    // console.log("editing  password with id - ", id)
    // console.log("edit btn clicked ")
    setform({...passwordArray.filter(item => item.id === id)[0] , id : id})
    setpasswordArray(passwordArray.filter(item => item.id !== id))
  }



  const HandleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value })
  }
  const HandleCopy = (text) => {
    console.log("copy btn clicked ")
    toast('Copyied to ClipBoard', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",

    });
    navigator.clipboard.writeText(text);
  }

  return (
    <>


      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"

      />
      <Navbar />
      {/* <Manager /> */}
      <div className='w-[95%] sm:w-[90%] md:w-3/4 lg:w-1/2 flex flex-col justify-center items-center mx-auto mt-5 text-white border border-purple-700 rounded-2xl p-6 bg-[#111827] shadow-lg'>
        <h2 className='text-3xl font-bold mb-6'>Password Manager</h2>
        <div className='bg-[#1F2937]  flex flex-col justify-center gap-4 w-full p-6 rounded-xl'>
          {/* Website */}
          <input value={form.url} onChange={HandleChange} name='url'
            className='bg-[#374151] text-white px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-purple-500'
            type="text"
            placeholder='Website URL' />
          <div className='flex flex-col md:flex-row gap-4'>
            {/* Username */}
            <input value={form.username} onChange={HandleChange} name='username'
              className='bg-[#374151] text-white px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-purple-500 flex-1'
              type="text"
              placeholder='Username' />
            {/* Password */}
            <div className="relative flex-1">
              <input value={form.password} onChange={HandleChange} name='password'
                ref={passRef}
                className="w-full bg-[#374151] text-white px-4 py-3 pr-12 rounded-lg outline-none focus:ring-2 focus:ring-purple-500"
                type="password"
                placeholder="Password" />

              <button onClick={ShowPassword}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-purple-400 hover:text-purple-300 hover:scale-110 transition-all duration-300">
                <img ref={ref} src="/eye_close.png" alt="eye" />
              </button>
            </div>
          </div>
          <button
            onClick={SavePassword}
            className='mt-2 cursor-pointer flex justify-center items-center bg-purple-600 hover:bg-purple-700 hover:scale-105 transition-all duration-300 py-3 rounded-lg font-semibold'>


            <lord-icon
              src="https://cdn.lordicon.com/efxgwrkc.json"
              trigger="hover">
            </lord-icon>
            Save Password
          </button>
        </div>
      </div>


      <div className=" passwords  md:w-1/2 mx-auto mt-8">
        <h2 className="text-2xl font-bold text-white mb-4">
          Saved Passwords
        </h2>


        <div className="  overflow-x-auto rounded-xl border border-purple-700">
          <table className=" w-full text-xs md:text-base text-white">
            <thead className="bg-[#251256]">
              <tr>
                <th className="md:px-4 py-3 text-left">Website</th>
                <th className="md:px-4 py-3 text-left">Username</th>
                <th className="md:px-4 py-3 text-left">Password</th>
                <th className="md:px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>



            <tbody>
              {passwordArray.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-4">
                    No passwords to show
                  </td>
                </tr>
              ) : (


                passwordArray.map((item, index) => (
                  <tr
                    key={index}
                    className="bg-[#1F2937] border-t border-purple-900 hover:bg-[#374151] transition-colors" >
                    <td className="px-3 md:px-4 py-3 text-left">
                      <a href={item.url} target='_blank'>{item.url}</a>
                      <button className='mr-4 cursor-pointer' onClick={() => { HandleCopy(item.url) }}>
                        <lord-icon
                          src="https://cdn.lordicon.com/cfkiwvcc.json"
                          trigger="hover"
                          colors="primary:#e4e4e4">
                        </lord-icon>
                      </button>
                    </td>
                    <td className="px-4 py-3">{item.username}
                      <button className='mr-4 cursor-pointer' onClick={() => { HandleCopy(item.username) }}>
                        <lord-icon
                          src="https://cdn.lordicon.com/cfkiwvcc.json"
                          trigger="hover"
                          colors="primary:#e4e4e4">
                        </lord-icon>
                      </button></td>
                    <td className="px-4 py-3">
                      {"•".repeat(item.password.length)}
                      <button className='mr-4 cursor-pointer' onClick={() => { HandleCopy(item.password) }}>
                        <lord-icon
                          src="https://cdn.lordicon.com/cfkiwvcc.json"
                          trigger="hover"
                          colors="primary:#e4e4e4">
                        </lord-icon>
                      </button></td>

                    <td className="px-4 py-3">
                      <div className="flex flex-col md:flex justify-center gap-3">

                        <button onClick={() => { EditPassword(item.id) }} className="bg-purple-600 cursor-pointer hover:bg-purple-700 px-3 py-1 rounded-lg transition-all duration-300">
                          Edit
                        </button>

                        <button onClick={() => { DeletePassword(item.id) }} className="bg-red-600 cursor-pointer hover:bg-red-700 px-3 py-1 rounded-lg transition-all duration-300">
                          Delete
                        </button>

                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />

    </>
  )
}

export default App
