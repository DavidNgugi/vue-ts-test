<template>
    <div @mouseenter="showAbstract(article)" @mouseleave="hideAbstract(article)" :key="index">
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
            @click="markAsRead(article)">Read it</button>
        <a class="bg-blue-400 text-white py-1 px-3 rounded-full font-bold shadow my-3"
            target="_"
            :href="article.url">Open Link</a>
        </div>
        <div v-if="isSelected(article)" class="bg-gray-400 p-4">Abstract: {{article.abstract}}</div>
    </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import ArticleType from "../Interfaces/ArticleType";

export default Vue.extend({
    name: 'ArticleCard',
    props: {
        article : {
            type: Object as PropType<ArticleType>,
            required: true
        },
        index: {
            type: Number,
            required: true
        },
        markAsRead: {
            required: true
        },
        showAbstract: {
            required: true
        },
        hideAbstract: {
            required: true
        },
        isSelected: {
            required: true
        }
    }
});

</script>