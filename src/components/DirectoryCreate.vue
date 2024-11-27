<!-- src/components/DirectoryCreate.vue -->
<template>
    <b-modal
      id="create-directory-modal"
      title="Create Directory"
      v-model="isModalVisible"
      @hide="resetForm"
    >
      <form @submit.prevent="createDirectory">
        <b-form-group label="Directory Name" label-for="directoryName">
          <b-form-input
            id="directoryName"
            v-model="directoryName"
            placeholder="Enter directory name"
            required
          ></b-form-input>
        </b-form-group>
        <b-button type="submit" variant="primary">Create</b-button>
        <b-button variant="secondary" @click="isModalVisible = false">Cancel</b-button>
      </form>
    </b-modal>
  </template>
  
  <script>
  import axios from '../axios-instance';
  
  export default {
    name: 'DirectoryCreate',
    props: ['parentId'],
    data() {
      return {
        directoryName: '',
        isModalVisible: true,
      };
    },
    methods: {
      createDirectory() {
        if (!this.directoryName.trim()) {
          this.$bvToast.toast('Directory name cannot be empty.', {
            title: 'Error',
            variant: 'danger',
            solid: true,
          });
          return;
        }
  
        axios
          .post('/api/directories', {
            name: this.directoryName,
            parent_id: this.parentId,
          })
          .then(() => {
            this.$bvToast.toast('Directory created successfully.', {
              title: 'Success',
              variant: 'success',
              solid: true,
            });
            this.$emit('directoryCreated');
            this.isModalVisible = false;
          })
          .catch((error) => {
            console.error('Error creating directory:', error);
            this.$bvToast.toast('Failed to create directory.', {
              title: 'Error',
              variant: 'danger',
              solid: true,
            });
          });
      },
      resetForm() {
        this.directoryName = '';
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add any component-specific styles here */
  </style>