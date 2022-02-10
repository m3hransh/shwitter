import { FC, ReactElement, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { translation } from '../lib/translation'

export interface EditProfileProps {
  children?: ReactElement
  className?: string
  title?: string
}

interface ProfileValues {
  bio: string
  location: string
  website: string
  avatar: string
}
const EditProfile: FC<EditProfileProps> = ({ className, title }) => {
  const [modalIsOpen, setIsOpen] = useState(false)

  const initialValues: ProfileValues = {
    bio: '',
    location: '',
    website: '',
    avatar: '',
  }

  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({})
  const onSubmit = () => {}
  return (
    <>
      <button className={className} onClick={openModal}>
        {title || 'Create Profile'}
      </button>
      {modalIsOpen ? (
        <>
          <div
            className="justify-center items-center flex 
            overflow-x-hidden overflow-y-auto fixed 
            inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-3/4 my-6 mx-auto max-w-sm">
              {/*content*/}
              <div
                className="border-0 rounded-lg shadow-lg 
                relative flex flex-col w-full bg-white 
                outline-none focus:outline-none"
              >
                {/*header*/}
                <div
                  className="flex items-start justify-between 
                  p-2 border-b border-solid border-blueGray-200 
                  rounded-t"
                >
                  {/* <h3 className="text-3xl font-semibold">Modal Title</h3> */}
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-50 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={closeModal}
                  >
                    <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <form
                    // validationSchema={validationSchema}
                    onSubmit={handleSubmit(onSubmit)}
                    className="w-full flex flex-col space-y-5 mt-3"
                  >
                    <textarea {...register('bio')} placeholder="Bio" />
                    <input
                      {...register('locatoin')}
                      placeholder="Location"
                    />
                    <input
                      {...register('website')}
                      placeholder="Website"
                    />
                    <button
                      className="bg-primary rounded-3xl p-2 text-white font-bold"
                      type="submit"
                    ></button>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  )
}

export default EditProfile
