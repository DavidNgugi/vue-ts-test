import ArticleType from "./ArticleType";

interface ArticleResponse {
    data: {
        results: ArticleType
    }
}

export default ArticleResponse;