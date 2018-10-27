import { getLocalBibInfo } from 'easybib/utils/localStorage'
import { EasybibClientState } from 'types/easybib'

export const refreshAds = (adZone: string): Promise<any> => {
  const localBibInfo: EasybibClientState = getLocalBibInfo()

  if (window.SBMGlobal) {
    return window.SBMGlobal.run.reload({
      type: 'pagechange',
      pagetype: adZone,
      pageCount: localBibInfo.pageCount,
      citationCount: localBibInfo.citationCount || 0,
    })
  }
  return Promise.resolve()
}

export default refreshAds
