<script>
    import {thread_store, user_store} from "$lib/stores"

    async function updateJoinPermissions(e) {
        var formData = new FormData(e.target);
        formData.append('thread_id', $thread_store?.id);

        let response = await fetch ('update_thread', {
            method: 'post',
            body: formData
        })

        if (response.ok) {
            let data = await response.json();
            console.log(data);
        }

        else {
            console.log(error);
        }
    }
</script>
<form on:submit|preventDefault={updateJoinPermissions}>
    <label>Who can join this thread?</label><br>
    <select bind:value={$thread_store.join_permissions} name="join_permissions">
        <option value="open">Anybody can join, no approval required</option>
        <option value="approval">New participants must be approved</option>
    </select><br>
    <button id="updateJoinPermissions" type="submit">Update Permissions</button>
    </form>
    <style>
        button {
            margin-top: 10px;
        }
    </style>