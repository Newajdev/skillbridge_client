export const authService = {
    verifyEmail: async function (token: string) {
        try {
            const res = await fetch(
              `${process.env.NEXT_PUBLIC_API_URL}/api/auth/verify-email?token=${token}`,
              {
                method: "GET",
              },
            );

            const data = await res.json();

            if (!res.ok) {
                return { data: null, error: { message: data.message || "Failed to verify email" } };
            }

            return { data: data, error: null };
        } catch (err) {
            console.error(err);
            return { data: null, error: { message: "Something Went Wrong" } };
        }
    },
};
