const track = error => {
  throw new Error(error)
}

export const trackWithoutThrow = (error, user?, moreDetails?: any) => {
  if (process.env.NODE_ENV === 'development') {
    throw new Error(error)
  } else if (window.Raven) {
    const extraInfo =
      error && error.config
        ? {
            user,
            level: moreDetails.level || 'error',
            extra: {
              data: error.config.data,
              timeout: error.config.timeout,
              req: error.request,
              ...moreDetails,
            },
          }
        : {
            user,
            level: moreDetails.level || 'error',
            extra: { ...moreDetails },
          }
    window.Raven.captureException(error, extraInfo)
  }
}

export default track
