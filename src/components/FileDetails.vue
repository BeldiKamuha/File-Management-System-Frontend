<template>
  <div class="container mt-4">
    <h1 class="mb-4">{{ file.name }}</h1>
    <p><strong>Directory ID:</strong> {{ file.directory_id }}</p>
    <p><strong>Created At:</strong> {{ file.created_at }}</p>
    <p><strong>Updated At:</strong> {{ file.updated_at }}</p>
    <b-button variant="primary" @click="downloadFile">Download File</b-button>
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
    };
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
      window.open(`/api/files/${this.id}/download`, '_blank');
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