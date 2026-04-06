// This file is types of functions.

export type SetAdminRole = {
  req: {
    uid: string
  }

  res: {
    success: boolean
  }
}

export type SubscribeAll = {
  req: {
    token: string
  }

  res: {
    success: boolean
  }
}

export type SendNotice = {
  req: {
    title: string
    body: string
  }
  
  res: {
    success: boolean
  }
}
