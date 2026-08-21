<script>
    import {IS_SHARED_WORKING} from '@league-matchups/shared';
    function pingDiscord() {
        fetch('http://localhost:3000/posture', {
            method: 'POST',

        })
    }
</script>

<h1>{IS_SHARED_WORKING}</h1>
<button on:click = {pingDiscord}>Send Posture Check</button>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>
