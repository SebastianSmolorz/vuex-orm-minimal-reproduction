<template>
  <div class="hello">
    {{data}}
  </div>
</template>

<script>
import { Person, Nationality } from '@/store'
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  beforeMount () {
    Person.create({
      data: {
        id: 1,
        name: 'Dave',
        nationality: {
          id: 1,
          name: 'French',
          country: {
            id: 1,
            name: 'France'
          }
        }
      }
    })
  },
  computed: {
    data () {
      return Person.query().with('nationality').get()
    }
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
