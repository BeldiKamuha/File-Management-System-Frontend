<!-- src/components/Directory.vue -->
<template>
  <div class="container mt-4">
    <h1 class="mb-4">{{ directory.name }}</h1>
    <div class="mb-3">
      <b-button variant="primary" class="mr-2" @click="showCreateDirectoryModal">Create New Directory</b-button>
      <b-button variant="secondary" class="mr-2" @click="showUploadFileModal">Upload File</b-button>
      <b-button variant="danger" class="mr-2" @click="deleteDirectory">Delete Directory</b-button>
      <b-button variant="link" @click="navigateToParent">Go to Parent Directory</b-button>
    </div>

    <!-- Sub-Directories List -->
    <div class="mb-4">
      <h3>Sub-Directories</h3>
      <b-list-group>
        <b-list-group-item v-for="subDirectory in subDirectories" :key="subDirectory.id">
          <i class="bi bi-folder-fill me-2"></i>
          <router-link :to="`/directory/${subDirectory.id}`">{{ subDirectory.name }}</router-link>
        </b-list-group-item>
      </b-list-group>
      <p v-if="subDirectories.length === 0">No sub-directories found.</p>
    </div>

    <!-- Files List -->
    <div>
      <h3>Files</h3>
      <b-list-group>
        <b-list-group-item v-for="file in files" :key="file.id">
          <i class="bi bi-file-earmark-fill me-2"></i>
          <a href="#" @click.prevent="viewFileDetails(file.id)">{{ file.name }}</a>
        </b-list-group-item>
      </b-list-group>
      <p v-if="files.length === 0">No files found in this directory.</p>
    </div>

    <!-- Modals -->
    <DirectoryCreate
      v-if="isCreateDirectoryModalVisible"
      :parent-id="directory.id"
      @close="isCreateDirectoryModalVisible = false"
      @directoryCreated="fetchDirectoryContents"
    />

    <FileUpload
      v-if="isUploadFileModalVisible"
      :directory-id="directory.id"
      @close="isUploadFileModalVisible = false"
      @fileUploaded="fetchDirectoryContents"
    />
  </div>
</template>

<script>
import axios from '../axios-instance';
import qs from 'qs';
import DirectoryCreate from './DirectoryCreate.vue';
import FileUpload from './FileUpload.vue';

export default {
  name: 'DirectoryView',
  components: {
    DirectoryCreate,
    FileUpload,
  },
  props: ['id'], // Ensure 'id' is listed as a prop
  data() {
    return {
      directory: {},
      subDirectories: [],
      files: [],
      isCreateDirectoryModalVisible: false,
      isUploadFileModalVisible: false,
    };
  },
  methods: {
    fetchDirectoryContents() {
      // Fetch directory details
      axios
        .get(`/api/directories/${this.id}`)
        .then((response) => {
          this.directory = response.data;
        })
        .catch((error) => {
          console.error('Error fetching directory:', error);
          this.$bvToast.toast('Failed to fetch directory details.', {
            title: 'Error',
            variant: 'danger',
            solid: true,
          });
        });

      // Fetch sub-directories
      axios
        .get('/api/directories', {
          params: {
            parent_id: this.id,
          },
          paramsSerializer: (params) => {
            return qs.stringify(params, { indices: false });
          },
        })
        .then((response) => {
          console.log('Fetched Sub-Directories:', response.data); // Debugging
          this.subDirectories = response.data;
        })
        .catch((error) => {
          console.error('Error fetching sub-directories:', error);
          this.$bvToast.toast('Failed to fetch sub-directories.', {
            title: 'Error',
            variant: 'danger',
            solid: true,
          });
        });

      // Fetch files in the current directory
      axios
        .get('/api/files', {
          params: {
            directory_id: this.id,
          },
          paramsSerializer: (params) => {
            return qs.stringify(params, { indices: false });
          },
        })
        .then((response) => {
          console.log('Fetched Files:', response.data); // Debugging
          this.files = response.data;
        })
        .catch((error) => {
          console.error('Error fetching files:', error);
          this.$bvToast.toast('Failed to fetch files.', {
            title: 'Error',
            variant: 'danger',
            solid: true,
          });
        });
    },
    viewFileDetails(fileId) {
      this.$router.push(`/file/${fileId}`);
    },
    showCreateDirectoryModal() {
      this.isCreateDirectoryModalVisible = true;
    },
    showUploadFileModal() {
      this.isUploadFileModalVisible = true;
    },
    deleteDirectory() {
      if (confirm('Are you sure you want to delete this directory and all its contents?')) {
        axios
          .delete(`/api/directories/${this.id}`)
          .then(() => {
            this.$bvToast.toast('Directory deleted successfully.', {
              title: 'Success',
              variant: 'success',
              solid: true,
            });
            this.navigateToParent();
          })
          .catch((error) => {
            console.error('Error deleting directory:', error);
            this.$bvToast.toast('Failed to delete directory.', {
              title: 'Error',
              variant: 'danger',
              solid: true,
            });
          });
      }
    },
    navigateToParent() {
      if (this.directory.parent_id) {
        this.$router.push(`/directory/${this.directory.parent_id}`);
      } else {
        this.$router.push('/');
      }
    },
  },
  watch: {
    id() {
      this.fetchDirectoryContents();
    },
  },
  created() {
    this.fetchDirectoryContents();
  },
};
</script>

<style scoped>
/* Add any component-specific styles here */
</style>