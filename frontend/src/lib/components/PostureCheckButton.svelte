<script>
    function pingDiscord() {
        fetch('http://localhost:3000/posture', {
            method: 'POST',

        })
    }
</script>

<button on:click = {pingDiscord}>Send Posture Check</button>