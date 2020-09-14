import axios, { AxiosResponse } from "axios";
import config from "../config";

class ArticleService {
    async fetchArticle(): Promise<AxiosResponse> {
        return await axios.get(config.apiBaseUrl);
    }
}

export default new ArticleService();