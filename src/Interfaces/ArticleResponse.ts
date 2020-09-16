import ArticleType from "./ArticleType";

export default interface ArticleResponse {
    data: {
        results: ArticleType
    }
}