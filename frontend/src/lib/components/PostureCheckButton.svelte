<script>
    let isLoading = $state(false);

    async function pingDiscord() {
        isLoading = true;
        try {
            await fetch('http://localhost:3000/posture', {
                method: 'POST',

            })
        } catch(e) {
            console.error("Server Offline", e);
        } finally {
            isLoading = false;
        }
    }
</script>

<button disabled = {isLoading} onclick = {pingDiscord}>
    {isLoading ? 'Sending...' : 'Send Posture Check'}
</button>

<style>
    button {
        width: 9rem;
    }
</style>