<script>
    export let thread;
    import {replies_store, user_store} from "$lib/stores"
    let content;

    async function submitReply(e) {
        document.getElementById('submitReplyButton').disabled = true;
        var formData = new FormData(e.target);
        formData.append('thread_id', thread.id);
        formData.append('author_id', $user_store?.id);
        formData.append('accepted', "")

        let response = await fetch('insert_reply', {
            method: 'post',
            body: formData
        })

        if (response.ok) {
            let data = await response.json();
            console.log(data);
            let reply = data.data[0];
            reply.author_id = {
                "id": $user_store?.id,
                "email": $user_store?.email,
                "username": $user_store?.user_metadata?.username
            }
            $replies_store.push(data.data[0]);
            $replies_store = $replies_store;
            content = "";
        }
        else {
            console.log(error);
        }
        document.getElementById('submitReplyButton').disabled = false;
    }
</script>
<form on:submit|preventDefault={submitReply}>
    <h5>Add a Reply</h5>
    <br>
    <textarea bind:value={content} name="content" style="display: block; width: 50%; margin-bottom: 5px;"></textarea>
    <button id="submitReplyButton" style="display: block;">Submit Reply</button>
</form>