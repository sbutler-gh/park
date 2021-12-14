<script>
import { onMount } from "svelte";
import {replies_store} from "$lib/stores"

// export let want;
// let comments;

// onMount(() => {
//     getReplies();
// })

// async function getReplies() {

// let response = await fetch('get_comments', {
//             method: 'post',
//             body: want.id
//         })

//         if (response.ok) {
//             let data = await response.json();
//             console.log(data);
//             $replies_store = data.data.reverse();
//             $replies_store = $replies_store
//         }
//         else {
//             console.log(error);
//         }
//     }
</script>
{#if $replies_store}
{#each $replies_store as reply}
<div class="comments" style="box-shadow: 0 0 20px rgb(0 0 0 / 15%); border-radius: 5px; margin-top: 24px; width: 80%; padding: 10px; text-align: left;">
    <p class="author">{reply?.author_id?.username}</p>
    <!-- Think about how to display Datetime on chat messages.  Signal uses an interesting model, where if message is in last week, it just shows day of week (e.g. Mon), if it's older than a week, it shows the date (e.g. Dec 14), and if it's older than a year, it shows the year, e.g. (Dec 14 2020) -->
    <p class="datetime">{Date(reply?.created_at).substring(0,33)}</p>
    <p class="body">{reply?.content}</p>
    </div>
{/each}
{/if}
<style>
    * {
        font-family: Arial, Helvetica, sans-serif;
    }
    .author {
        font-size: 14px;
        font-weight: 600;
    }
    .datetime {
        font-size: 12px;
        color: lightgrey;
    }
    .body {
        font-size: 16px;
    }
    .comments p {
        margin-bottom: 10px;
    }
</style>