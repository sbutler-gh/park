// import supabase from '$lib/db';

import { createClient } from '@supabase/supabase-js'

const supabase = createClient( import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY, { fetch: (...args) => fetch(...args)  })

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function post(request) {

    console.log(request.body);

    const { data, error } = await supabase
    .from('replies')
    .insert({ content: request.body.get('content'), thread_id: request.body.get('thread_id'), author_id: request.body.get('author_id')})
    
    if (error) {
      return {
        status: 500,
        body: {
          data,
          error
        }
      }
    }

    else {

      return {
          status: 200,
          body: {
            data
          }
        }
      }
	}