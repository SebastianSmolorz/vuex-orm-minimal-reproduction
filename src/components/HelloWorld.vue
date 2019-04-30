<template>
  <div class="hello">
    <table>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Email</th>
      </tr>
      <tr v-for="user in data" v-bind:key="user.id">
        <td>{{user.id}}</td>
        <td>{{user.name}}</td>
        <td>{{user.email}}</td>
      </tr>
    </table>

    <button @click="createSingleUser()">Create single user</button>
    <button @click="createBulkUser()">Create bulk user (?)</button>

    <button @click="updateSingleUser()">Update single user</button>
    <button @click="updateBulkUser()">Update bulk user (!)</button>
    <br>
    <button @click="foo()">FOO</button>
<!--    <button @click="createSingleUser()">Create single user</button>-->
  </div>
</template>

<script>
import { User } from '@/store'
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  beforeMount () {
    User.$fetch()
  },
  computed: {
    data () {
      return User.query().get()
    }
  },
  methods: {
    createSingleUser () {
      User.$create({data: {
        id: 999,
        name: 'Seb',
        email: 'sebastian.smolorz1@gmail.com'
      }})
    },
    createBulkUser () {
      // Lib supports it but typicode doesnt?? todo test this
      User.$create({
        data: [
          {
            id: 999,
            name: 'Seb',
            email: 'sebastian.smolorz1@gmail.com'
          },
          {
            id: 1000,
            name: 'Bob',
            email: 'bob@gmail.com'
          },
      ]})
    },
    updateSingleUser () {
      User.$update({
        params: { id: 1 },
        data: {
          name: 'Shruthi'
        }
      })
    },
    foo () {
      User.$_fetch({
        params: { id: 1 },
        data: {
          name: 'Shruthi'
        }
      })
    },
    updateBulkUser () {
      // ERROR - TODO
      User.$update({
        data: [
          {
            id: 1,
            email: 'foo@gmail.com'
          },
          {
            id: 2,
            email: 'bar@gmail.com'
          },
      ]})
    },
    /**
     * Motivation
     *
     * Whilst using plugin-axios I've found that although it works great for
     * a textbook RESTful backend, it gets quite restrictive when developing
     * a non-trivial application with a complex backend.
     *
     * Say you want to have access to the default $update action on a model.
     * Your backend has a view that updates multiple related objects based on
     * some condition and returns ids. Or
     *
     * Say it is unfeasable to return the whole object and you want to return
     * a list of updated IDs or the server simply returns a 200 response.
     * //todo
     * todo: pagination
     *
     *
     * The plugin enforces that there is a single id is present in the params
     * to set intermediate values for model instances e.g. $updating. This makes
     * bulk updating impossible in the current implementation.
     *
     * The response context is stripped in onResponse. This means useful
     * response variables such as status code are not available in the promise
     * callback after an api call.
     *
     *
     * Response data is always persisted to the store (onSuccess) in the
     * default way for the $ action used e.g. User.$update() will always call
     * User.update(). This means that a dev cannot easily make arbitrary calls
     * using the plugin, they are forced to into using a strict restful pattern.
     *
     *
     * Proposed changes:
     *  - As a dev I want to be able to bulk update objects without making
     *    multiple individual calls
     *  - As a dev I want to make an axios call that doesn't use the response
     *    data to mutate the Vuex object in the default way. Allow overrides
     *  - As a dev I want to use the existing api config on the model to make
     *    calls to arbitrary endpoints under the namespace of my model i.e.
     *    allow custom actions, not just simple CRUD operations.
     *  - As a dev I was to be able to use headers, the response code and/or
     *    the original request after the call has been made.
     */
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
