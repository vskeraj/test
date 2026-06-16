import { signIn } from "next-auth/react";

// Google/Facebook sign-in. The underlying providers are only registered in
// NextAuth when their credentials are configured (see api/auth/[...nextauth].ts);
// without creds these buttons return a configuration error rather than crashing.
const OAuthButtons = () => {
  const start = (provider: "google" | "facebook") =>
    signIn(provider, { callbackUrl: "/dashboard" });

  return (
    <div className="mt-6">
      <div className="relative flex items-center">
        <div className="flex-grow border-t border-border" />
        <span className="mx-3 text-xs uppercase tracking-wider text-muted-foreground">or</span>
        <div className="flex-grow border-t border-border" />
      </div>

      <div className="mt-6 space-y-3">
        <button
          type="button"
          onClick={() => start("google")}
          className="w-full flex items-center justify-center gap-3 px-4 py-2.5 rounded-lg border border-border bg-card text-sm text-foreground hover:bg-muted transition-colors"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1Z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z" />
            <path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84Z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.06l3.66 2.84C6.71 7.3 9.14 5.38 12 5.38Z" />
          </svg>
          Continue with Google
        </button>

        <button
          type="button"
          onClick={() => start("facebook")}
          className="w-full flex items-center justify-center gap-3 px-4 py-2.5 rounded-lg border border-border bg-card text-sm text-foreground hover:bg-muted transition-colors"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="#1877F2" aria-hidden="true">
            <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07c0 6.02 4.39 11.01 10.13 11.93v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.25h3.33l-.53 3.49h-2.8V24C19.61 23.08 24 18.09 24 12.07Z" />
          </svg>
          Continue with Facebook
        </button>
      </div>
    </div>
  );
};

export default OAuthButtons;
