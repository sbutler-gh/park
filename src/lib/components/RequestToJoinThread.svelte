<script>
    import {thread_store, user_store} from "$lib/stores";
    export let thread;
    
    async function RequestToJoinThread() {

        var formData = new FormData();
        formData.append('user_id', $user_store?.id);
        formData.append('thread_id', $thread_store?.id);

        let response = await fetch('/insert_users_threads', {
            method: 'post',
            body: formData
        })

        if (response.ok) {
            let data = await response.json();

            // When the data is successfuly returned, we'll add it to the "users_threads" section of the thread store
            $thread_store?.users_threads.push(data.data[0]);

            // And we'll update thread_store, so the change renders in the UI
            $thread_store = $thread_store;
        }
        else {
            console.log(error);
        }
    }
</script>

<button type="button" on:click={RequestToJoinThread}>Request to Join Thread</button>
<br>
<br>
<em>Once you've been welcomed into the conversation, you'll be able to add replies and invite others.</em>