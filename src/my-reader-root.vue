<template>
  <div>
    <div>
      <div>
        <div
          id="app"
          class="w-full h-full bg-gray-200 p-8"
          style="min-height: 100vh; min-width: 100%;"
        >
          <div class="max-w-md bg-white px-4 py-2 mx-auto rounded shadow">
            <h1 class="text-xl font-bold py-4">{{ appName}}</h1>
            <div class="text-gray-500">
              Status:
              <span class="font-bold text-gray-800">{{ readingStatus }}</span>
            </div>
            <div v-if="unreadArticles.length > 0">
              <h2>Reading list:</h2>
              <div
                v-for="(article, index) in unreadArticles"
                :key="index"
                class="bg-gray-200 px-4 py-2 my-2 rounded shadow"
              >
                <div @mouseenter="showAbstract(article)">
                  <div class="flex">
                    <span class="text-grey-600">Name:</span>
                    <span class="font-bold text-gray-900">
                      {{ article.title}} -
                      <a :href="article.url">Link</a>
                    </span>
                  </div>
                  <div>
                    <button
                      class="bg-red-400 text-white py-1 px-3 rounded-full font-bold shadow my-3"
                      @click="markAsRead(article)"
                    >Read it</button>
                    <a
                      class="bg-red-400 text-white py-1 px-3 rounded-full font-bold shadow my-3"
                      target="_"
                      :href="article.url"
                    >Open</a>
                  </div>
                  <div v-if="isSelected(article)" class="bg-gray-400 p-4">Abstract: {{article.abstract}}</div>
                </div>
              </div>
            </div>
            <button
              class="bg-red-400 text-white py-1 px-3 rounded-full font-bold shadow my-3"
              @click.prevent="fetchRandomArticle"
            >View new article</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import ArticleService from "./services/article";
import ArticleType from "./Interfaces/ArticleType";
import ArticleResponse from "./Interfaces/ArticleResponse";

@Component({})
export default class App extends Vue {
  appName: string = "Random news site generator";
  alreadyRead: Array<ArticleType> = [];
  unreadArticles: Array<ArticleType> = [];
  selected_article: ArticleType | null = null;

  get readingStatus(): string {
    if (this.alreadyRead.length == 0 && this.unreadArticles.length == 0)
      return "Add something to read to get the show started";
    if (this.alreadyRead.length > 0 && this.unreadArticles.length == 0)
      return "Was that it? Add more below";
    if (this.unreadArticles.length == 0) return "Get reading!";
    return "hmm - this is strange";
  }
  // add a new article to the reading list
  fetchRandomArticle(): void {
    //include depedencny
    const axios = require("axios");
    // create get call to grab list of potential article soruces
    try {
      const response = ArticleService.fetchArticle();

      response.then( (res: ArticleResponse) => {
        // make random number
        let r: number = Math.max(Math.floor(Math.random() * 5) - 1, 0);
        // get random article
        let ra: ArticleType = res.data.results[r];
        // update the state
        this.unreadArticles.push(ra);
      })
        
    } catch (error) {
      alert(error);
    }
  }

  isSelected(article: ArticleType): boolean {
    try {
      return this.selected_article.title == article.title;
    } catch (exception) {
      return false;
    }
  }

  showAbstract(article: ArticleType): ArticleType {
    return (this.selected_article = article);
  }

  markAsRead(article: ArticleType): void {
    this.alreadyRead.push(article);
    let i = this.unreadArticles.findIndex(function (a) {
      return a.url == article.url;
    });
    this.unreadArticles.splice(i, 1);
  }
}
</script>

