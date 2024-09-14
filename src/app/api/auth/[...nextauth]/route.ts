import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import connectDB from "lib/mongodb";
import User from "../../../../models/UserModel";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
        }),
    ],
    callbacks: {
        async session({ session }) {
            // You can customize the session here if needed
            return session;
        },
        async redirect({ url, baseUrl }) {
            // Redirect the user to the dashboard after successful sign-in
            return baseUrl + '/dashboard';
        },
        async signIn({ user, account, profile }) {
            if (account?.provider === 'google' && profile) {
                // Handle Google OAuth sign-in
                try {
                    await connectDB();

                    // Check if the user exists in the database
                    const existingUser = await User.findOne({ email: profile.email });

                    if (!existingUser) {
                        // If the user doesn't exist, create a new user
                        const newUser = new User({
                            name: profile.name,
                            email: profile.email,
                            authMethod: 'google', // Specify that the user signed up via Google
                            providerId: profile.sub, // Store the Google provider ID (usually `sub` for Google)
                        });

                        // Save the new user to the database
                        await newUser.save();
                    }

                    // Return true to allow the sign-in
                    return true;
                } catch (error) {
                    console.error('Error handling Google OAuth sign-in:', error);
                    return false; // Prevent sign-in on error
                }
            }

            // Handle other providers or return false for unsupported providers
            return false;
        }
    }
});

export { handler as GET, handler as POST };
