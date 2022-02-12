import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { translation } from '../../lib/translation'
import ShwitterLogo from '../../assets/silent-crow.png'
import ErrorMessage from './ErrorMessage'

import { FC, ReactElement } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../Auth'
import cn from 'classnames'

const validationSchemaGenerate = (lang: string) =>
  yup.object({
    email: yup
      .string()
      .email(translation[lang].form.emailMsg)
      .required(translation[lang].form.requiredMsg),
    password: yup
      .string()
      .max(20, translation[lang].form.passwordMaxMessage)
      .required(translation[lang].form.requiredMsg),
  })

export interface LoginFormProps {
  children?: ReactElement
}

const LoginForm: FC<LoginFormProps> = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { login, state } = useAuth()

  const locState = location.state as { from: { pathname: string } }
  const from = locState?.from?.pathname || '/'

  // TODO: should use context to get the language
  const lang = 'ir'

  const validationSchema = validationSchemaGenerate(lang)
  type FormValues = yup.InferType<typeof validationSchema>
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(validationSchema),
  })

  const onSubmit: SubmitHandler<FormValues> = async (loginUser) => {
    const user = await login(loginUser)
    if (user?.email === loginUser.email) {
      navigate(from, { replace: true })
    }
  }
  return (
    <div dir="rtl" className=" max-w-lg mx-auto w-3/4">
      <div className="flex flex-col items-center text-center p-8">
        <img src={ShwitterLogo} alt="logo" className="w-40" />
        <h1 className="text-2xl font-bold ">
          {translation[lang].form.login}{' '}
        </h1>
        <form
          className="w-full flex flex-col space-y-1 mt-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            {...register('email')}
            placeholder={translation[lang].form.email}
            dir="ltr"
            className={cn('input', errors.email && 'border-red-600')}
          />
          <ErrorMessage>{errors.email?.message}</ErrorMessage>
          <input
            {...register('password')}
            type="password"
            placeholder={translation[lang].form.password}
            dir="ltr"
            className={cn('input', errors.email && 'border-red-600')}
          />
          <ErrorMessage>{errors.password?.message}</ErrorMessage>
          <button
            className="bg-primary-500 rounded-3xl p-2 text-main-50 font-bold"
            type="submit"
          >
            {translation[lang].form.login}
          </button>
          <ErrorMessage>
            {state?.error && "Couldn't connect"}
          </ErrorMessage>
          {state?.loading && <p>Loadding</p>}
        </form>
        <div className="mt-14">
          <h4 className="font-bold">{translation[lang].form.noAccount}</h4>
          <Link className="text-main-500 font-medium" to="/signup">
            {translation[lang].form.signup}
          </Link>
        </div>
      </div>
    </div>
  )
}
export default LoginForm
