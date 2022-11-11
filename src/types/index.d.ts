export type JsonRpcRequest = {
  method: Services,
  params?: any[],
  id?: string
}

export type JsonRpcResponse<T> = {
  result: T,
  error: number | null
  id?: string
}

export type Result = {
  id: string
  progress: {
    speed: number
    eta: number
    percentage: string
  }
  info: {
    url: string
    size?: string
    resolution?: string
    thumbnail: string
    title: string
  }
}

export type Params = {
  URL: string
  Params?: string
}

export type Services =
  | "Service.Exec"
  | "Service.Kill"
  | "Service.Running"
  | "Service.KillAll"
  | "Service.FreeSpace"