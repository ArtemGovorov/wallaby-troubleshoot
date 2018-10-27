declare module 'redux-citation-api' {
  type Headers = { [header: string]: string }

  interface DataApiResponse {}

  interface Links {
    me?: string
    author?: string
    citations?: string
    projects?: string
    shared?: string
    subscribed?: string
    subscribers?: string
    export?: string
    search?: string
    sharing_key?: string
  }

  interface Project {
    currentProject
    createdWith: string
    date: string
    defaultstyle: string
    id: string
    name: string
    shared: boolean
    citationCount?: number
  }

  interface Source {
    data: { [field: string]: any }
  }

  interface ProjectWithLinks extends Project {
    links: Links
  }

  export function mergeDataAndLinks(item: {
    data: Project
    links: Links
  }): ProjectWithLinks
  export function addCitation(
    source: Source,
    withProject?: boolean,
    manual?: boolean
  ): Promise<any>
  export class DataApi {
    constructor(dataUrl: string, tokenStorage: TokenStorage, headers: Headers)
    createProject(projectName: string, style: string, isPublic: boolean): Promise<any>
    getProjectWithCount(projectId: string): Promise<{ data: Project; links: Links }>
    getProject(projectId: string): Promise<{ data: Project; links: Links }>
    saveCitation(citationLink: string, citation: any): Promise<void>
    getCitation(projectId: string, citationId: string): Promise<any>
  }

  export function setCurrentProject(
    project: ProjectWithLinks
  ): {
    type: 'EASYBIB/CITATION_API/PROJECTS_SET_CURRENT'
    project: ProjectWithLinks
  }

  interface Style {
    id: string
    name: string
    value: string
  }
  export class FormatApi {
    constructor(
      params: {
        format: {
          url: string
        }
        styles: {
          url: string
        }
      },
      apiKey: string,
      headers: Headers
    )

    getStyles(): {
      results: Style[]
    }
  }

  export class SourceApi {
    constructor(
      sourcePath: {
        article: string
        book: string
        website: string
        newspaper: string
        journal: string
        magazine: string
        film: string
        default: string
      },
      autociteUrl: string,
      autociteKey: string,
      headers: Headers
    )
  }

  export class TokenStorage {
    constructor(params: {
      url: string
      options: {
        method: string
        credentials: string
        headers: { [header: string]: string }
      }
    })

    /**
     * Sets the access token that will be associated
     * with all requests to the data pai.
     */
    setToken(accessKey: string): void
  }
  export function request(
    path: string,
    method?: string,
    data?: any,
    additionalHeaders?: Headers
  ): Promise<any>
}
