<!-- src/components/DirectoryCreate.vue -->
<template>
  <b-modal
    id="create-directory-modal"
    title="Create Directory"
    v-model="isModalVisible"
    @hide="resetForm"
    hide-footer
    hide-header-close
  >
    <b-form @submit.prevent="createDirectory">
      <b-form-group label="Directory Name" label-for="directoryName">
        <b-form-input
          id="directoryName"
          v-model="directoryName"
          placeholder="Enter directory name"
          required
        ></b-form-input>
      </b-form-group>
      <div class="d-flex justify-content-end">
        <b-button type="submit" variant="primary" class="mr-2">Create</b-button>
        <b-button variant="secondary" @click="closeModal">Cancel</b-button>
      </div>
    </b-form>
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
          this.closeModal();
        })
        .catch((error) => {
          console.error('Error creating directory:', error);
          const errorMessage =
            error.response && error.response.data && error.response.data.errors
              ? Object.values(error.response.data.errors)
                  .flat()
                  .join(' ')
              : 'Failed to create directory.';
          this.$bvToast.toast(errorMessage, {
            title: 'Error',
            variant: 'danger',
            solid: true,
          });
        });
    },
    resetForm() {
      this.directoryName = '';
    },
    closeModal() {
      this.resetForm();
      this.isModalVisible = false;
      this.$emit('close');
    },
  },
};
</script>
  
<style scoped>
/* Add any component-specific styles here */
</style>