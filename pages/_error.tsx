import { NextPage } from 'next'
import { NextPageContext } from 'next'

interface ErrorProps {
  statusCode?: number
  hasGetInitialPropsRun?: boolean
  err?: Error
}

const Error: NextPage<ErrorProps> = ({ statusCode }) => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">
          {statusCode
            ? `Sunucu tarafında ${statusCode} hatası oluştu`
            : 'İstemci tarafında bir hata oluştu'}
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Bir şeyler yanlış gitti. Lütfen daha sonra tekrar deneyin.
        </p>
        <a
          href="/"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Ana Sayfaya Dön
        </a>
      </div>
    </div>
  )
}

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default Error
