import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { translation } from '../../lib/translation'
import ShwitterLogo from '../../assets/silent-crow.png'
import ErrorMessage from './ErrorMessage'
import { useMutation, gql } from '@apollo/client'

import { FC, ReactElement } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const validationSchemaGenerate = (lang: string) =>
  yup.object({
    name: yup.string().required(translation[lang].form.requiredMsg),
    email: yup
      .string()
      .email(translation[lang].form.emailMsg)
      .required(translation[lang].form.requiredMsg),
    password: yup
      .string()
      .max(20, translation[lang].form.passwordMaxMessage)
      .required(translation[lang].form.requiredMsg),
    confirmPassword: yup
      .string()
      .oneOf(
        [yup.ref('password'), null],
        translation[lang].form.passwordConfMsg,
      ),
  })

export interface SignupFormProps {
  children?: ReactElement
}

const SIGNUP_MUTATION = gql`
mutation Signup($name:String!, $email:String!, $password:String!){
  signup(name:$name, email:$email, password:$password){
    token
  }
}
`
interface SignupFormValues {
  name: string
  email: string
  password: string
}

const SignupForm: FC<SignupFormProps> = () => {
  const location = useLocation()
  const navigate = useNavigate()
  // Todo: In IsAuthenticated component add state from
  // <Navigate to="/login" state={{ from: location }} replace />;
  const state = location.state as { from: { pathname: string } }
  let from = state?.from?.pathname || '/'
  const [signup] = useMutation(SIGNUP_MUTATION)

  // Todo: Should use context to get the langauge
  const lang = 'ir'
  const validationSchema = validationSchemaGenerate(lang)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(validationSchema),
  })

  const onSubmit: SubmitHandler<SignupFormValues> = async (data) => {
    try{

    const response = await signup({
      variables: data,
    })
    localStorage.setItem('token', response.data.signup.token)
    }catch(e){
      console.log(e)
    }
    navigate(from, {replace: true})
  }

  return (
    <div dir="rtl" className=" max-w-lg mx-auto w-3/4">
      <div className="flex flex-col items-center text-center p-8">
        <img src={ShwitterLogo} alt="logo" className="w-40" />
        <h1 className="text-2xl font-bold ">
          {translation[lang].form.signup}{' '}
        </h1>
        <form
          className="w-full flex flex-col space-y-1 mt-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            {...register('name')}
            placeholder={translation[lang].form.name}
            className={errors.name && 'border-red-600'}
          />
          <ErrorMessage>{errors.name?.message}</ErrorMessage>
          <input
            {...register('email')}
            placeholder={translation[lang].form.email}
            dir="ltr"
            className={errors.email && 'border-red-600'}
          />
          <ErrorMessage>{errors.email?.message}</ErrorMessage>
          <input
            {...register('password')}
            type="password"
            placeholder={translation[lang].form.password}
            dir="ltr"
            className={errors.email && 'border-red-600'}
          />
          <ErrorMessage>{errors.password?.message}</ErrorMessage>
          <input
            {...register('confirmPassword')}
            type="password"
            placeholder={translation[lang].form.passwordConf}
            dir="ltr"
            className={errors.email && 'border-red-600'}
          />
          <ErrorMessage>{errors.confirmPassword?.message}</ErrorMessage>
          <button
            className="bg-primary-500 rounded-3xl p-2 text-main-50 font-bold"
            type="submit"
          >
            {translation[lang].form.signup}
          </button>
        </form>
        <div className="mt-14">
          <h4 className="font-bold">
            {translation[lang].form.haveAccount}
          </h4>
          <Link className="text-main-500 font-medium" to="/login">
            {translation[lang].form.login}
          </Link>
        </div>
      </div>
    </div>
  )
}
export default SignupForm
