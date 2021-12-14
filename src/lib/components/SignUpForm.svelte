<script>
    import {user_store} from "$lib/stores.js";

    async function signUp(e) {

      document.getElementById('signUpButton').disabled = true;

        var formData = new FormData(e.target)

        const response = await fetch(`/signup`, {
            method: 'post',
            body: formData
        })

    if (response.ok) {
      let data = await response.json();
      console.log(data);
      document.getElementById('signUpButton').disabled = false;
      $user_store = data.user;
      console.log(data.user);
      localStorage.setItem('user', JSON.stringify(data.user));
    //   return createNewPage(e);
    }

    else {
      console.log(error);
      signup_error = error;
      document.getElementById('signUpButton').disabled = false;
    }
    }
</script>
<form on:submit|preventDefault={signUp}>
    <label for="email">Email</label>
    <input type="email" name="email">
    <label for="password">Password</label>
    <input name="password">
    <button id="signUpButton">Sign Up</button>
</form>

<style>
  /* label, input, button {
    display: block;
  }

  input {
    margin-bottom: 10px;
  } */
</style>