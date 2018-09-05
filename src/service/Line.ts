import Crypto from 'crypto';
import LineBot from '@line/bot-sdk';
import Koa from 'koa';

class Line {
    private channelAccessToken = process.env.channelAccessToken || ""
    private channelSecret = process.env.channelSecret || ""

    public authentication = async (ctx : Koa.Context) => {
        const xLineSignature = ctx.req.headers['x-line-signature'];
        const resultHash = Crypto.createHmac('sha256', this.channelSecret)
                        .update(Buffer.from(JSON.stringify(ctx.body),'utf8'))
                        .digest('base64');

        return {
            resultHash,
            token : this.channelAccessToken,
            isValid: (resultHash === xLineSignature)
        }
    }
}

export default new Line()