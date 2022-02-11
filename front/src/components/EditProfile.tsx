import { ChangeEvent, FC, ReactElement, useRef, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { translation } from '../lib/translation'
import { gql, useMutation } from '@apollo/client'
import { ME_QUERY } from '../components/Auth/AuthProvider'
import Field from './Field'
import * as yup from 'yup'
import { useAuth } from './Auth'
import { yupResolver } from '@hookform/resolvers/yup'
import ErrorMessage from './Form/ErrorMessage'
import {
  IoCameraOutline,
  IoClose,
  IoPersonCircleOutline,
} from 'react-icons/io5'
import cn from 'classnames'
import { ClipLoader } from 'react-spinners'
import _ from 'lodash'

const EDITPROFILE_MUTATION = gql`
  mutation EditProfile(
    $bio: String
    $location: String
    $website: String
    $avatar: String
  ) {
    editProfile(
      data: {
        bio: $bio
        location: $location
        website: $website
        avatar: $avatar
      }
    ) {
      bio
      location
      website
    }
  }
`
export interface EditProfileProps {
  children?: ReactElement
  className?: string
  title?: string
}

interface ProfileValues {
  name: string
  bio: string
  location: string
  website: string
  avatar: string
}

const validationSchemaGenerate = (lang: string) =>
  yup.object({
    name: yup
      .string()
      .max(50, translation[lang].editProfile.errors.max)
      .required(translation[lang].editProfile.errors.required),
    bio: yup.string().max(160, translation[lang].editProfile.errors.max),
    location: yup
      .string()
      .max(30, translation[lang].editProfile.errors.max),
    website: yup
      .string()
      .max(30, translation[lang].editProfile.errors.max),
    avatar: yup.string(),
  })

const EditProfile: FC<EditProfileProps> = ({ className, title }) => {
  const [modalIsOpen, setIsOpen] = useState(false)

  const { user, getCurrentUser } = useAuth()
  const lang = 'ir'
  const elements = translation[lang].editProfile

  const [editProfile, { loading, error }] = useMutation(
    EDITPROFILE_MUTATION,
    {
      refetchQueries: [ME_QUERY],
    },
  )

  const initialValues: ProfileValues = {
    name: user.name || '',
    bio: user?.profile?.bio || '',
    location: user?.profile?.location || '',
    website: user?.profile?.website || '',
    avatar: user?.profile?.avatar || '',
  }
  const [disabled, setDisabled] = useState(true)
  const [image, setImage] = useState(user?.profile?.avatar)
  const [imageLoading, setImageLoading] = useState(false)
  const inputFile = useRef<HTMLInputElement>(null)

  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)
  // TODO: should use context to get the language
  const validationSchema = validationSchemaGenerate(lang)
  type FormValues = yup.InferType<typeof validationSchema>
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(validationSchema),
    defaultValues: initialValues,
  })

  const uploadImage = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    const data = new FormData()
    if (files) {
      data.append('file', files[0])
      data.append('upload_preset', 'shwitter')
      setImageLoading(true)
      const res = await fetch(
        process.env.REACT_APP_CLOUDINARY_ENDPOINT as string,
        {
          method: 'POST',
          body: data,
        },
      )
      const file = await res.json()
      setImage(file.secure_url)
      setImageLoading(false)
    }
    setDisabled(false)
  }
  const onSubmit: SubmitHandler<FormValues> = async(data) => {
    await editProfile({
      variables: {...data, avatar:image}
    })
    await getCurrentUser()
    setDisabled(true) 
  }
  const onChange: SubmitHandler<FormValues> = (data) => {
    setDisabled(_.isEqual({...data, avatar:image}, initialValues))
    console.log({...data, avatar: image, initialValues})
  }
  return (
    <>
      <button className={className} onClick={openModal}>
        {title || 'Create Profile'}
      </button>
      {modalIsOpen ? (
        <>
          <div
            className="justify-center items-center flex 
            overflow-hidden fixed 
            inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative rounded-md w-full my-auto overflow-y-auto mx-auto max-w-xl">
              {/*content*/}
              <div
                className="border-0 rounded-lg shadow-lg 
                relative  flex flex-col w-full bg-white 
                outline-none focus:outline-none "
              >
                <form
                  // validationSchema={validationSchema}
                  onSubmit={handleSubmit(onSubmit)}
                  onChange={handleSubmit(onChange)}
                >
                  {/*header*/}
                  <div
                    className="flex rounded-t-lg items-center sticky top-0  
                  p-2 border-b bg-background-50 z-20 border-solid border-blueGray-200 
                  "
                  >
                    <button
                      className={cn(
                        'p-1 bg-transparent border-0 text-black',
                        'opacity-50 float-right text-3xl leading-none',
                        'font-semibold outline-none focus:outline-none',
                      )}
                      onClick={closeModal}
                    >
                      <IoClose className="bg-transparent text-black h-6 w-6 text-4xl block outline-none focus:outline-none" />
                    </button>
                    <h3 className=" font-semibold">{elements.title}</h3>
                    <button 
                      className={cn(" mr-auto rounded-2xl px-3 py-1 text-main-50 ",
                      disabled ? 'bg-background-500': 'bg-primary-500')}
                      disabled={disabled}
                    >
                      {elements.save}
                    </button>
                  </div>
                  {/*body*/}
                  <div className="bg-slate-600 h-48 w-full"></div>
                  <div className="relative -mt-20 mx-2">
                    <div className="absolute flex h-full w-36 justify-center items-center m-auto">
                      <IoCameraOutline
                        onClick={() => inputFile.current?.click()}
                        className="bg-background-100 z-40 bg-opacity-50 hover:bg-background-200 rounded-full w-12 h-12 p-2"
                      />
                    </div>
                    <div className="absolute flex h-full w-36 justify-center items-center m-auto">
                    <ClipLoader size={60} loading={imageLoading} color="#fff" />
                    </div>
                    <input
                      type="file"
                      name="file"
                      placeholder="upload file"
                      onChange={uploadImage}
                      ref={inputFile}
                      className="hidden"
                    />
                    {image ? (
                      <img
                        src={image}
                        className="w-36 h-36 rounded-full"
                        alt="avatar"
                      />
                    ) : user?.profile?.avatar ? (
                      <img
                        src={user?.profile.avatar}
                        className="w-36 h-36 rounded-full"
                        alt="avatar"
                      />
                    ) : (
                      <IoPersonCircleOutline className="inline w-36 h-36" />
                    )}
                  </div>
                  {/* Fileds */}
                  <div className="relative p-6 flex flex-col gap-2 flex-auto overflow-y-auto">
                    <Field
                      type="text"
                      {...register('name')}
                      placeholder={elements.name}
                      className={errors.name && 'border-red-600'}
                    />
                    <ErrorMessage>{errors.name?.message}</ErrorMessage>
                    <Field
                      type="textarea"
                      {...register('bio')}
                      placeholder={elements.bio}
                      className={errors.bio && 'border-red-600'}
                    />
                    <ErrorMessage>{errors.bio?.message}</ErrorMessage>
                    <Field
                      type="text"
                      {...register('location')}
                      placeholder={elements.location}
                      className={errors.location && 'border-red-600'}
                    />
                    <ErrorMessage>{errors.location?.message}</ErrorMessage>
                    <Field
                      type="text"
                      {...register('website')}
                      placeholder={elements.website}
                      className={errors.website && 'border-red-600'}
                    />
                    <ErrorMessage>{errors.website?.message}</ErrorMessage>
                  </div>
                </form>
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
