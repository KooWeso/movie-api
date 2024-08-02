import { Alert, Empty } from 'antd'
import Link from 'antd/es/typography/Link'

type ErrorMessagePropsType = {
  message: string
}

function ErrorMessage({ message }: ErrorMessagePropsType) {
  const mainMessage = `Error ${message.replace(/\D/g, '')}`
  const description = message.replace(/\d/g, '')

  if (mainMessage === 'Error 404') return <Empty description="Rate at least one movie first" />

  return (
    <Alert
      message={mainMessage}
      description={description}
      type="error"
      showIcon
      action={
        <Link
          href="https://plainproxies.com/resources/free-web-proxy/#https://movie-api-red-seven.vercel.app/"
          target="_blank"
        >
          ! copy link of this page ! and access it throgh THIS LINK that leads to online proxy
        </Link>
      }
    />
  )
}

export default ErrorMessage
