import { writable } from "svelte/store";

let user_store = writable([]);

// This store is for multiple threads, like an array of thread objects.
let threads_store = writable([]); 

// This store is for a single thread object, like the thread currently viewed by the user.
let thread_store = writable([]);

// This store is for the replies from a single thread object, like the replies for the thread currently in view.
let replies_store = writable([]);

export { user_store, threads_store, thread_store, replies_store };
