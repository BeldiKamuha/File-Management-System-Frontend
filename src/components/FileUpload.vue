<!-- src/components/FileUpload.vue -->
<template>
    <b-modal
      id="upload-file-modal"
      title="Upload File"
      v-model="isModalVisible"
      @hide="resetForm"
    >
      <form @submit.prevent="submitFile">
        <b-form-group label="Select File" label-for="fileInput">
          <b-form-file
            id="fileInput"
            v-model="selectedFile"
            required
          ></b-form-file>
        </b-form-group>
        <b-button type="submit" variant="primary">Upload</b-button>
        <b-button variant="secondary" @click="isModalVisible = false">Cancel</b-button>
      </form>
    </b-modal>
  </template>
  
  <script>
  import axios from '../axios-instance';
  
  export default {
    name: 'FileUpload',
    props: ['directoryId'],
    data() {
      return {
        selectedFile: null,
        isModalVisible: true,
      };
    },
    methods: {
      submitFile() {
        if (!this.selectedFile) {
          this.$bvToast.toast('Please select a file to upload.', {
            title: 'Error',
            variant: 'danger',
            solid: true,
          });
          return;
        }
  
        const formData = new FormData();
        formData.append('file', this.selectedFile);
        formData.append('directory_id', this.directoryId);
  
        axios
          .post('/api/files/', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          .then(() => {
            this.$bvToast.toast('File uploaded successfully.', {
              title: 'Success',
              variant: 'success',
              solid: true,
            });
            this.$emit('fileUploaded');
            this.isModalVisible = false;
          })
          .catch((error) => {
            console.error('Error uploading file:', error);
            this.$bvToast.toast('Failed to upload file.', {
              title: 'Error',
              variant: 'danger',
              solid: true,
            });
          });
      },
      resetForm() {
        this.selectedFile = null;
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add any component-specific styles here */
  </style>