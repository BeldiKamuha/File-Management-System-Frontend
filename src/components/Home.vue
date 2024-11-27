<!-- src/components/Home.vue -->
<template>
  <div class="container">
    <h1>Root Directory</h1>
    <button class="btn btn-primary mb-3" @click="createDirectory">Create New Directory</button>
    <button class="btn btn-secondary mb-3 ml-2" @click="uploadFile">Upload File</button>
    <div>
      <h3>Directories</h3>
      <ul>
        <li v-for="directory in directories" :key="directory.id">
          <router-link :to="`/directory/${directory.id}`">{{ directory.name }}</router-link>
        </li>
      </ul>
    </div>
    <div>
      <h3>Files</h3>
      <ul>
        <li v-for="file in files" :key="file.id">
          <a href="#" @click.prevent="viewFileDetails(file.id)">{{ file.name }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      directories: [],
      files: [],
    };
  },
  methods: {
    fetchRootContents() {
      axios.get('/api/directories/')
        .then(response => {
          this.directories = response.data;
        });
      axios.get('/api/files/')
        .then(response => {
          this.files = response.data;
        });
    },
    createDirectory() {
      // Logic to open a modal or navigate to directory creation page
    },
    uploadFile() {
      // Logic to open file upload modal
    },
    viewFileDetails(fileId) {
      this.$router.push(`/file/${fileId}`);
    },
  },
  created() {
    this.fetchRootContents();
  },
};
</script>