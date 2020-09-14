<template>
  <section class="hero is-primary" v-if="show !== null">
    <div class="hero-body">
      <div class="container">
        <h1 class="title">{{ title }} - {{ show.title }}</h1>
        <div>
          <ul>
            <li>- Create in {{ show.dateCreation }}</li>
            <li>- {{ show.numberOfSeasons }} seasons</li>
            <li>- {{ show.status }}</li>
          </ul>

          <hr />

          <ul>
            <li v-for="genre in show.genres" :key="genre.id">* {{ genre }}</li>
          </ul>
          <img :src="show.images.poster" />
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
// @ is an alias to /src
import Card from "@/components/Card.vue";
import { Component, Vue, Prop } from "vue-property-decorator";
import focus from "@/directives/focus-directive";
import axios from "axios";
import { Show } from "@/Show";
import { fetchShowById } from "@/repositories/repositoryShow";

@Component({
  components: {
    card: Card
  },
  directives: {
    focus
  }
})
export default class HomeComponent extends Vue {
  title = "Détail show";
  show: Show | null = null;

  @Prop({ required: true })
  id!: number;

  async created(): Promise<void> {
    this.show = await fetchShowById(this.id);
  }
}
</script>

<style></style>
