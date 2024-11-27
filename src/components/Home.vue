<!-- src/components/Home.vue -->
<template>
    <div class="container mt-4">
      <h1 class="mb-4">Root Directory</h1>
      <div class="mb-3">
        <b-button variant="primary" class="mr-2" @click="showCreateDirectoryModal">Create New Directory</b-button>
        <b-button variant="secondary" @click="showUploadFileModal">Upload File</b-button>
      </div>
  
      <!-- Directories List -->
      <div class="mb-4">
        <h3>Directories</h3>
        <b-list-group>
          <b-list-group-item v-for="directory in directories" :key="directory.id">
            <i class="bi bi-folder-fill me-2"></i>
            <router-link :to="`/directory/${directory.id}`">{{ directory.name }}</router-link>
          </b-list-group-item>
        </b-list-group>
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
      </div>
  
      <!-- Modals -->
      <DirectoryCreate
        v-if="isCreateDirectoryModalVisible"
        :parent-id="null"
        @close="isCreateDirectoryModalVisible = false"
        @directoryCreated="fetchRootContents"
      />
  
      <FileUpload
        v-if="isUploadFileModalVisible"
        :directory-id="null"
        @close="isUploadFileModalVisible = false"
        @fileUploaded="fetchRootContents"
      />
    </div>
  </template>
  
  <script>
  import axios from '../axios-instance';
  import DirectoryCreate from './DirectoryCreate.vue';
  import FileUpload from './FileUpload.vue';
  
  export default {
    name: 'Home',
    components: {
      DirectoryCreate,
      FileUpload,
    },
    data() {
      return {
        directories: [],
        files: [],
        isCreateDirectoryModalVisible: false,
        isUploadFileModalVisible: false,
      };
    },
    methods: {
      fetchRootContents() {
        // Fetch directories in root (parent_id is null)
        axios
          .get('/api/directories/')
          .then((response) => {
            this.directories = response.data;
          })
          .catch((error) => {
            console.error('Error fetching directories:', error);
            this.$bvToast.toast('Failed to fetch directories.', {
              title: 'Error',
              variant: 'danger',
              solid: true,
            });
          });
  
        // Fetch files in root (directory_id is null)
        axios
          .get('/api/files/')
          .then((response) => {
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
    },
    created() {
      this.fetchRootContents();
    },
  };
  </script>
  
  <style scoped>
  /* Add any component-specific styles here */
  </style>