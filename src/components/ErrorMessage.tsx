import { Alert } from 'antd'
import Link from 'antd/es/typography/Link'

type ErrorMessagePropsType = {
  message: string
}

function ErrorMessage({ message }: ErrorMessagePropsType) {
  const mainMessage = `Error ${message.replace(/\D/g, '')}`
  const description = message.replace(/\d/g, '')

  return (
    <Alert
      message={mainMessage}
      description={description}
      type="error"
      showIcon
      action={
        <Link href="https://ant.design" target="_blank">
          Ant Design (Link)
        </Link>
      }
    />
  )
}

export default ErrorMessage
