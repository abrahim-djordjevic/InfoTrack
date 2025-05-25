using System.Web;
using OpenQA.Selenium;
using OpenQA.Selenium.Firefox;
using HtmlAgilityPack;
namespace BackEnd.Models;

public class ScrapingMethods
{
    private HttpClient _client;
    private HtmlDocument _document;
    
    public ScrapingMethods()
    {
        _client = new HttpClient();
        _document = new HtmlDocument();
    }

    public async Task<List<int>> GetQueryIndex(string query, string phrase)
    {
        try
        {
            string url = $"http://www.google.co.uk/search?num=100&q={query.Replace(" ", "+")}";
            string html = await GetHTMLAsync(url);
            List<int> result = new List<int>();
            if(html == null) throw new Exception("HTML Not Found");
            _document.LoadHtml(html);
            
            var linkElements = _document.DocumentNode.SelectNodes("//a/div/div/h3/div/../../../..");
            if (linkElements == null) throw new Exception("Link Elements Not Found");
            for (int i = 0; i < linkElements.Count(); i++)
            {
                string href = linkElements.ElementAt(i).Attributes["href"].Value;
                if (UrlContainsPhrase(href, phrase))
                {
                    result.Add(i+1);
                }
            }
            
            if(result.Count == 0) result.Add(-1);
            return result;
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
            return new List<int>(){-1};
        }
    }

    private async Task<string> GetHTMLAsync(string url)
    {
        HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Get, url);
        HttpResponseMessage response = await _client.SendAsync(request);
        string res = null;
        if (response.IsSuccessStatusCode)
        {
            res = await response.Content.ReadAsStringAsync();
        }
        return res;
    }

    private bool UrlContainsPhrase(string url, string phrase)
    {
        return url.Contains(phrase) || url.Contains(HttpUtility.UrlEncode(phrase)) ? true : false;
    }
}