<script lang="ts">
    import { authClient } from '$lib/auth-client';
    import { goto } from '$app/navigation';

    export let data;

    async function handleSignOut() {
        await authClient.signOut();
        goto('/');
    }
</script>

<div class="dashboard-container">
    <nav class="navbar">
        <div class="logo">🚀 MyApp</div>
        <div class="user-menu">
            <span class="greeting">Hello, <strong>{data.user.name}</strong></span>
            <button on:click={handleSignOut} class="logout-btn">Sign Out</button>
        </div>
    </nav>

    <main class="content">
        <div class="welcome-card">
            <h1>Welcome to your Dashboard</h1>
            <p>Your registered email is: <code>{data.user.email}</code></p>
            
            <div class="role-badge">
                Role: <strong>{data.user.role}</strong>
            </div>

            <p>You have successfully conquered SvelteKit routing, Better Auth, and PostgreSQL!</p>

            <div style="margin: 2rem 0;">
                <a href="/profile" class="profile-btn">
                    👤 Go to My Profile
                </a>
            </div>

            {#if data.user.role === 'admin'}
                <div class="admin-panel">
                    <h2>⚙️ Admin Controls</h2>
                    <p>You have elevated privileges. You can manage users here.</p>
                    <button class="danger-btn">Delete System Logs</button>
                </div>
            {/if}
        </div>
    </main>
</div>

<style>
    .dashboard-container {
        min-height: 100vh;
        background-color: #f8fafc;
        font-family: 'Inter', system-ui, sans-serif;
    }

    .navbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem 2rem;
        background-color: white;
        border-bottom: 1px solid #e2e8f0;
        box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
    }

    .logo {
        font-size: 1.25rem;
        font-weight: bold;
        color: #0f172a;
    }

    .user-menu {
        display: flex;
        align-items: center;
        gap: 1.5rem;
    }

    .greeting {
        color: #64748b;
    }

    .greeting strong {
        color: #0f172a;
    }

    .logout-btn {
        background-color: #ef4444;
        color: white;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 6px;
        font-weight: 500;
        cursor: pointer;
        transition: background-color 0.2s;
    }

    .logout-btn:hover {
        background-color: #dc2626;
    }

    .content {
        padding: 3rem 2rem;
        max-width: 1200px;
        margin: 0 auto;
    }

    .welcome-card {
        background: white;
        padding: 2rem;
        border-radius: 12px;
        box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
    }

    h1 {
        margin-top: 0;
        color: #0f172a;
    }

    code {
        background-color: #f1f5f9;
        padding: 0.2rem 0.4rem;
        border-radius: 4px;
        color: #3b82f6;
    }

    .role-badge {
        display: inline-block;
        margin: 1rem 0;
        padding: 0.5rem 1rem;
        background-color: #e0e7ff;
        color: #3730a3;
        border-radius: 9999px;
        font-size: 0.875rem;
        font-weight: 500;
    }

    /* New Profile Button Styles */
    .profile-btn {
        display: inline-block;
        padding: 0.75rem 1.5rem;
        background-color: #2563eb;
        color: white;
        text-decoration: none;
        border-radius: 6px;
        font-weight: 600;
        transition: background-color 0.2s;
    }

    .profile-btn:hover {
        background-color: #1d4ed8;
    }

    /* Admin Panel Styles */
    .admin-panel {
        margin-top: 2rem;
        background-color: #fee2e2;
        border: 1px solid #f87171;
        padding: 1.5rem;
        border-radius: 8px;
    }

    .admin-panel h2 {
        margin-top: 0;
        color: #991b1b;
        font-size: 1.25rem;
    }

    .danger-btn {
        background-color: #dc2626;
        color: white;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 6px;
        font-weight: 500;
        cursor: pointer;
        transition: background-color 0.2s;
    }

    .danger-btn:hover {
        background-color: #b91c1c;
    }
</style>