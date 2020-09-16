<template>
    <div @mouseenter="showAbstract(article)" @mouseleave="hideAbstract(article)">
        <div class="flex">
            <span class="text-grey-600">Title:</span>
            <span class="font-bold text-gray-900">
                {{ article.title}}
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
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import ArticleType from "../Interfaces/ArticleType";

@Component
export default class ArticleCard extends Vue {
    @Prop({ required: true })
    article : ArticleType;
    @Prop({ required: true })
    index: number;
    @Prop({ required: true })
    markAsRead: (article: ArticleType) => void;
    @Prop({ required: true })
    showAbstract: (article: ArticleType) => void;
    @Prop({ required: true })
    hideAbstract: (article: ArticleType) => void;
    @Prop({ required: true })
    isSelected: (article: ArticleType) => boolean;
}

// export default Vue.extend({
//     name: 'ArticleCard',
//     props: {
//         article : {
//             type: Object as () => ArticleType,
//             required: true
//         },
//         index: {
//             type: Number,
//             required: true
//         },
//         markAsRead: {
//             required: true
//         },
//         showAbstract: {
//             required: true
//         },
//         hideAbstract: {
//             required: true
//         },
//         isSelected: {
//             required: true
//         }
//     }
// });

</script>