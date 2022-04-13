import express from 'express'
import { app, server } from '../utils/initialize'
import mwController from '../middleware/MW.controller'
import router from '../routes'

export default class Server {
    private app: express.Application

    constructor() {
        this.app = app
        // middleware
        new mwController(app).mwController()
        // router
        this.routeHandler()
    }

    /*
     * routeHandler
     */
    routeHandler() {
        this.app.use(router)
        this.errorHandler()
        return this
    }

    /*
     * errorHandler
     */
    errorHandler() {
        this.app.use((req, res) => {
            res.status(404)
            if (req.accepts('html'))
                return res.json({ status: 404, message: 'route not found.' })
            if (req.accepts('json'))
                return res.json({ status: 404, message: 'route not found.' })
            res.type('txt').send({
                status: 404,
                message: 'not found',
            })
        })
        return this
    }

    /*
     * start handler
     */
    start(port: number) {
        return new Promise((resolve, reject) => {
            if (port) {
                resolve(server.listen(port))
            } else {
                reject('something went wrong with the port.')
            }
        })
    }
}
