import type { JsonRpcResponse, Result } from '../types'

export const MOCK_RESULT: JsonRpcResponse<Array<Result>> = {
  error: null,
  result: new Array<Result>(10).fill(
    {
      id: Math.random().toString(36),
      info: {
        thumbnail: 'https://i.ytimg.com/vi/S7f_LlxdgI0/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAQjRTz_gHBaqR63ymeY9fVUXCJ6Q',
        title: `[페이스캠4K] 에스파 윈터 'Savage' (aespa WINTER FaceCam)│@SBS Inkigayo_2021.10.24.`,
        url: '...',
        resolution: '3840x2160',
        filesize_approx: 3424234240,
        acodec: 'opus',
        vcodec: 'webm',
      },
      progress: {
        eta: 900,
        percentage: '5%',
        speed: 1000000
      }
    }
  )
}