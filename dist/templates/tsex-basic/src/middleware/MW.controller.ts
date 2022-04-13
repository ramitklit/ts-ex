import express from 'express'
import compression from 'compression'
import morgan from 'morgan'

export default class mwController {
    private app: express.Application

    constructor(app: express.Application) {
        this.app = app
    }

    /*
     * middlewares
     */
    mwController() {
        this.app.use(
            compression({
                filter() {
                    return true
                },
                threshold: 0,
            })
        )
        this.app.use(morgan('dev'))
    }
}
