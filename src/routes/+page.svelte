<script lang="ts">
    import { goto } from '$app/navigation';
    import { authClient } from '$lib/auth-client'; 

    let isLogin = false; 
    let name = '';
    let email = '';
    let password = '';
    let loading = false;
    
    // 1. This new variable will hold the exact error reason
    let errorMessage = ''; 

    function toggleMode() {
        isLogin = !isLogin;
        password = ''; 
        errorMessage = ''; // Clear the error when switching modes
    }

    async function handleSubmit() {
        loading = true;
        errorMessage = ''; // Clear any old errors
        
        try {
            if (isLogin) {
                // --- SIGN IN ---
                const { data, error } = await authClient.signIn.email({
                    email,
                    password,
                });
                
                if (error) {
                    errorMessage = error.message || "Authentication failed";
                    console.log("Sign In Error:", error);
                } else {
                    goto('/dashboard');
                }
            } else {
                // --- SIGN UP ---
                const { data, error } = await authClient.signUp.email({
                    email,
                    password,
                    name,
                });
                
                if (error) {
                   errorMessage = error.message || "Authentication failed";
                    console.log("Sign Up Error:", error);
                } else {
                    goto('/dashboard');
                }
            }
        } catch (err: any) {
            // Catch complete crashes
            errorMessage = err.message || "An unknown error occurred";
            console.error("Hard Crash:", err);
        } finally {
            loading = false;
        }
    }
    
    async function handleGoogleLogin() {
        loading = true;
        errorMessage = '';
        try {
            const { data, error } = await authClient.signIn.social({
                provider: "google",
                callbackURL: "/dashboard" // Redirects here after successful login
            });
            
            if (error) {
                errorMessage = error.message || "Google Sign-In failed";
            }
        } catch (err: any) {
            errorMessage = err.message || "An unknown error occurred with Google";
        } finally {
            loading = false;
        }
    }
</script>

<div class="auth-container">
    <div class="auth-card">
        <div class="header">
            <div class="logo">🚀</div>
            <h1>{isLogin ? 'Welcome back' : 'Create an account'}</h1>
            <p>{isLogin ? 'Enter your details to sign in' : 'Enter your details below to get started'}</p>
        </div>

        {#if errorMessage}
            <div class="error-box">
                {errorMessage}
            </div>
        {/if}

        <form on:submit|preventDefault={handleSubmit}>
            
            {#if !isLogin}
                <div class="input-group">
                    <label for="name">Full Name</label>
                    <input id="name" type="text" bind:value={name} placeholder="Mohammed Fahad" required />
                </div>
            {/if}

            <div class="input-group">
                <label for="email">Email Address</label>
                <input id="email" type="email" bind:value={email} placeholder="you@example.com" required />
            </div>

            <div class="input-group">
                <label for="password">Password</label>
                <input id="password" type="password" bind:value={password} placeholder="••••••••" required minlength="8" />
            </div>

            <button type="submit" class="primary-btn" disabled={loading}>
                {#if loading}
                    Processing...
                {:else}
                    {isLogin ? 'Sign In' : 'Sign Up'}
                {/if}
            </button>
        </form>

        <button type="button" class="secondary-btn" style="margin-top: 1rem; border-color: #4285F4; color: #4285F4;" on:click={handleGoogleLogin} disabled={loading}>
            <svg style="width: 18px; height: 18px; margin-right: 8px; vertical-align: middle;" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
        </button>

        <div class="divider">
            <span>or</span>
        </div>

        <button type="button" class="secondary-btn" on:click={toggleMode}>
            {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
        </button>
    </div>
</div>

<style>
    /* Add this new error box style at the top of your existing styles */
    .error-box {
        background-color: #fef2f2;
        color: #b91c1c;
        padding: 0.75rem;
        border-radius: 8px;
        margin-bottom: 1.5rem;
        font-size: 0.875rem;
        border: 1px solid #f87171;
        text-align: center;
        font-weight: 500;
    }

    /* ... Keep all your other existing CSS right here ... */
    :global(body) {
        margin: 0;
        font-family: 'Inter', system-ui, -apple-system, sans-serif;
        background-color: #f1f5f9; 
        color: #0f172a;
    }
    .auth-container { display: flex; justify-content: center; align-items: center; min-height: 100vh; padding: 1rem; }
    .auth-card { background: white; padding: 2.5rem; border-radius: 16px; box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1); width: 100%; max-width: 400px; }
    .header { text-align: center; margin-bottom: 2rem; }
    .logo { font-size: 2.5rem; margin-bottom: 1rem; }
    h1 { margin: 0 0 0.5rem; font-size: 1.5rem; font-weight: 600; letter-spacing: -0.025em; }
    p { margin: 0; color: #64748b; font-size: 0.875rem; }
    .input-group { margin-bottom: 1.25rem; }
    label { display: block; margin-bottom: 0.375rem; font-size: 0.875rem; font-weight: 500; color: #334155; }
    input { width: 100%; padding: 0.75rem 1rem; border: 1px solid #cbd5e1; border-radius: 8px; font-size: 0.875rem; box-sizing: border-box; transition: all 0.2s ease; }
    input:focus { outline: none; border-color: #3b82f6; box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15); }
    button { width: 100%; padding: 0.75rem; border-radius: 8px; font-size: 0.875rem; font-weight: 600; cursor: pointer; transition: all 0.2s ease; border: none; }
    .primary-btn { background-color: #0f172a; color: white; margin-top: 0.5rem; }
    .primary-btn:hover:not(:disabled) { background-color: #1e293b; transform: translateY(-1px); }
    .primary-btn:disabled { opacity: 0.7; cursor: not-allowed; }
    .divider { text-align: center; margin: 1.5rem 0; position: relative; }
    .divider::before { content: ''; position: absolute; top: 50%; left: 0; right: 0; height: 1px; background-color: #e2e8f0; z-index: 1; }
    .divider span { background-color: white; padding: 0 1rem; color: #94a3b8; font-size: 0.75rem; position: relative; z-index: 2; }
    .secondary-btn { background-color: white; color: #0f172a; border: 1px solid #cbd5e1; }
    .secondary-btn:hover { background-color: #f8fafc; border-color: #94a3b8; }
</style>