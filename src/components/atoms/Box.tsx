import cn from "classnames"

interface BoxProps {
  className?: string
  children: React.ReactNode
}

const Box = ({children, className}: BoxProps): JSX.Element => {
  const BoxClasses = cn(
    'border',
    'flex',
    'flex-col',
    'justify-between',
    'items-center',
    'bg-base-200',
    'border-base-300',
    'rounded-lg',
    className,
  )

  return (
    <div className={BoxClasses}>
      {children}
    </div>
  )
}

export default Box