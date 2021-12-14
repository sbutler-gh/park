<script>
import { user_store } from "$lib/stores";

async function sendInvite(e) {
    var formData = new FormData(e.target);
    let password = Math.random().toString(36).substr(2, 8);

    formData.append('password', password);

    let response = await fetch('send_invite', {
        method: 'post',
        body: formData
    })

    if (response.ok) {
        let data = await response.json();
        console.log(data);
        $user_store = data.user;
        console.log(password);
        // let account_email = data.user.email;
        // let account_id = data.user
    }

    else {
        console.log(error);
    }
}

// On load, parse the slug and regex for the invite approved to the chat thread.
</script>

{#if $user_store?.id}
<p>Logged in!  Here's the user JSON data</p>
<p>{JSON.stringify($user_store)}</p>
{:else}
<p>No user logged in</p>
{/if}
<h2>Send Invite Test</h2>

<form on:submit|preventDefault={sendInvite}>
<label for="email">Email</label>
<input name="email">
<button type="submit">Send Invite Test</button>
</form>
<br>
<em>Try in Incognito windows to repeat attempts</em>