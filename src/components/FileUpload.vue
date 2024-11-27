<!-- src/components/FileUpload.vue -->
<template>
  <b-modal @hide="$emit('close')" title="Upload File" hide-footer>
    <b-form @submit.prevent="submitFile">
      <b-form-group label="File Name" label-for="file-name">
        <b-form-input
          id="file-name"
          v-model="form.name"
          required
          placeholder="Enter file name"
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Select File" label-for="file-input">
        <b-form-file
          id="file-input"
          v-model="form.file"
          :state="Boolean(form.file)"
          required
          placeholder="Choose a file..."
        ></b-form-file>
      </b-form-group>

      <b-button type="submit" variant="primary">Upload</b-button>
      <b-button variant="secondary" @click="$emit('close')">Cancel</b-button>
    </b-form>
  </b-modal>
</template>

<script>
import axios from '../axios-instance';
// Removed unused 'qs' import

export default {
  name: 'FileUpload',
  props: ['directoryId'],
  data() {
    return {
      form: {
        name: '',
        file: null,
        directory_id: this.directoryId || null,
      },
    };
  },
  methods: {
    submitFile() {
      const formData = new FormData();
      formData.append('name', this.form.name);
      formData.append('file', this.form.file);
      if (this.form.directory_id) {
        formData.append('directory_id', this.form.directory_id);
      }

      axios
        .post('/api/files', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(() => { // Removed 'response' parameter
          this.$bvToast.toast('File uploaded successfully!', {
            title: 'Success',
            variant: 'success',
            solid: true,
          });
          this.$emit('fileUploaded');
          this.form.name = '';
          this.form.file = null;
        })
        .catch((error) => {
          console.error('Error uploading file:', error);
          const errorMessage =
            error.response && error.response.data && error.response.data.errors
              ? Object.values(error.response.data.errors)
                  .flat()
                  .join(' ')
              : 'Failed to upload file.';
          this.$bvToast.toast(errorMessage, {
            title: 'Error',
            variant: 'danger',
            solid: true,
          });
        });
    },
  },
};
</script>

<style scoped>
/* Add any component-specific styles here */
</style>