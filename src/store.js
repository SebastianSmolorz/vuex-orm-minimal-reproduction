import Vue from 'vue'
import Vuex from 'vuex'
import VuexORM from '@vuex-orm/core'
import VuexORMAxios from '@vuex-orm/plugin-axios'
import { Model } from '@vuex-orm/core'
import ActionSet from 'rest-framework'



export class User extends ActionSet.RetrieveActionSet {
  static entity = 'users'
   static apiConf = {
     baseUrl: 'https://jsonplaceholder.typicode.com/'
   }

  static fields () {
    return {
      id: this.attr(null),
      name: this.attr(''),
      username: this.attr(''),
      email: this.attr(''),
    }
  }
  static methodConf = {
    http: {
      url: '/post'
    },
    methods: {
      $fetch: {
        name: 'fetch',
        http: {
          url: '/',
          method: 'get',
        },
      },
      extra: {
        $foo: {
          name: 'foo',
          http: {
            url: '',
            method: 'get',
          },
          action: '$fetch',
          onRequest: function (model, params) {
            model.update({
              where: params.params.id,
              data: {
                $isUpdating: true,
                $updateErrors: []
              }
            })
          }
        },
      }
    }
  }
}


export class Person extends Model {
  static entity = 'person'

  static fields () {
    return {
      id: this.attr(null),
      name: this.attr(''),
      nationality_id: this.attr(''),
      nationality: this.belongsTo(Nationality, 'nationality_id'),
    }
  }
}

export class Nationality extends Model {
  static entity = 'nationality'

  static fields () {
    return {
      id: this.attr(null),
      name: this.attr(''),
      country_id: this.attr(''),
      country: this.belongsTo(Country, 'country_id'),
    }
  }
}

export class Country extends Model {
  static entity = 'country'

  static fields () {
    return {
      id: this.attr(null),
      name: this.attr('')
    }
  }
}


Vue.use(Vuex)

// Create new instance of Database.
const database = new VuexORM.Database()

// database.register(Person)
// database.register(Nationality)
// database.register(Country)
database.register(User)

VuexORM.use(VuexORMAxios, {
  database,
  http: {
    baseURL: 'https://jsonplaceholder.typicode.com',
    url: '/',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }
})


const store = new Vuex.Store({
  namespaced: true,
  state: {

  },
  mutations: {

  },
  actions: {

  },
  plugins: [VuexORM.install(database)]
})
export default store
