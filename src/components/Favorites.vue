<template>
  <section class="hero is-primary">
    <div class="hero-body">
      <div class="container">
        <h1 v-if="!filteredShow.length > 0" class="title">
          You don't have favorite shows
        </h1>
        <h1 v-else class="title">{{ title }}</h1>
        <div class="field">
          <div class="control">
            <input
              v-if="favoriteShows.length > 0"
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
import { fetchShows } from "@/repositories/repositoryShow";
import { Show } from "@/Show";

@Component({
  components: {
    card: Card
  },
  directives: {
    focus
  }
})
export default class HomeComponent extends Vue {
  title = "My favorites shows";
  searchQuery = "";
  validatedSearchQuery = "";
  shows: Show[] = [];

  // async created(): Promise<void> {
  //   this.shows = await fetchShows();
  // }

  // created() {
  //
  // }

  validateSearchQuery(): void {
    this.validatedSearchQuery = this.searchQuery;
  }

  get filteredShow(): Show[] {
    return this.favoriteShows.filter(show => {
      return show.title
        .toLocaleUpperCase()
        .includes(this.validatedSearchQuery.toLocaleUpperCase());
    });
  }

  toggleFavorite(clickShowId: number): void {
    this.shows.forEach(show => {
      if (show.id === clickShowId) {
        show.isFavorite = !show.isFavorite;
      }
    });
  }

  get favoriteShows(): Array<Show> {
    return this.$store.getters.favoriteShows;
  }
}
</script>

<style>
.navbar-item.is-active {
  color: #00d1b2 !important;
}

.card-result {
  margin-bottom: 20px;
}

.is-128x200 {
  height: 200px;
  width: 128px;
}

.is-favorite {
  color: #ffdd57;
}
</style>
