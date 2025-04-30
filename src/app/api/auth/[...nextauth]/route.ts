import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Always authorize for demo purposes
        return {
          id: 'demo-user',
          email: 'demo@example.com',
          name: 'Demo User'
        };
      }
    })
  ],
  pages: {
    signIn: '/auth/signin',
  }
});

export { handler as GET, handler as POST }; 