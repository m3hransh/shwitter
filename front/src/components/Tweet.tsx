import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import cn from 'classnames'
import { FocusEvent, KeyboardEvent, useState } from 'react'
import { isRTL, translation } from '../lib/translation'
import { IoPersonCircleOutline } from 'react-icons/io5'
import ErrorMessage from './Form/ErrorMessage'

const validationSchema = yup.object({
  content: yup
    .string()
    .min(1, 'Must be more than 1 character')
    .max(256, 'Must be less than 256 characters'),
})

export const Tweet = (props: {}) => {
  // TODO: should inference this base on the language
  const [dir, setDir] = useState('rtl')
  const defaultDir = 'rtl'

  // TODO: use context for the language
  const lang = 'ir'

  const [tweet, setTweet] = useState(translation[lang].tweet.placeholder)

  const handleKeyPress = (e: KeyboardEvent<HTMLDivElement>) => {
    setDir(isRTL(String.fromCharCode(e.charCode)) ? 'rtl' : 'ltr')
  }

  const handleOnFocus = (e: FocusEvent<HTMLDivElement>) => {
    const placeholder = e.target.getAttribute('data-placeholder')
    const value = e.target.innerHTML
    value === placeholder && setTweet('')
    e.target.classList.replace('text-main-400', 'text-main-50')
  }
  const handleOnBlur = (e: FocusEvent<HTMLDivElement>) => {
    const placeholder = e.target.getAttribute('data-placeholder')
    if (placeholder) {
      const value = e.target.innerHTML
      if (value === '') {
        setTweet(placeholder)
        setDir(defaultDir)
        e.target.classList.replace('text-main-50', 'text-main-400')
      }
    }
  }
  type FormValues = yup.InferType<typeof validationSchema>
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(validationSchema),
  })
  const onSubmit: SubmitHandler<FormValues> = async (newUser) => {}
  return (
    <>
      <form
        className="w-full flex flex-col space-y-1 mt-5 p-3"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex items-baseline">
          <div className="flex-grow-0">
            <IoPersonCircleOutline className="inline w-14 h-14 text-main-50" />
          </div>
          <div
            contentEditable={true}
            key={'tweet'}
            {...register('content')}
            data-placeholder={translation[lang].tweet.placeholder}
            dir={dir}
            className={cn(
              'flex-grow bg-transparent text-main-400 text-xl placeholder-main-300 focus:outline-0',
              errors.content && 'border-red-600 ',
            )}
            onKeyPress={handleKeyPress}
            onFocus={handleOnFocus}
            onBlur={handleOnBlur}
          >
            {tweet}
          </div>
        </div>
          <div className="flex">
            <ErrorMessage>
              {errors.content && ''}
            </ErrorMessage>
            <button
              className="bg-primary-400 rounded-3xl p-2 px-5 text-white 
              font-bold mr-auto hover:bg-primary-600"
              type="submit"
            >
            {translation[lang].tweet.submit}
            </button>
          </div>
      </form>
    </>
  )
}
export default Tweet
