export default class APIHelper
{
    baseURL: string | undefined;

    public constructor()
    {   
        this.baseURL = process.env.REACT_APP_API_URL;
    }  

    public async getQueryResults(query: string, phrase: string)
    {
        const url = this.baseURL + `/Scraping/FindQueryIndex?query=${query}&phrase=${phrase}`;   
            const response = await fetch(url, {
            method:"POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        });
        const results: number[] = await response.json();
        return results;    
    }
}
