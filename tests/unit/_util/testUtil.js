import { jest } from '@jest/globals'
import { request } from 'http'
import { 
    Readable, 
    Writable 
} from 'stream'

export default class TestUtil {
    
    static generateReadableStream(data) {
        return new Readable({
            read() {
                for(const item of data) {
                    this.push(item)
                }

                this.push(null)
            }
        })
    }

    static generateWritableStream(data) {
        return new Writable({
            write(chunk, enc, cb) {
                onData(chunk)

                cb(null, chunk)
            }
        })
    }
    
    static defaultHandleParams() {
        const requestStream = TestUtil.generateReadableStream(['body da requisicao'])
        const response = TestUtil.generateWritableStream(() => {})
        const data = {
            request: Object.assign(requestStream, {
                headers: {},
                method: '',
                url: ''
            }),
            response: Object.assign(response, {
                writeHead: jest.fn(),
                end: jest.fn()
            })
        }
        // handler(...data.values())
        return {
            values: () => Object.values(data),
            ...data,
        }
    }
}