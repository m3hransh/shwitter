import {
  ReactElement,
  DetailedHTMLProps,
  TextareaHTMLAttributes,
  forwardRef,
  MouseEvent,
  FocusEvent,
  KeyboardEvent,
  useRef,
  useState,
  HTMLAttributes,
} from 'react'
import cn from 'classnames'
import { isRTL } from '../lib/translation'

type FieldElement = HTMLTextAreaElement | HTMLInputElement
export interface TextAreaProps
  extends DetailedHTMLProps<HTMLAttributes<FieldElement>, FieldElement> {
  children?: ReactElement
  className?: string
  type: 'textarea' | 'text'
}
const Field = forwardRef<FieldElement, TextAreaProps>(
  ({ className, placeholder, type = 'text', children, ...rest }, ref) => {
    const [dir, setDir] = useState('rtl')

    const handleKeyPress = (e: KeyboardEvent<FieldElement>) => {
      if (!' .,()'.includes(e.key)) setDir(isRTL(e.key) ? 'rtl' : 'ltr')
    }
    // const defaultDir = 'rtl'
    const divRef = useRef<HTMLDivElement>(null!)

    const handleOnFocus = () => {
      if (divRef.current) {
        divRef.current.classList.replace(
          'border-background-200',
          'border-primary-400',
        )
        divRef.current.classList.replace('border', 'border-2')
      }
    }
    const handleOnBlur = () => {
      if (divRef.current) {
        divRef.current.classList.replace(
          'border-primary-400',
          'border-background-200',
        )
        divRef.current.classList.replace('border-2', 'border')
      }
    }
    return (
      <div
        className={cn(
          className,
          'flex flex-col border rounded-md border-background-200',
          'p-2 focus:border-primary-300',
        )}
        onBlur={handleOnBlur}
        ref={divRef}
      >
        <div className="text-sm text-main-400">{placeholder}</div>
        {type === 'textarea' ? (
          <textarea
            onFocus={handleOnFocus}
            onBlur={handleOnBlur}
            onKeyPress={handleKeyPress}
            ref={ref as any}
            autoFocus
            dir={dir}
            {...rest}
          />
        ) : type === 'text' ? (
          <input
            onFocus={handleOnFocus}
            onBlur={handleOnBlur}
            onKeyPress={handleKeyPress}
            ref={ref as any}
            dir={dir}
            {...rest}
          />
        ) : null}
      </div>
    )
  },
)

export default Field
