// Our additions to the window
interface Window {
  citationFormData: {
    source: string
    style: string
  }
  gon: {
    cell?: {
      runLoader?: boolean
    }
    archieLeagueVersion?: string
    style?: string
    type?: string
    adZonePage?: string
    state?: string
    hardPageLoad?: boolean
    manualForm: boolean
    fillForm: (any) => void
    tabId: number
    disableCreateCitationForm: () => void
    enableCitationForm: () => void
    submitForm: (
      config: {
        detail: {
          callback: (citationData: any) => void
        }
      }
    ) => void
  }
  dataLayer: any[]
  google_tag_manager: boolean
  Raven: {
    captureException: (error, extraInfo) => void
    config: (url: string, config: any) => { install: () => void }
  }
  SBMGlobal: {
    run: {
      reload: (config: AdsConfig) => Promise<any>
    }
  }
  oc: {
    cmd?: any[]
    events?: {
      on: () => {}
    }
  }
  globalCheggAuth: any
  devToolsExtension: (input: any) => any
}

interface AdsConfig {
  type: string
  pagetype: string
  pageCount: number
  citationCount: number
}
