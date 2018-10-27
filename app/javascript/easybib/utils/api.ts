const handleErrorStatuses = async (response: Response) => {
  if (!response.ok) {
    const savedResponse = response
    const json = await response.json()
    throw new Error(
      `${savedResponse.statusText} (${savedResponse.status}) ${JSON.stringify(json)}`
    )
  }
  return response
}

const requestWithCredentials = async (
  path: string,
  method: string = 'GET',
  data?,
  responseType: string = 'json'
) => {
  const options: RequestInit = {
    method,
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }

  if (data) options.body = JSON.stringify(data)

  const response = await fetch(path, options)
  const handledResponse = await handleErrorStatuses(response)
  const parsedResponse = handledResponse[responseType]()
  return parsedResponse
}

export default requestWithCredentials
