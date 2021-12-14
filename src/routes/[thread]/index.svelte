<script>

import {user_store} from "$lib/stores"
import RepliesForm from "$lib/components/RepliesForm.svelte";
import RepliesDisplay from "$lib/components/RepliesDisplay.svelte";
import SignUpForm from "$lib/components/SignUpForm.svelte";
import RequestToJoinThread from "$lib/components/RequestToJoinThread.svelte"
import JoinThreadRequests from "$lib/components/JoinThreadRequests.svelte"
import { element } from "svelte/internal";

    export let thread;
</script>
    <script context="module">

    import {replies_store, thread_store} from "$lib/stores"
    
    import { browser } from '$app/env';

            export async function load({ page, fetch }) {

                let thread;
                
                if (browser) {
                 let formData = new FormData();
                formData.append('id', page.params.thread)

                let thread_id = page.params.thread;
                console.log(page.params.thread);
                console.log(page.params.thread);
                // console.log(page.params.slug);
                console.log(JSON.stringify(thread_id));

                let response = await fetch ('get_users_threads', {
                    method: 'post',
                    body: formData
                })

                if (response.ok) {
                    let data = await response.json();
                    console.log(data);
                    thread = data.data[0];
                    thread_store.set(data.data[0]);
                    replies_store.set(thread.replies);
                    // $replies_store = $replies_store;
                }

                else {
                    console.log(error);
                }
            }

                return {
                    props: {
                        thread: thread
                    }
                };
            }
    </script>
    <h3>{thread?.title}</h3>
    <!-- This conditional checks the user_threads array, returned in the thread object, to see if the user is part of this thread and has been accepted. -->
    <!-- If the user is in the users_threads table and has been accepted, then they have reply priveleges, so the <RepliesForm> component will be shown. -->
    {#if $thread_store?.users_threads?.some(user => user.user_id == $user_store?.id && user.accepted)}
    <RepliesForm thread={$thread_store}></RepliesForm>

    <!-- These users can also see and approve requests to join the thread.-->
    <JoinThreadRequests></JoinThreadRequests>
    {:else if $thread_store?.users_threads?.some(user => user.user_id == $user_store?.id)}
    <!-- If the user is in the users_threads and has not been accepted, then they do not have reply priveleges.  Additionally, there should be a way for thread participants to approve them. -->
    <h4>Awaiting approval to join the thread.</h4>
    {:else if $user_store?.id}
    <RequestToJoinThread></RequestToJoinThread>
    {:else}
    <SignUpForm></SignUpForm>
    {/if}

    <RepliesDisplay thread={$thread_store}></RepliesDisplay>
    <style>
    
        @media only screen and (max-width: 800px) {
            .guest-form {
                width: 100% !important;
                padding: 1rem;
            }
        }
    
        @media only screen and (min-width: 801px) {
    
            #signUpCommentsSection {
                margin: auto;
                display: block;
                width: 500px;
            }
        }
    
        .guest-form {
            width: 40%;
            background: #fafafa;
            padding: 1rem;
            border-radius: 10px;
            text-align: center;
            font-style: "sans-serif";
            margin: auto;
        }
    
        .guest-form input {
            height: 20px;
            width: 150px;
        }
    </style>