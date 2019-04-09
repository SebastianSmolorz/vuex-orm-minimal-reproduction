import Vue from 'vue'
import Vuex from 'vuex'
import VuexORM from '@vuex-orm/core'
import { Model } from '@vuex-orm/core'

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

database.register(Person)
database.register(Nationality)
database.register(Country)

const store = new Vuex.Store({
  state: {

  },
  mutations: {

  },
  actions: {

  },
  plugins: [VuexORM.install(database)]
})
export default store
