<script lang="ts">
    export let data;
    // We now receive the token from the server!
    const { user, token } = data;

    let apiResponse = "";

    async function testFastAPI() {
        apiResponse = "Connecting...";
        try {
            // Because your role is "admin", we can test the admin-only route!
            const res = await fetch("http://127.0.0.1:8000/api/admin-only", {
                method: "GET",
                headers: {
                    // This is the "HTTPBearer" token FastAPI is expecting
                    "Authorization": `Bearer ${token}` 
                }
            });
            
            const result = await res.json();
            
            if (res.ok) {
                apiResponse = `✅ FastAPI says: "${result.message}"`;
            } else {
                apiResponse = `❌ FastAPI Blocked Request: ${result.detail}`;
            }
        } catch (error) {
            apiResponse = "❌ Could not reach FastAPI. Is the uvicorn server running?";
        }
    }
</script>

<div style="font-family: sans-serif; max-width: 600px; margin: 40px auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
    <h2>👤 User Profile</h2>
    <p>Welcome back, <strong>{user.name}</strong>!</p>
    
    <hr style="margin: 20px 0;">

    <div style="background: #f9f9f9; padding: 15px; border-radius: 6px;">
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> <span style="background: #007bff; color: white; padding: 3px 8px; border-radius: 12px; font-size: 0.8em;">{user.role}</span></p>
        <p><strong>Account Verified:</strong> {user.emailVerified ? '✅ Yes' : '❌ No'}</p>
    </div>

    <button on:click={testFastAPI} style="margin-top: 20px; padding: 10px 15px; background: #28a745; color: white; border: none; border-radius: 4px; cursor: pointer;">
        Test FastAPI Connection
    </button>

    {#if apiResponse}
        <div style="margin-top: 20px; padding: 15px; background: #e8f4f8; border-left: 4px solid #007bff; border-radius: 4px;">
            <strong>Backend Response:</strong> <br/>
            {apiResponse}
        </div>
    {/if}
</div>