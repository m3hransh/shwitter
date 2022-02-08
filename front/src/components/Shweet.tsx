import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import cn from 'classnames'
import { FC, ReactElement, useCallback, useState } from 'react'
import { translation } from '../lib/translation'
import { IoPersonCircleOutline } from 'react-icons/io5'
import ErrorMessage from './Form/ErrorMessage'
import { gql, useMutation } from '@apollo/client'
import { ClipLoader } from 'react-spinners'
import ShweetInput from './ShweetInput'
import { FEED_QUERY } from './AllTweets'

const SHWEET_MUTATION = gql`
  mutation Shweet($content: String!) {
    shweet(content: $content) {
      id
      createdAt
      updatedAt
      content
      author {
        id
        name
      }
    }
  }
`

const validationSchema = yup.object({
  content: yup
    .string()
    .min(1, 'Must be more than 1 character')
    .max(256, 'Must be less than 256 characters'),
})
export interface ShweetProps{
  children?: ReactElement
  className?: string
  
}

const Shweet: FC<ShweetProps> = ({className}) => {
  // TODO: use context for the language
  const lang = 'ir'

  const [content, setContent] = useState(
    translation[lang].tweet.placeholder,
  )
  const [update, updateState] = useState(0)
  const forceUpdate = useCallback(() => updateState(value => value+1), [])

  const disabled = content.length < 1
  const [shweet, { loading, error }] = useMutation(SHWEET_MUTATION, {
    refetchQueries: [{ query: FEED_QUERY }],
  })

  const handleOnChange = (value: string) => {
    setContent(value)
  }

  type FormValues = yup.InferType<typeof validationSchema>
  const {
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(validationSchema),
  })

  const onSubmit: SubmitHandler<FormValues> = () => {
    shweet({
      variables: { content },
    })
    setContent( () => {forceUpdate()
    return ''})
  }

  if (error) console.log(error.message)
  return (
    <div className={className}>
      <form
        className="w-full flex flex-col space-y-1 mt-5 p-3"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex items-baseline">
          <div className="flex-grow-0">
            <IoPersonCircleOutline className="inline w-14 h-14 text-main-50" />
          </div>
          <ShweetInput
            className="flex-grow bg-transparent text-main-400 text-xl placeholder-main-300 focus:outline-0"
            key={update}
            value={content}
            onChange={handleOnChange}
          />
        </div>
        <div className="flex">
          <ErrorMessage>{errors.content && ''}</ErrorMessage>
          <button
            className={cn(
              'rounded-3xl p-2 px-5 text-white font-bold mr-auto flex items-center gap-2',
              disabled
                ? 'bg-primary-700'
                : 'bg-primary-400 hover:bg-primary-600',
            )}
            type="submit"
            disabled={disabled}
          >
            {loading ? (
              <>
                <ClipLoader color="#ffff" size={16} />
                <span>{translation[lang].tweet.sending} </span>
              </>
            ) : (
              translation[lang].tweet.submit
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
export default Shweet
