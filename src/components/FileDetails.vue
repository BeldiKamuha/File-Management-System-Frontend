<!-- src/components/FileDetails.vue -->
<template>
  <div class="container mt-4">
    <h1 class="mb-4">{{ file.name }}</h1>
    <p><strong>Directory ID:</strong> {{ file.directory_id || 'Root Directory' }}</p>
    <p><strong>Created At:</strong> {{ formattedCreatedAt }}</p>
    <p><strong>Updated At:</strong> {{ formattedUpdatedAt }}</p>

    <div class="mb-3">
      <b-button variant="primary" class="mr-2" @click="downloadFile">Download File</b-button>
      <b-button variant="warning" class="mr-2" @click="showRenameModal = true">Rename File</b-button>
      <b-button variant="danger" class="mr-2" @click="deleteFile">Delete File</b-button>
      <b-button variant="link" @click="navigateToParent">Go to Parent Directory</b-button>
    </div>

    <!-- Rename File Modal -->
    <b-modal v-model="showRenameModal" title="Rename File" hide-footer>
      <b-form @submit.prevent="renameFile">
        <b-form-group label="New File Name" label-for="new-file-name">
          <b-form-input
            id="new-file-name"
            v-model="newFileName"
            required
            placeholder="Enter new file name"
          ></b-form-input>
        </b-form-group>
        <b-button type="submit" variant="primary">Rename</b-button>
        <b-button variant="secondary" @click="showRenameModal = false">Cancel</b-button>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import axios from '../axios-instance';
import moment from 'moment'; // For date formatting

export default {
  name: 'FileDetails',
  props: ['id'],
  data() {
    return {
      file: {},
      showRenameModal: false,
      newFileName: '',
    };
  },
  computed: {
    formattedCreatedAt() {
      return this.file.created_at
        ? moment(this.file.created_at).format('MMMM Do YYYY, h:mm:ss a')
        : 'N/A';
    },
    formattedUpdatedAt() {
      return this.file.updated_at
        ? moment(this.file.updated_at).format('MMMM Do YYYY, h:mm:ss a')
        : 'N/A';
    },
  },
  methods: {
    fetchFileDetails() {
      axios
        .get(`/api/files/${this.id}`)
        .then((response) => {
          this.file = response.data;
          this.newFileName = this.file.name;
        })
        .catch((error) => {
          console.error('Error fetching file details:', error);
          this.$bvToast.toast('Failed to fetch file details.', {
            title: 'Error',
            variant: 'danger',
            solid: true,
          });
          this.$router.push('/');
        });
    },
    downloadFile() {
    axios
      .get(`/api/files/${this.id}/download`, { responseType: 'blob' })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', this.file.name); // Use the original file name
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error('Error downloading file:', error);
        this.$bvToast.toast('Failed to download file.', {
          title: 'Error',
          variant: 'danger',
          solid: true,
        });
      });
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
        .put(`/api/files/${this.id}/rename`, { name: this.newFileName })
        .then((response) => {
          this.file = response.data;
          this.$bvToast.toast('File renamed successfully.', {
            title: 'Success',
            variant: 'success',
            solid: true,
          });
          this.showRenameModal = false;
        })
        .catch((error) => {
          console.error('Error renaming file:', error);
          const errorMessage =
            error.response && error.response.data && error.response.data.errors
              ? Object.values(error.response.data.errors)
                  .flat()
                  .join(' ')
              : 'Failed to rename file.';
          this.$bvToast.toast(errorMessage, {
            title: 'Error',
            variant: 'danger',
            solid: true,
          });
        });
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
            // Navigate to parent directory after deletion
            this.navigateToParent();
          })
          .catch((error) => {
            console.error('Error deleting file:', error);
            const errorMessage =
              error.response && error.response.data && error.response.data.errors
                ? Object.values(error.response.data.errors)
                    .flat()
                    .join(' ')
                : 'Failed to delete file.';
            this.$bvToast.toast(errorMessage, {
              title: 'Error',
              variant: 'danger',
              solid: true,
            });
          });
      }
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
/* Add any styles if necessary */
</style>