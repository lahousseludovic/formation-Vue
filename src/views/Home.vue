<template>
  <section class="hero is-primary">
    <div class="hero-body">
      <div class="container">
        <h1 class="title" v-if="!isLoading">{{ title }}</h1>
        <h1 class="title" v-else>Is loading...</h1>
        <div class="field">
          <div class="control">
            <input
              v-focus
              class="input"
              type="text"
              placeholder="Game of Thrones, Breaking Bad, ..."
              v-model="searchQuery"
              @keyup.enter="validateSearchQuery"
            />
          </div>
        </div>
        <div>
          <card
            v-for="show in filteredShow"
            :key="show.id"
            :id="show.id"
            :title="show.title"
            :description="show.description"
            :date-creation="show.dateCreation"
            :status="show.status"
            :url-image="show.images.poster"
            :number-of-seasons="show.numberOfSeasons"
            :genres="show.genres"
            :is-favorite="show.isFavorite"
            @toggle-favorite="toggleFavorite(show.id)"
          ></card>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
// @ is an alias to /src
import Card from "@/components/Card.vue";
import { Component, Vue } from "vue-property-decorator";
import focus from "@/directives/focus-directive";
import { Show } from "@/Show";
import {fetchShows, setShowFavorite} from "@/repositories/repositoryShow";

@Component({
  components: {
    card: Card
  },
  directives: {
    focus
  }
})
export default class HomeComponent extends Vue {
  title = "Welcome in your space";
  searchQuery = "";
  validatedSearchQuery = "";

  created() {
    this.$store.dispatch('fetchShows');
  }

  get isLoading(): boolean {
    return this.$store.state.isLoading;
  }

  get shows() {
    return this.$store.state.shows;
  }

  validateSearchQuery(): void {
    this.validatedSearchQuery = this.searchQuery;
  }

  get filteredShow(): Show[] {
    return this.shows.filter((show: Show) => {
      return show.title
        .toLocaleUpperCase()
        .includes(this.validatedSearchQuery.toLocaleUpperCase());
    });
  }

  async toggleFavorite(clickedShowId: number): Promise<void> {
    const show: Show = this.$store.getters.getShowById(clickedShowId);
    if (show) {
      await this.$store.dispatch('setFavoriteShowById', {showId: clickedShowId, favorite: !show.isFavorite});
      await this.$store.dispatch('fetchShows');
    }
  }
}
</script>

<style>

</style>
