import { createClient } from '@supabase/supabase-js'

const supabase = createClient( import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY, { fetch: (...args) => fetch(...args)  })

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function post(request) {

  // console.log('fetching_user_data');

//   console.log(request.body.get('id'))

// console.log(uuid);

// console.log(request.body)
// // console.log(JSON.parse(request))
// console.log((request.body.id));

    let { data, error } = await supabase
    .from('threads')
    .select(`*, users!users_threads(*), replies(*, author_id(*)), users_threads(*)`)
    .eq('id', request.body.get('id'))
    
    if (error) {

        console.log(error);
      return {
        status: 500,
        body: {
          data,
          error
        }
      }
    }

    else {

      // console.log(data);

        // let page = {
        //     id: "",
        //     slug: "",
        //     html: "",
        //     user_id: "",
        //     created_at: "",
        //     title: "",
        //     markdown: "",
        //     users: [] 
        // }

        // if (request.body.get('user_id') == data[0].user_id) {
        //     page = data[0];
        // }
        // else {
        //     page.title = data[0].title;
        //     page.markdown = data[0].markdown;
        //     page.html = data[0].html;
        //     page.id = data[0].id;
        //     page.user_id = data[0].user_id;
        //     page.slug = data[0].slug;
        //     page.created_at = data[0].created_at;
        //     page.users = data[0].users.length;
        //     page.comments = data[0].comments;
        // }

        // console.log(page);

        // // console.log(data);

        // // console.log(data[0].user_id);
        // // console.log(data[0].users)
      return {
          status: 200,
          body: {
            data
          }
        }
      }
	}