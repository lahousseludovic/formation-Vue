import Vue from "vue";
import Vuex from "vuex";
import { Show } from "@/Show";
import { fetchShows, setShowFavorite } from "@/repositories/repositoryShow";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    shows: [] as Show[],
    isLoading: false,
    error: null
  },
  getters: {
    favoriteShows: state => {
      return state.shows.filter(show => {
        return show.isFavorite === true;
      });
    },
    getShowById(state) {
      return (id: number): Show | undefined => {
        return state.shows.find(show => {
          return show.id === id;
        });
      };
    }
  },
  mutations: {
    fetchShowStart(state) {
      state.isLoading = true;
    },
    fetchShowSuccess(state, shows) {
      state.shows = shows;
      state.isLoading = false;
    },
    fetchShowError(state, error) {
      state.isLoading = false;
      state.error = error;
    }
  },
  actions: {
    async fetchShows(context) {
      context.commit("fetchShowStart");
      const shows = await fetchShows();
      context.commit("fetchShowSuccess", shows);
    },
    async setFavoriteShowById(
      context,
      { showId, favorite }: { showId: number; favorite: boolean }
    ) {
      context.commit("fetchShowStart");
      await setShowFavorite(showId, favorite);
    }
  },
  modules: {}
});
