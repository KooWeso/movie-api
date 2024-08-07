import { Alert, Empty } from 'antd'
import Link from 'antd/es/typography/Link'
import Paragraph from 'antd/es/typography/Paragraph'

type ErrorMessagePropsType = {
  message: string
}

function ErrorMessage({ message }: ErrorMessagePropsType) {
  const mainMessage = `Error ${message.slice(-3, message.length)}`
  const description = message.slice(0, -3)

  if (mainMessage === 'Error 404') return <Empty description="Rate at least one movie first" />

  return (
    <Alert
      message={mainMessage}
      description={description}
      type="error"
      showIcon
      action={
        <>
          <Paragraph>Copy link of current page:</Paragraph>
          <Paragraph copyable>https://movie-api-red-seven.vercel.app/</Paragraph>
          <Link
            href="https://plainproxies.com/resources/free-web-proxy/#https://movie-api-red-seven.vercel.app/"
            target="_blank"
          >
            And paste link into this web proxy
          </Link>
        </>
      }
    />
  )
}

export default ErrorMessage
