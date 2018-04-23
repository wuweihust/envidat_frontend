
export const dataGetters = {
  // Get Metadata by ID
  dataById: (state, getters) => (id) => {
    if (getters.metadatas.length > 0) {
      return state.metadatas.getters.metadatas.filter(d => d.id === id)[0];
    }

    return state.metadatas;
  },
};