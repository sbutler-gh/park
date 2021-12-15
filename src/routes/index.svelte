<script>
import { goto } from "$app/navigation";
import SignUpForm from "$lib/components/SignUpForm.svelte";

    import {user_store} from "$lib/stores"

    async function createThread(e) {
        document.getElementById('createThreadButton').disabled = true;

        var formData = new FormData(e.target);
        formData.append('creator_id', $user_store?.id);

        let response = await fetch ('insert_thread', {
            method: 'post',
            body: formData
        });

        if (response.ok) {
            let data = await response.json();
            let new_thread = data.data[0];
            addUserToThread(new_thread)
            // goto(`${data.data[0].title}`);
        }
        else {
            console.log(error);
        }
    }

    async function addUserToThread(thread) {
        var formData = new FormData();
        formData.append('user_id', $user_store?.id);
        formData.append('thread_id', thread.id);
        formData.append('accepted', true)

        let response = await fetch ('insert_users_threads', {
            method: 'post',
            body: formData
        });

        if (response.ok) {
            let data = await response.json();
            console.log(data);
            goto(`${thread.id}`);
        }
        else {
            console.log(error);
        }
    }

    async function signUp(e) {
        var formData = new FormData(e.target);

        let response = await fetch ('signup', {
            method: 'post',
            body: formData
        })


        if (response.ok) {
            let data = await response.json();
            $user_store = data.user;
            console.log(data.user);
            localStorage.setItem('user', JSON.stringify(data.user));
        }
        else {
            console.log(error);
        }
    }
</script>

{#if $user_store?.id}
<h3>Create Message Thread</h3>
<form on:submit|preventDefault={createThread}>
<label for="title">Thread Title</label><br>
<input name="title" ><br>
<p>The contents of this thread will be public, but only people who have joined the thread can post replies.</p>
<p>You can make it so anybody can join the thread (no approval required), or that new participants must be approved to join the thread and start posting.</p>
<label>Who can join this thread?</label><br>
<select name="join_permissions">
    <option value="open">Anybody can join, no approval required</option>
    <option value="approval">New participants must be approved</option>
</select><br>
<button id="createThreadButton" type="submit">Create Thread</button>
</form>
{:else}
<h3>Sign Up to Begin</h3>
<SignUpForm></SignUpForm>
<!-- <form on:submit|preventDefault={signUp}>
    <label>Email</label>
    <input name="email"><br>
    <label>Password</label>
    <input name="password">
    <button type="submit">Sign Up</button>
</form> -->
{/if}
<style>
    form {
        width: 350px;
    }
    label, select, input {
        margin-bottom: 10px;
    }

    input {
        height: 20px;
        font-size: 16px;
        width: 100%;
    }
</style>