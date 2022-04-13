import { Request, Response } from 'express'

// #! api handler
export default class HealthcheckHandlerApi {
    static healthcheck(req: Request, res: Response) {
        return res.status(200).json({ connection: 'ok' })
    }
}
