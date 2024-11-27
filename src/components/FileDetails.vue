<!-- src/components/FileDetails.vue -->
<template>
    <div class="container mt-4">
      <h1 class="mb-4">File Details</h1>
      <b-card>
        <p><strong>Name:</strong> {{ file.name }}</p>
        <p><strong>Size:</strong> {{ file.size }} bytes</p>
        <p><strong>Created At:</strong> {{ formattedDate }}</p>
        <div class="mt-3">
          <b-button variant="primary" class="mr-2" @click="downloadFile">Download</b-button>
          <b-button variant="danger" class="mr-2" @click="deleteFile">Delete</b-button>
          <b-button variant="secondary" class="mr-2" @click="showRenameModal">Rename</b-button>
          <b-button variant="link" @click="navigateToParent">Go to Parent Directory</b-button>
        </div>
      </b-card>
  
      <!-- Rename Modal -->
      <b-modal
        id="rename-file-modal"
        title="Rename File"
        v-model="isRenameModalVisible"
        @hide="resetRenameForm"
      >
        <form @submit.prevent="renameFile">
          <b-form-group label="New File Name" label-for="newFileName">
            <b-form-input
              id="newFileName"
              v-model="newFileName"
              placeholder="Enter new file name"
              required
            ></b-form-input>
          </b-form-group>
          <b-button type="submit" variant="primary">Rename</b-button>
          <b-button variant="secondary" @click="isRenameModalVisible = false">Cancel</b-button>
        </form>
      </b-modal>
    </div>
  </template>
  
  <script>
  import axios from '../axios-instance';
  
  export default {
    name: 'FileDetails',
    props: ['id'],
    data() {
      return {
        file: {},
        isRenameModalVisible: false,
        newFileName: '',
      };
    },
    computed: {
      formattedDate() {
        return new Date(this.file.created_at).toLocaleString();
      },
    },
    methods: {
      fetchFileDetails() {
        axios
          .get(`/api/files/${this.id}`)
          .then((response) => {
            this.file = response.data;
          })
          .catch((error) => {
            console.error('Error fetching file details:', error);
            this.$bvToast.toast('Failed to fetch file details.', {
              title: 'Error',
              variant: 'danger',
              solid: true,
            });
          });
      },
      downloadFile() {
        // Assuming your backend provides a download endpoint
        window.open(`/api/files/${this.id}/download`, '_blank');
      },
      deleteFile() {
        if (confirm('Are you sure you want to delete this file?')) {
          axios
            .delete(`/api/files/${this.id}`)
            .then(() => {
              this.$bvToast.toast('File deleted successfully.', {
                title: 'Success',
                variant: 'success',
                solid: true,
              });
              this.navigateToParent();
            })
            .catch((error) => {
              console.error('Error deleting file:', error);
              this.$bvToast.toast('Failed to delete file.', {
                title: 'Error',
                variant: 'danger',
                solid: true,
              });
            });
        }
      },
      showRenameModal() {
        this.newFileName = this.file.name;
        this.isRenameModalVisible = true;
      },
      resetRenameForm() {
        this.newFileName = '';
      },
      renameFile() {
        if (!this.newFileName.trim()) {
          this.$bvToast.toast('File name cannot be empty.', {
            title: 'Error',
            variant: 'danger',
            solid: true,
          });
          return;
        }
  
        axios
          .put(`/api/files/${this.id}`, { name: this.newFileName })
          .then(() => {
            this.$bvToast.toast('File renamed successfully.', {
              title: 'Success',
              variant: 'success',
              solid: true,
            });
            this.isRenameModalVisible = false;
            this.fetchFileDetails();
          })
          .catch((error) => {
            console.error('Error renaming file:', error);
            this.$bvToast.toast('Failed to rename file.', {
              title: 'Error',
              variant: 'danger',
              solid: true,
            });
          });
      },
      navigateToParent() {
        if (this.file.directory_id) {
          this.$router.push(`/directory/${this.file.directory_id}`);
        } else {
          this.$router.push('/');
        }
      },
    },
    created() {
      this.fetchFileDetails();
    },
  };
  </script>
  
  <style scoped>
  /* Add any component-specific styles here */
  </style>