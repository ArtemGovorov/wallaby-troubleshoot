import { Citation } from './easybib'
import { ThunkAction } from 'redux-thunk'
import { EasybibState } from 'types/easybibRedux'
import { DataApi, FormatApi, SourceApi, TokenStorage } from 'redux-citation-api'

export interface EasybibState {
  app: any
  projectID: string
  currentCitationStyle: string
  currentSourceType: string
  citation: Citation
  citations: Citation[]
  currentProject: {
    defaultstyle: string
    id: string
  }
  projects: any[]
  error: any
  pageNotFound: boolean
  form: any
  loading: boolean
  modal: Modal
  showProPaywall: boolean
  search: any
  searchData: any
  sources: any[]
  styles: Style[]
  stylesSearch: any
  types: any[]
  user: any
  cell: any
}

interface EasybibReduxExtras {
  dataApi: DataApi
  formatApi: FormatApi
  sourceApi: SourceApi
  tokenStorage: TokenStorage
}

export type EasybibThunkAction<R> = ThunkAction<R, EasybibState, EasybibReduxExtras>

interface Modal {
  visible: boolean
  modalType: string
  options?: any
}

interface Style {
  style: string
  code: string
  alias: string | null
  name: string
  url: string
}
