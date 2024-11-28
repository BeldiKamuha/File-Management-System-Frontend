<!-- src/components/FileUpload.vue -->
<template>
  <b-modal
    id="upload-file-modal"
    title="Upload File"
    v-model="isModalVisible"
    @hide="resetForm"
    hide-footer
    hide-header-close
  >
    <b-form @submit.prevent="submitFile">
      <b-form-group label="File Name" label-for="file-name">
        <b-form-input
          id="file-name"
          v-model="form.name"
          placeholder="Enter file name"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Select File" label-for="file-input">
        <b-form-file
          id="file-input"
          v-model="form.file"
          :state="Boolean(form.file)"
          required
          placeholder="Choose a file..."
          accept=".jpg,.png,.pdf,.docx,.txt"
        ></b-form-file>
      </b-form-group>

      <div class="d-flex justify-content-end">
        <b-button type="submit" variant="primary" class="mr-2">Upload</b-button>
        <b-button variant="secondary" @click="closeModal">Cancel</b-button>
      </div>
    </b-form>
  </b-modal>
</template>

<script>
import axios from '../axios-instance';

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
      isModalVisible: true,
    };
  },
  methods: {
    submitFile() {
      if (!this.form.file) {
        this.$bvToast.toast('Please select a file to upload.', {
          title: 'Error',
          variant: 'danger',
          solid: true,
        });
        return;
      }

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
        .then(() => {
          this.$bvToast.toast('File uploaded successfully!', {
            title: 'Success',
            variant: 'success',
            solid: true,
          });
          this.$emit('fileUploaded');
          this.closeModal();
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
    resetForm() {
      this.form.name = '';
      this.form.file = null;
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