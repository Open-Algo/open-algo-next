import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { Account, Session, Token, User } from '../../../types';

const options = {
  providers: [
    Providers.Google({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
    }),
  ],
  database: process.env.NEXT_PUBLIC_DATABASE_URL,
  pages: {
    signIn: '/auth/signin',
  },
  session: {
    jwt: true,
  },
  debug: true,
  callbacks: {
    redirect: async () => {
      return '/';
    },

    session: async (session, user) => {
      session.jwt = user.jwt;
      session.id = user.id;

      return Promise.resolve(session);
    },
    jwt: async (token, user, account) => {
      const isSignedIn = user ? true : false;

      if (isSignedIn) {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/${account.provider}/callback?access_token=${account?.accessToken}`
        );

        const data = await response.json();

        token.jwt = data.jwt;
        token.id = data.user.id;
      }

      return Promise.resolve(token);
    },
  },
};

const Auth = (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, options);

export default Auth;
