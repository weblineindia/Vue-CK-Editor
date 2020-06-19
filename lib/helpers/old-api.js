/** *************************************************************************

This File will be used for Editor Component helpers method

************************************************************************* **/
export default {
  props: {
    customModules: Array,
  },
  methods: {
    registerCustomModules(Quill) {
      if (this.customModules !== undefined) {
        this.customModules.forEach((customModule) => {
          Quill.register('modules/' + customModule.alias, customModule.module)
        })
      }
    },
  },
}
