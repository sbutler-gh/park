<script>
import { thread_store } from "$lib/stores";

async function approveUser(request) {
    console.log(request);
    var formData = new FormData();
    formData.append('user_id', request?.user_id);
    formData.append('thread_id', request?.thread_id);
    formData.append('accepted', true);

    let response = await fetch('update_users_threads', {
        method: 'post',
        body: formData
    })

    if (response.ok) {
        let data = await response.json();
        console.log(data);

        // If the response is successful, we will find the item in the array corresponding to this request, and update the accepted status to TRUE.
        $thread_store.users_threads.find(join_request => join_request.id == request.id).accepted = true;

        // Then, we'll update the thread, so the changes show.
        $thread_store = $thread_store;

    }
    else {
        console.log(error);
    }
}
</script>

{#each $thread_store?.users_threads.filter(request => request.accepted != true) as request}
<button value={request} on:click={approveUser(request)}>Approve User {request.user_id}</button>
{/each}
<style>
    button {
        margin-top: 10px;
    }
</style>