import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import GithubPovider from 'next-auth/providers/github'

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId:'389130775587-au024nruup17dvocn81r255js9hd82v8.apps.googleusercontent.com',
      clientSecret:'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'      
    }),

    GithubPovider({
      clientId:  '488811ce6177a305b2f0',
      clientSecret: '507f86568390256b676ab4f780f7e8481124a673'
    })
  ],

  secret: 'Openhemier'

}


export default NextAuth(authOptions)