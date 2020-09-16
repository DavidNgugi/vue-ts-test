<template>
  <div>
    <div>
      <div>
        <div id="app" class="w-full h-full bg-gray-200 p-8" style="min-height: 100vh; min-width: 100%;">
          <div class="max-w-md bg-white px-4 py-2 mx-auto rounded shadow">
            <h1 class="text-xl font-bold py-4">{{ appName}}</h1>
            <div class="text-gray-500">
              Status:
              <span class="font-bold text-gray-800">{{ readingStatus }}</span>
            </div>
            <div v-if="unreadArticles.length > 0">
              <h2>Reading list:</h2>
              
              <div v-for="(article, index) in unreadArticles" :key="index" class="bg-gray-200 px-4 py-2 my-2 rounded shadow">
                  <article-card
                    :article="article"
                    :index="index"
                    :markAsRead="markAsRead"
                    :showAbstract="showAbstract"
                    :hideAbstract="hideAbstract"
                    :isSelected="isSelected"/>
              </div>

            </div>
            <button
              class="bg-red-400 text-white py-1 px-3 rounded-full font-bold shadow my-3"
              @click.prevent="fetchRandomArticle">View new article</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ArticleService from "./services/article";
import ArticleType from "./Interfaces/ArticleType";
import ArticleResponse from "./Interfaces/ArticleResponse";
import ArticleCard from "./components/ArticleCard.vue";

@Component({
  components: { ArticleCard }
})

export default class App extends Vue {
  appName: string = "Random news site generator";
  readArticles: Array<ArticleType> = [];
  unreadArticles: Array<ArticleType> = [];
  selectedArticle?: ArticleType | null = null;

  get readingStatus(): string {
    if (this.readArticles.length == 0 && this.unreadArticles.length == 0)
      return "Add something to read to get the show started";
    if (this.readArticles.length > 0 && this.unreadArticles.length == 0)
      return "Was that it? Add more below";
    if (this.unreadArticles.length == 0) return "Get reading!";
    return "hmm - this is strange";
  }

  // add a new article to the reading list
  fetchRandomArticle(): void {
    // create get call to grab list of potential article sources
    try {
      const response = ArticleService.fetchArticle();
      response.then( (res: ArticleResponse) => {
        // make random number
        let r: number = Math.max(Math.floor(Math.random() * 5) - 1, 0);
        // get random article
        let ra: ArticleType = res.data.results[r];
        // update the state
        this.unreadArticles.push(ra);
      });
    } catch (error) {
      alert(error);
    }
  }

  isSelected(article: ArticleType): boolean {
      if(this.selectedArticle) return (this.selectedArticle.title == article.title);
      return false;
  }

  showAbstract(article: ArticleType): void {
    this.selectedArticle = article;
  }

  hideAbstract(article: ArticleType): void {
    this.selectedArticle = (this.selectedArticle.title == article.title) ? null : this.selectedArticle;
  }

  markAsRead(article: ArticleType): void {
    this.readArticles.push(article);
    let i: number = this.unreadArticles.findIndex(a => a.url == article.url);
    this.unreadArticles.splice(i, 1);
  }
}
</script>

