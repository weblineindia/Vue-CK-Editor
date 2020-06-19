<!-- *************************************************************************

This File will be used to ck editor

************************************************************************* -->

<template>
  <div
    v-show="!hide"
  >
    <div class="quillWrapper">
      <slot name="toolbar"></slot>
      <div :id="id" ref="quillContainer"></div>
      <input
        id="file-upload"
        v-model="content"
        style="display:none;"
        :placeholder="placeholder"
        @input="onChange($event)"
        @blur="onBlur($event)"
      />
    </div>
  </div>
</template>

<!-- *************************************************************************

SCRIPT

************************************************************************* -->

<script>
// For load default Toolbar
import defaultToolbar from './helpers/default-toolbar'

// For load helpers
import oldApi from './helpers/old-api'
import mergeDeep from './helpers/merge-deep'
import MarkdownShortcuts from './helpers/markdown-shortcuts'

// For load Quill
import Quill from 'quill'

export default {
  name: 'VueEditor',
  mixins: [oldApi],
  props: {
    id: {
      type: String,
      default: 'quill-container',
    },
    placeholder: {
      type: String,
      default: '',
    },
    value: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
    },
    editorToolbar: {
      type: Array,
      default: () => [],
    },
    editorOptions: {
      type: Object,
      required: false,
      default: () => ({}),
    },
    useMarkdownShortcuts: {
      type: Boolean,
      default: false,
    },
    hide: {
      type: Boolean,
      default: false,
    },
    isEdit: {
      type: Boolean,
      default: false,
    },
    isEditTermsOfService: {
      type: Boolean,
      default: false,
    },
    isEditPrivacyPolicy: {
      type: Boolean,
      default: false,
    },
  },

  data: () => ({
    quill: null,
    content: '',
  }),

  watch: {
    value(val) {
      if (val !== this.quill.root.innerHTML && !this.quill.hasFocus()) {
        this.quill.root.innerHTML = val
      }
    },
    disabled(status) {
      this.quill.enable(!status)
    },
  },
  mounted() {
    this.registerCustomModules(Quill)
    this.registerPrototypes()
    this.initializeEditor()
  },
  beforeDestroy() {
    this.quill = null
    delete this.quill
  },
  methods: {
    /**
     * for initialize editor
     */
    initializeEditor() {
      this.setupQuillEditor()
      this.handleInitialContent()
      this.registerEditorEventListeners()
      this.$emit('ready', this.quill)
    },
    /**
     * for setUp quill editor
     */
    setupQuillEditor() {
      const editorConfig = {
        debug: false,
        modules: this.setModules(),
        theme: 'snow',
        placeholder: this.placeholder ? this.placeholder : '',
      }

      this.prepareEditorConfig(editorConfig)
      this.quill = new Quill(this.$refs.quillContainer, editorConfig)
    },
    /**
     * for set modules
     */
    setModules() {
      const modules = {
        toolbar: this.editorToolbar.length
          ? this.editorToolbar
          : defaultToolbar,
      }
      if (this.useMarkdownShortcuts) {
        Quill.register('modules/markdownShortcuts', MarkdownShortcuts, true)
        modules.markdownShortcuts = {}
      }
      return modules
    },
    /**
     * prepare editor or config
     */
    prepareEditorConfig(editorConfig) {
      if (
        Object.keys(this.editorOptions).length > 0 &&
        this.editorOptions.constructor === Object
      ) {
        if (
          this.editorOptions.modules &&
          typeof this.editorOptions.modules.toolbar !== 'undefined'
        ) {
          delete editorConfig.modules.toolbar
        }

        mergeDeep(editorConfig, this.editorOptions)
      }
    },
    /**
     * for register prototypes
     */
    registerPrototypes() {
      Quill.prototype.getHTML = function() {
        return this.container.querySelector('.ql-editor').innerHTML
      }
      Quill.prototype.getWordCount = function() {
        return this.container.querySelector('.ql-editor').innerText.length
      }
    },
    /**
     * for register editor event listeners
     */
    registerEditorEventListeners() {
      this.quill.on('text-change', this.handleTextChange)
      this.quill.on('selection-change', this.handleSelectionChange)
      this.listenForEditorEvent('text-change')
      this.listenForEditorEvent('selection-change')
      this.listenForEditorEvent('editor-change')
    },
    /**
     * for listen editor event
     */
    listenForEditorEvent(type) {
      this.quill.on(type, (...args) => {
        this.$emit(type, ...args)
      })
    },
    /**
     * for handle initial content
     */
    handleInitialContent() {
      if (this.value) this.quill.root.innerHTML = this.value // Set initial editor content
    },
    /**
     * for handle selection change
     */
    handleSelectionChange(range, oldRange) {
      if (!range && oldRange) this.$emit('blur', this.quill)
      else if (range && !oldRange) this.$emit('focus', this.quill)
    },
    /**
     * handle text change
     */
    handleTextChange() {
      const editorContent =
        this.quill.getHTML() === '<p><br></p>' ? '' : this.quill.getHTML()
      this.$emit('input', editorContent)
    },
    /**
     * for handle image removed
     */
    handleImageRemoved(delta, oldContents) {
      const currrentContents = this.quill.getContents()
      const deletedContents = currrentContents.diff(oldContents)
      const operations = deletedContents.ops

      operations.map(() => {})
    },
    /**
     * setUp custom image handler
     */
    setupCustomImageHandler() {
      const toolbar = this.quill.getModule('toolbar')
      toolbar.addHandler('image', this.customImageHandler)
    },
    /**
     *  custom image handler
     */
    customImageHandler() {
      this.$refs.fileInput.click()
    },
    /**
     * emit image info
     */
    emitImageInfo($event) {
      const resetUploader = function() {
        var uploader = document.getElementById('file-upload')
        uploader.value = ''
      }
      const file = $event.target.files[0]
      const Editor = this.quill
      const range = Editor.getSelection()
      const cursorLocation = range.index
      this.$emit('image-added', file, Editor, cursorLocation, resetUploader)
    },
  },
}
</script>
<!-- *************************************************************************

STYLE

************************************************************************* -->

<style src="quill/dist/quill.snow.css"></style>
<style src="./style.scss" lang="scss"></style>
