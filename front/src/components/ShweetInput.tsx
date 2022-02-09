import { FocusEvent, KeyboardEvent, useRef, useState } from 'react'
import { isRTL, translation } from '../lib/translation'
import cn from 'classnames'

interface ShweetInputProps {
  className?: string
  chidlren?: React.ReactNode
  value: string
  onChange?: (s: string) => void
}
export const ShweetInput = (props: ShweetInputProps) => {
  // TODO: should inference this base on the language
  const lang = 'ir'
  const [dir, setDir] = useState('rtl')
  const defaultDir = 'rtl'

  const defaultValue = useRef(props.value)
  const placeholder = translation[lang].tweet.placeholder

  const handleKeyPress = (e: KeyboardEvent<HTMLDivElement>) => {
    if(!' .,()'.includes(e.key))
    setDir(isRTL(e.key) ? 'rtl' : 'ltr')
  }
  const handleInput = (event:any) => {
    if (props.onChange)
      props.onChange(event.target.innerText)

    // e.target.classList.replace('text-main-400', 'text-main-50')
  }
  const handleOnFocus = (e: FocusEvent<HTMLDivElement>) => {
    const value = e.target.innerText
    if (value === placeholder) e.target.innerText = ''
    e.target.classList.replace('dark:text-main-400', 'dark:text-main-50')
    e.target.classList.replace('text-main-400', 'text-main-600')
  }
  const handleOnBlur = (e: FocusEvent<HTMLDivElement>) => {
      const value = e.target.innerText
      if (value === '') {
        e.target.innerHTML = placeholder
        setDir(defaultDir)
        e.target.classList.replace('dark:text-main-50', 'dark:text-main-400')
        e.target.classList.replace('text-main-600', 'text-main-400')
      }
    }

  return (
    <div
      contentEditable={true}
      key={'tweet'}
      dir={dir}
      className={cn(props?.className, "dark:text-main-400 text-main-400" )}
      onKeyPress={handleKeyPress}
      onInput={handleInput}
      onBlur={handleOnBlur}
      onFocus={handleOnFocus}
      suppressContentEditableWarning={true}
      dangerouslySetInnerHTML={{__html: defaultValue.current}}
    />
  )
}

export default ShweetInput
