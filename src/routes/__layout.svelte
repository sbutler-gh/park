
    <script context="module">
    
    import  {threads_store, user_store } from "$lib/stores"
    
    import { browser } from '$app/env';
    
    export async function load({ page, fetch, session, stuff }) {
    
        if (browser) {
    
        if (localStorage.getItem('user')) {
            user_store.set(JSON.parse(localStorage.getItem('user')));
        }

        }

        // let response = await fetch ('get_threads', {
        //     method: 'get'
        // })

        // if (response.ok) {
        //     let data = await response.json();
        //     threads_store.set(data.data);
        // }

        // else {
        //     console.log(error);
        // }
        return {
                props: {
                    // Nothing here yet, just included reutrns tatement for syntax.
                }
            };
        }
    </script>
    <slot></slot>