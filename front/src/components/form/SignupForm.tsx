import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { translation } from '../../lib/translation'
import ErrorMessage from './ErrorMessage'

import { FC, ReactElement } from 'react'

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

const SignupForm: FC<SignupFormProps> = () => {
  // Todo: Should use context to get the langauge
  const lang = 'ir'
  const validationSchema = validationSchemaGenerate(lang)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  })

  const onSubmit = (data: any) => console.log(data)

  return (
    <div dir="rtl" className="bg-background-900 max-w-lg mx-auto w-3/4">
      <div className="flex flex-col items-center text-center p-8">
        <h1 className="text-xl font-bold text-main-50">
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
      </div>
    </div>
  )
}
export default SignupForm
