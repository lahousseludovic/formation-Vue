<template>
  <div class="card card-result">
    <div class="card-header">
      <p class="card-header-title">
        {{ titleWithFavorite }} is a count {{ counter }}
      </p>
      <a class="card-header-icon">
        <span class="icon is-favorite">
          <i
            @click="changeIsFavorite()"
            class="fa fa-star"
            :class="{ 'fa-star-o': !isFavorite }"
          ></i>
        </span>
      </a>
    </div>
    <div class="card-content">
      <div class="media">
        <div class="media-left">
          <figure class="image is-128x200">
            <img :src="urlImage" alt="" />
          </figure>
        </div>
        <div class="media-content">
          <p>Created in {{ dateCreation }} - {{ numberOfSeasons }} seasons</p>
          <p class="tags">
            <span class="tag" v-for="genre in genres" :key="genre">{{
              genre
            }}</span>
          </p>
          <p class="tags">
            <span class="tag" :class="statusTagClass()">{{ status }}</span>
          </p>
          <div class="content" @click="fullDescription()">
            {{ description | filter(35, full) }}
          </div>
        </div>
      </div>
      <router-link :to="{ name: 'Detail', params: { id } }">
        <button>show detail</button>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import filter from "@/filters/filter-description";

@Component({
  filters: {
    filter
  }
})
export default class CardComponent extends Vue {
  @Prop({ required: true })
  id!: string;

  @Prop({ required: true })
  title!: string;

  @Prop({ required: true })
  description!: string;

  @Prop({ required: true })
  dateCreation!: string;

  @Prop({ required: true })
  numberOfSeasons!: string;

  @Prop({ required: true })
  status!: string;

  @Prop({ required: true })
  urlImage!: string;

  @Prop({ required: true })
  genres!: ReadonlyArray<string>;

  @Prop({ required: true })
  isFavorite!: boolean;

  full = true;

  fullDescription(): void {
    this.full = !this.full;
  }

  get titleWithFavorite() {
    const isOrNotFavorited = this.isFavorite ? "" : "not";
    return `${this.title} is ${isOrNotFavorited} favorited`;
  }

  changeIsFavorite(): void {
    //this.isFavorite = !this.isFavorite;
    this.$emit("toggle-favorite");
  }

  statusTagClass(): "is-primary" | "is-danger" {
    if (this.status === "Continuing") {
      return "is-primary";
    } else {
      return "is-danger";
    }
  }

  get counter(): number {
    return this.$store.state.counter;
  }

  increment() {
    this.$store.dispatch("incrementAfterOneSecond");
  }
}
</script>

<style>
.danger {
  background-color: red !important;
}
</style>
