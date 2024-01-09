import cn from "classnames"

interface ContainerProps {
  className?: string
  children: React.ReactNode
}

const Container = ({children, className}: ContainerProps): JSX.Element => {
  const BoxClasses = cn(
    'flex',
    'flex-col',
    className,
  )

  return (
    <div className={BoxClasses}>
      {children}
    </div>
  )
}

export default Container