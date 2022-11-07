import './newUser.scss'
import Sidebar from '../../Sidebar'
import Navbar from '../../../Header/Navbar'
import { MdOutlineDriveFolderUpload } from 'react-icons/md'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import setAuthToken from '../../../../utils/setAuthToken'
import { loginSuccess } from '../../../../redux/authSlice'

const NewUser = ({ inputs, title }) => {
  const { user } = useSelector((state) => state.auth)
  const currentInfo = user ? { ...user } : {}
  const [file, setFile] = useState('')
  const [info, setInfo] = useState(currentInfo)
  
  const [skipCount,setSkipCount] = useState(true)
  const [isAvatarChanged, setIsAvatarChanged] = useState(false)

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }))
  }

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleClick = async (e) => {
    e.preventDefault()
    const data = new FormData()
    data.append('file', file)
    data.append('upload_preset', 'register')
    try {
      const uploadRes = await axios.post(
        'https://api.cloudinary.com/v1_1/dgj7h6a5k/image/upload',
        data
      )
      const { url } = uploadRes.data

      const newUser = {
        ...info,
        img: url,
      }

      dispatch(loginSuccess(newUser))

     if(title === 'Register') {
      await axios.post(`${import.meta.env.VITE_SERVER_URL}/auth/register`, newUser)
     } else if(title === 'Edit') {
      setAuthToken(user.accessToken)
      await axios.put(`${import.meta.env.VITE_SERVER_URL}/users/${user._id}`, newUser)
     }
      setFile('')
      setInfo({})
      if (title === 'Register') {
        toast.success('User is created successfully')
        navigate('/login')
      } else if (title === 'Edit') {
        toast.success('User is updated successfully')
        navigate('/admin')
      }
    } catch (err) {
      toast.error(err.response.data.message)
    }
  }

  useEffect(() => {
    if(skipCount) return setSkipCount(false)
    setIsAvatarChanged(true)
  }, [file])

  return (
    <>
      <Navbar type="sidebar" />
      <div className="new">
        <Sidebar />
        <div className="newContainer">
          <div className="top">
            <h1>{title}</h1>
          </div>
          <div className="bottom flex-col md:flex-row space-y-6 md:space-y-0">
            <div className="left mx-auto md:mx-0">
              {!isAvatarChanged ? (
                <img src={user.img} alt="" />
              ) : (
                <img
                  src={
                    file
                      ? URL.createObjectURL(file)
                      : 'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg'
                  }
                  alt=""
                />
              )}
            </div>
            <div className="right">
              <form>
                <div className="formInput w-full md:w-3/4">
                  <label htmlFor="file">
                    Image:{' '}
                    <span className="text-2xl">
                      <MdOutlineDriveFolderUpload />
                    </span>
                  </label>
                  <input
                    type="file"
                    id="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    style={{ display: 'none' }}
                  />
                </div>

                {inputs.map((input) => (
                  <div className="formInput" key={input.id}>
                    <label>{input.label}</label>
                    <input
                      value={info[input.id]}
                      onChange={handleChange}
                      type={input.type}
                      placeholder={input.placeholder}
                      id={input.id}
                    />
                  </div>
                ))}
                <button onClick={handleClick}>Send</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default NewUser
